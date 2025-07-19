import openai from "../utils/openaiClient.js";
import fs from "fs";
import path from "path";
import Listing, { IListing } from "../models/listing.model.js";
import Platform from "../models/platform.model.js";

export const generateListings = async (
  prompt: string,
  imageUrls: string[],
  files: Express.Multer.File[],
  platforms: string[],
  language: string,
  country: string,
  currency: string,
  userId: string
) => {
  const createdListings: IListing[] = [];

  for (const platform of platforms) {
    try {
      const platformDoc = await Platform.findOne({
        name: platform,
        user: userId,
      });
      if (!platformDoc) {
        console.warn(
          `Platform "${platform}" not found for user ${userId}. Skipping.`
        );
        continue;
      }

      const systemMessage = platformDoc.systemMessage;
      let choice;

      const textMessage = {
        type: "text" as const,
        text: `Generate a product listing based on the details and images provided.
      
      Instructions:
      - Optimize the content specifically for the "${platform}" e-commerce platform.
        If the platform is a custom or unknown platform, create the listing using general best practices for SEO and high conversion rates.
      - The product images may be from various categories such as digital arts, apps/software, food & drinks, clothing & wearables, or others.
      - Include and refer to the images only if the system message schema includes a corresponding field for images.
      - Follow the exact field names, data types, and constraints specified in the system message.
      - Ensure every field is written in a persuasive, engaging, and buyer-focused tone that encourages sales.
      - Content should be mobile-optimized, keyword-rich, and highly SEO-friendly.
      - The output must be a strictly valid JSON object matching the system message fields.
      - Do NOT include any explanations, extra text, or formatting beyond the JSON object.
      
      Product Details:
      - Product: ${prompt || "the item in the image(s)"}
      - Platform: ${platform}
      - Language: ${language}
      - Country: ${country}
      - Currency: ${currency}
      
      Image URLs (use only if image fields exist in the system message):
      ${imageUrls.join(", ")}
      
      Return ONLY the JSON object as per the system message format.`,
      };

      try {
        const imageMessagesFromUrls = imageUrls.map((url) => ({
          type: "image_url" as const,
          image_url: { url },
        }));

        const response = await openai.chat.completions.create({
          model: "gpt-4.1",
          max_tokens: 30000,
          messages: [
            { role: "system", content: systemMessage },
            { role: "user", content: [textMessage, ...imageMessagesFromUrls] },
          ],
          response_format: { type: "json_object" },
        });
        choice = response.choices[0];
      } catch (error) {
        console.warn(
          "Image URL approach failed. Falling back to raw image data.",
          error
        );
        const imageMessagesFromFiles = files.map((file) => {
          const absolutePath = path.resolve(file.path);
          const imageAsBase64 = fs.readFileSync(absolutePath, "base64");
          return {
            type: "image_url" as const,
            image_url: { url: `data:${file.mimetype};base64,${imageAsBase64}` },
          };
        });

        const response = await openai.chat.completions.create({
          model: "gpt-4.1",
          max_tokens: 30000,
          messages: [
            { role: "system", content: systemMessage },
            { role: "user", content: [textMessage, ...imageMessagesFromFiles] },
          ],
          response_format: { type: "json_object" },
        });
        choice = response.choices[0];
      }

      const listingContent = choice.message.content;
      if (!listingContent) {
        const finishReason = choice.finish_reason;
        console.error(
          `AI failed to generate content for platform ${platform}. Finish Reason: ${finishReason}`
        );
        continue;
      }

      const parsedContent = JSON.parse(listingContent);
      const newListing = new Listing({
        listingData: parsedContent,
        userId: userId,
        platform: platform,
        imageUrls: imageUrls,
        country: country,
        currency: currency,
        language: language,
      });

      await newListing.save();
      createdListings.push(newListing);
    } catch (error) {
      console.error(
        `Error generating listing for platform ${platform}:`,
        error
      );
      // Decide if one failure should stop the whole process. For now, we'll just log and continue.
    }
  }

  if (createdListings.length === 0) {
    throw new Error(
      "Failed to generate any listings. Please check the platforms and try again."
    );
  }

  return createdListings;
};

export const getListingsSummary = async (userId: string) => {
  try {
    const totalListings = await Listing.countDocuments({ userId: userId });
    const totalPlatforms = await Platform.countDocuments({ user: userId });
    return { totalListings, totalPlatforms };
  } catch (error) {
    console.error("Error fetching listings summary:", error);
    throw new Error("Failed to fetch listings summary");
  }
};

export const getRecentListings = async (userId: string) => {
  try {
    const listings = await Listing.find({ userId: userId })
      .sort({ createdAt: -1 })
      .limit(5);
    return listings;
  } catch (error) {
    console.error("Error fetching recent listings:", error);
    throw new Error("Failed to fetch recent listings");
  }
};

export const getAllListings = async (
  userId: string,
  search?: string,
  platform?: string
) => {
  try {
    const query: any = { userId: userId };

    if (platform) {
      query.platform = platform;
    }

    if (search) {
      if (platform) {
        // If filtering by platform, search only within the title
        query["listingData.title"] = { $regex: search, $options: "i" };
      } else {
        // Otherwise, search in title OR platform
        query.$or = [
          { "listingData.title": { $regex: search, $options: "i" } },
          { platform: { $regex: search, $options: "i" } },
        ];
      }
    }

    const listings = await Listing.find(query).sort({ createdAt: -1 });
    return listings;
  } catch (error) {
    console.error("Error fetching all listings:", error);
    throw new Error("Failed to fetch all listings");
  }
};

export const deleteListing = async (
  listingId: string,
  userId: string
): Promise<void> => {
  const result = await Listing.deleteOne({ _id: listingId, userId: userId });
  if (result.deletedCount === 0) {
    throw new Error(
      "Listing not found or you do not have permission to delete it"
    );
  }
};

export const updateListing = async (
  listingId: string,
  userId: string,
  updateData: { listingData: any }
) => {
  const listing = await Listing.findOne({ _id: listingId, userId: userId });

  if (!listing) {
    return null;
  }

  // Only update the listingData field
  listing.listingData = { ...listing.listingData, ...updateData.listingData };
  listing.markModified("listingData");

  const updatedListing = await listing.save();
  return updatedListing;
};

export const getRealtimePriceDetails = async (listing: IListing) => {
  try {
    const response = await openai.responses.create({
      model: "gpt-4.1",
      tools: [
        {
          type: "web_search_preview",
          search_context_size: "high", // or "high" if needed
        },
      ],
      input: `
You are an AI e-commerce pricing analyst.

Your task is to analyze the product listing below and provide competitive pricing insights using real-time data.

Here is the product listing data:
${JSON.stringify(listing.listingData)}

Platform: ${listing.platform}

Please analyze this product on ${
        listing.platform
      } and return a JSON response with the following structure:

{
  "average_price": number, // The average price of the exact same product sold on ${
    listing.platform
  }
  "competitors": [         // Competitor listings offering the same product
    {
      "name": string,      // Competitor product or seller name
      "price": number,     // Price of the competitor's product
      "url": string        // Link to the competitor's listing
    }
  ],
  "notable_offers": [      // Special deals or discounts on the same product
    {
      "product": string,   // Product name with an offer
      "discount": string,  // Description of the discount (e.g., "20% off", "Free shipping")
      "price": number,     // Discounted price
      "url": string        // Product URL
    }
  ],
  "pricing_suggestion": number, // The recommended optimal price to stay competitive and maximize sales
  "similar_products": [         // Other listings of the *exact same product* sold by different sellers on the same platform
    {
      "product_title": string,
      "price": number,
      "platform": string,
      "url": string
    }
  ],
  "insights": string // A short summary explaining the pricing recommendation, trends, or strategy
}

Important:
- Search for the **exact same product** on "${
        listing.platform
      }" or any directly related marketplaces if ${
        listing.platform
      } not available or not found.

- While searching and comparing:
  • Use the following values to localize and match search results:
    - Country: ${listing.country}
    - Currency: ${listing.currency}
    - Language: ${listing.language}

- Identify active competitors, similar product listings, and available offers in that specific market.

- **Convert all prices to "${
        listing.currency
      }" using the most recent exchange rates**.
- **Return the entire JSON output in the "${
        listing.language
      }" language**, keeping the structure and field names in English but translating all descriptive content and values (e.g., product names, insights, discount descriptions).

- Output must match the structure below exactly, with no additional text, explanations, or formatting outside the JSON.

`,
    });

    console.log(response.output_text);
    return response.output_text;
  } catch (error) {
    console.error("Error fetching real-time price details:", error);
    return null;
  }
};

export const updateListingPrice = async (listingId: string, price: number) => {
  try {
    const listing = await Listing.findById(listingId);

    if (!listing) {
      throw new Error("Listing not found");
    }

    listing.finalPrice = price;
    await listing.save();

    return listing;
  } catch (error) {
    console.error("Error updating listing price in service:", error);
    throw error;
  }
};

export const analyzePriceForListing = async (listingId: string) => {
  try {
    const listing = await Listing.findById(listingId);
    if (!listing) {
      throw new Error("Listing not found");
    }

    const priceDetailsString = await getRealtimePriceDetails(listing);

    if (priceDetailsString) {
      try {
        const jsonMatch = priceDetailsString.match(/```json\n([\s\S]*?)\n```/);
        const jsonString = jsonMatch ? jsonMatch[1] : priceDetailsString;

        listing.priceDetails = JSON.parse(jsonString);
        await listing.save();
      } catch (error) {
        console.error("Failed to parse or save price details:", error);
        throw new Error("Failed to process price analysis data.");
      }
    }

    return listing;
  } catch (error) {
    console.error("Error analyzing listing price in service:", error);
    throw error;
  }
};
