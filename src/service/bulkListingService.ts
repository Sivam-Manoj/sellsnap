import openai from '../utils/openaiClient.js';
import Listing from '../models/listing.model.js';
import Platform from '../models/platform.model.js';
import { getRealtimePriceDetails } from './listingService.js'; // Reusing the price analysis function

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
  const { platform, language, country, currency, priceAnalysisEnabled, userId, products } = data;

  const platformDoc = await Platform.findOne({ name: platform, user: userId });
  if (!platformDoc) {
    throw new Error(`Platform "${platform}" not found for this user.`);
  }

  const createdListings = [];

  for (const product of products) {
    if (product.images.length === 0) {
      console.warn('Skipping product with no images.');
      continue;
    }

    const systemMessage = platformDoc.systemMessage;
    const textMessage = {
      type: 'text' as const,
      text: `Generate a product listing based on the following details:
    The output should be highly SEO optimized and should refer to the product shown in the image(s).
    If image URLs are needed in the listing, use all the following URLs:
    ${product.images.join(', ')}.
    
    - Product: the item in the image(s)
    - Platform: ${platform}
    - Language: ${language}
    - Country: ${country}
    - Currency: ${currency}
    
    Please format the response strictly as a JSON object, following the system message instructions provided for this platform.`,
    };

    const imageMessages = product.images.map((url) => ({
      type: 'image_url' as const,
      image_url: { url },
    }));

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 4096,
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: [textMessage, ...imageMessages] },
      ],
      response_format: { type: 'json_object' },
    });

    const choice = response.choices[0];
    const listingContent = choice.message.content;

    if (!listingContent) {
      const finishReason = choice.finish_reason;
      console.error(`AI failed to generate content for a product. Finish Reason: ${finishReason}`);
      // Decide if you want to throw an error and stop, or just skip this product
      continue; 
    }

    const parsedContent = JSON.parse(listingContent);
    const newListing = new Listing({
      listingData: parsedContent,
      userId: userId,
      platform: platform,
      imageUrls: product.images,
    });

    if (priceAnalysisEnabled) {
        const priceDetailsString = await getRealtimePriceDetails(newListing);
        if (priceDetailsString) {
            try {
                const jsonMatch = priceDetailsString.match(/```json\n([\s\S]*?)\n```/);
                const jsonString = jsonMatch ? jsonMatch[1] : priceDetailsString;
                newListing.priceDetails = JSON.parse(jsonString);
            } catch (error) {
                console.error("Failed to parse or save price details for a bulk item:", error);
            }
        }
    }

    await newListing.save();
    createdListings.push(newListing);
  }

  return { success: true, message: 'Bulk listings created successfully.', listings: createdListings };
};
