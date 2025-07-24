import openai from "../utils/openaiClient.js";
import Listing from "../models/listing.model.js";
import Platform from "../models/platform.model.js";
import { getRealtimePriceDetails } from "./listingService.js"; // Reusing the price analysis function
import TotalTokens from "../models/totalTokens.model.js";

interface ProductData {
  images: string[];
}

interface BulkListingData {
  platform: string;
  language: string;
  country: string;
  currency: string;
  priceAnalysisEnabled: boolean;
  userId: string;
  products: ProductData[];
}

export const processBulkListing = async (data: BulkListingData) => {
  const {
    platform,
    language,
    country,
    currency,
    priceAnalysisEnabled,
    userId,
    products,
  } = data;

  const platformDoc = await Platform.findOne({ name: platform, user: userId });
  if (!platformDoc) {
    throw new Error(`Platform "${platform}" not found for this user.`);
  }

  const createdListings = [];

  for (const product of products) {
    if (product.images.length === 0) {
      console.warn("Skipping product with no images.");
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
    - Product: ${`the item in the image(s)`}
    - Platform: ${platform}
    - Language: ${language}
    - Country: ${country}
    - Currency: ${currency}
    
    Image URLs (use only if image fields exist in the system message):
    ${product.images.join(", ")}
    
    Return ONLY the JSON object as per the system message format.`,
    };

    const imageMessages = product.images.map((url) => ({
      type: "image_url" as const,
      image_url: { url },
    }));

    const response = await openai.chat.completions.create({
      model: "o3",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: [textMessage, ...imageMessages] },
      ],
      response_format: { type: "json_object" },
    });

    if (response.usage) {
      totalTokens.totalTokens += response.usage.total_tokens;
      totalTokens.totalInputTokens += response.usage.prompt_tokens;
      totalTokens.totalOutputTokens += response.usage.completion_tokens;
      await totalTokens.save();
    }

    const choice = response.choices[0];
    const listingContent = choice.message.content;

    if (!listingContent) {
      const finishReason = choice.finish_reason;
      console.error(
        `AI failed to generate content for a product. Finish Reason: ${finishReason}`
      );
      // Decide if you want to throw an error and stop, or just skip this product
      continue;
    }

    const parsedContent = JSON.parse(listingContent);
    const newListing = new Listing({
      listingData: parsedContent,
      userId: userId,
      platform: platform,
      imageUrls: product.images,
      country: country,
      currency: currency,
      language: language,
      isBulk: true,
    });

    if (priceAnalysisEnabled) {
      const priceDetailsString = await getRealtimePriceDetails(newListing);
      if (priceDetailsString) {
        try {
          const jsonMatch = priceDetailsString.match(
            /```json\n([\s\S]*?)\n```/
          );
          const jsonString = jsonMatch ? jsonMatch[1] : priceDetailsString;
          newListing.priceDetails = JSON.parse(jsonString);
        } catch (error) {
          console.error(
            "Failed to parse or save price details for a bulk item:",
            error
          );
        }
      }
    }

    await newListing.save();
    createdListings.push(newListing);
  }

  return {
    success: true,
    message: "Bulk listings created successfully.",
    listings: createdListings,
  };
};
