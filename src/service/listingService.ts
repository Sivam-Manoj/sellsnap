import openai from "../utils/openaiClient.js";
import fs from "fs";
import path from "path";
import Listing, { IListing } from "../models/listing.model.js";
import Platform from "../models/platform.model.js";

export const generateListings = async (
  prompt: string,
  imageUrls: string[],
  files: Express.Multer.File[],
  platform: string,
  language: string,
  country: string,
  currency: string,
  userId: string
) => {
  try {
    // Find the custom platform in the database
    const platformDoc = await Platform.findOne({
      name: platform,
      user: userId,
    });
    if (!platformDoc) {
      throw new Error(`Platform "${platform}" not found for this user.`);
    }

    console.log(imageUrls.join(", "));
    // Use the system message from the database
    const systemMessage = platformDoc.systemMessage;
    // This will be defined inside the try-catch blocks
    let choice;

    const textMessage = {
      type: "text" as const,
      text: `Generate a product listing based on the following details:
    The output should be highly SEO optimized and should refer to the product shown in the image(s).
    If image URLs are needed in the listing, use all the following URLs:
    ${imageUrls.join(", ")}.
    
    - Product: ${prompt || "the item in the image(s)"}
    - Platform: ${platform}
    - Language: ${language}
    - Country: ${country}
    - Currency: ${currency}
    
    Please format the response strictly as a JSON object, following the system message instructions provided for this platform.`,
    };

    try {
      // Attempt 1: Use image URLs
      console.log("Attempting to generate listing with image URLs...");
      const imageMessagesFromUrls = imageUrls.map((url) => ({
        type: "image_url" as const,
        image_url: { url },
      }));

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        max_tokens: 16000,
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: [textMessage, ...imageMessagesFromUrls] },
        ],
        response_format: { type: "json_object" },
      });
      choice = response.choices[0];
    } catch (error: any) {
      console.warn(
        "Image URL approach failed. Falling back to raw image data.",
        error.message
      );

      // Fallback: Use raw image data if URL approach fails
      const imageMessagesFromFiles = files.map((file) => {
        const imageBuffer = fs.readFileSync(file.path);
        const base64Image = imageBuffer.toString("base64");
        return {
          type: "image_url" as const,
          image_url: {
            url: `data:${file.mimetype};base64,${base64Image}`,
          },
        };
      });

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        max_tokens: 16000, // Using a larger token limit
        messages: [
          {
            role: "system",
            content: systemMessage, // Using the custom system message
          },
          {
            role: "user",
            content: [textMessage, ...imageMessagesFromFiles],
          },
        ],
        response_format: { type: "json_object" },
      });
      choice = response.choices[0];
    }

    const listingContent = choice.message.content;
    if (!listingContent) {
      const finishReason = choice.finish_reason;
      console.error(
        `AI failed to generate content. Finish Reason: ${finishReason}`
      );
      throw new Error(
        `Failed to generate listing content from AI. Reason: ${finishReason}`
      );
    }

    // It's a good practice to log the raw AI output for debugging
    console.log("Raw AI Response:", listingContent);

    const parsedContent = JSON.parse(listingContent);
    const newListing = new Listing({
      listingData: parsedContent,
      userId: userId,
      platform: platform,
      imageUrls: imageUrls,
    });

    await newListing.save();
    return newListing;
  } catch (error) {
    console.error("Error generating listings:", error);
    throw new Error("Failed to generate listings.");
  }
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
): Promise<boolean> => {
  const result = await Listing.deleteOne({ _id: listingId, user: userId });
  return result.deletedCount > 0;
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

Here is the product listing:
${JSON.stringify(listing)}

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
- "Similar products" means the *exact same product* being sold by other sellers on ${
        listing.platform
      }, not different variations or alternatives.
- All pricing data should be based strictly on ${
        listing.platform
      } or very closely related marketplaces (like Amazon sellers or Etsy shops).
- Only return a valid, clean JSON object as per the structure above.
- Your goal is to help competitively price this listing for better visibility and conversion.
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
