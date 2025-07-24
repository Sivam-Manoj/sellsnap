import openai from "../utils/openaiClient.js";
import fs from "fs";
import path from "path";
import Listing, { IListing } from "../models/listing.model.js";
import Platform from "../models/platform.model.js";
import TotalTokens from "../models/totalTokens.model.js";

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

      let totalTokens = await TotalTokens.findOne();
      if (!totalTokens) {
        totalTokens = new TotalTokens({
          totalTokens: 0,
          totalInputTokens: 0,
          totalOutputTokens: 0,
        });
        await totalTokens.save();
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
          model: "o3",
          max_tokens: 32768,
          messages: [
            { role: "system", content: systemMessage },
            { role: "user", content: [textMessage, ...imageMessagesFromUrls] },
          ],
          response_format: { type: "json_object" },
        });
        choice = response.choices[0];
        if (response.usage) {
          totalTokens.totalTokens += response.usage.total_tokens;
          totalTokens.totalInputTokens += response.usage.prompt_tokens;
          totalTokens.totalOutputTokens += response.usage.completion_tokens;
          await totalTokens.save();
        }
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
          model: "o3",
          max_tokens: 32768,
          messages: [
            { role: "system", content: systemMessage },
            {
              role: "user",
              content: [textMessage, ...imageMessagesFromFiles],
            },
          ],
          response_format: { type: "json_object" },
        });
        choice = response.choices[0];
        if (response.usage) {
          totalTokens.totalTokens += response.usage.total_tokens;
          totalTokens.totalInputTokens += response.usage.prompt_tokens;
          totalTokens.totalOutputTokens += response.usage.completion_tokens;
          await totalTokens.save();
        }
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
  let totalTokens = await TotalTokens.findOne();
  if (!totalTokens) {
    totalTokens = new TotalTokens({
      totalTokens: 0,
      totalInputTokens: 0,
      totalOutputTokens: 0,
    });
    await totalTokens.save();
  }

  try {
    const response = await openai.responses.create({
      model: "gpt-4.1",
      tools: [
        {
          type: "web_search_preview",
          search_context_size: "high",
        },
      ],
      input: `
You are an AI e-commerce pricing and SEO analyst.

Your job is to analyze the product listing below using real-time web data and generate:
- Competitive pricing insights
- Real-time trending keywords
- SEO-optimized meta tags
- Relevant product tags

Here is the product listing:
${JSON.stringify(listing.listingData)}

Platform: ${listing.platform}

Use real-time search and the latest product data on "${
        listing.platform
      }" (or a similar marketplace) to generate this structured JSON output:

{
  "average_price": number,
  "competitors": [
    {
      "name": string,
      "price": number,
      "url": string
    }
  ],
  "notable_offers": [
    {
      "product": string,
      "discount": string,
      "price": number,
      "url": string
    }
  ],
  "pricing_suggestion": number,
  "similar_products": [
    {
      "product_title": string,
      "price": number,
      "platform": string,
      "url": string
    }
  ],
  "insights": string,
  "seo_keywords": [           // Extract these from real-time search result titles, meta keywords, and product tags
    string
  ],
  "meta_tags": {              // Use real-time SEO best practices and extracted site data
    "title": string,          // SEO-optimized title based on top-ranking pages
    "description": string,    // Meta description that encourages click-through
    "keywords": string        // Comma-separated keywords based on actual web data
  },
  "product_tags": [           // Real-time tags and categories extracted from competing listings, tags, or metadata
    string
  ]
}

Instructions:
- Search for the **exact same product** or model on "${
        listing.platform
      }" and related e-commerce platforms if needed.
- Use the following values for accurate localization:
  - Country: ${listing.country}
  - Currency: ${listing.currency}
  - Language: ${listing.language}
- Pull tags, keywords, and meta data from:
  • Product page meta tags
  • Blog posts and guides
  • Top search engine snippets
  • Competitor eBay, Amazon, Shopify, or Etsy listings
- Use only **real-time, trending**, and **popular tags or keywords** used in the product's niche.
- Convert all prices to "${listing.currency}".
- Return all text and descriptions in "${
        listing.language
      }", but keep all keys/field names in English.
- Output must match the exact JSON structure above — no extra text, no explanations.
`,
    });
    if (response.usage?.total_tokens) {
      totalTokens.totalTokens += response.usage.total_tokens;
      totalTokens.totalInputTokens += response.usage.input_tokens;
      totalTokens.totalOutputTokens += response.usage.output_tokens;
      // Note: prompt_tokens and completion_tokens are not available from this endpoint.
      await totalTokens.save();
    }

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
