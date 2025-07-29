import Trend, { ITrend } from "../models/trend.js";
import mongoose from "mongoose";
import openai from "../utils/openaiClient.js";
import TotalTokens from "../models/totalTokens.model.js";
import { TrendAnalysisData } from "../types/trend.types.js";

const generateAnalysis = async (
  product: string,
  marketplace: string,
  country: string
): Promise<TrendAnalysisData> => {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];
  try {
    let totalTokens = await TotalTokens.findOne();
    if (!totalTokens) {
      totalTokens = new TotalTokens({
        totalTokens: 0,
        totalInputTokens: 0,
        totalOutputTokens: 0,
      });
      await totalTokens.save();
    }

    const response = await openai.responses.create({
      model: "gpt-4.1",
      tools: [
        {
          type: "web_search_preview",
          search_context_size: "high",
        },
      ],
      input: `
      You are a business trends analyst. I want a brief but valuable analysis based on current web data.

        Product: ${product}
        Marketplace: ${marketplace} 
        Country: ${country}
        Date: ${formattedDate}

        Please provide:
        1. Real-time trending products and services in this market and on ${formattedDate}.
        2. Similar products that are currently popular or gaining traction.
        3. What types of items are currently selling well and ways to capitalize on them.
        4. Any relevant insights, platforms, or business models that can help generate income now.
        5.don't provide not working links.
        6. if the selected marketplace is not available, provide a general analysis with other market places.
        7. only do analysis strictly to the product :${product} if the product any search top 5 high selling products in internet .
        Format the output in the following JSON structure:

        {
            "summary": "Brief overview of market trends and opportunities. minimum 300 words.",
            "trendingProductsAndServices": [
                {
                "name": "Example Product 1",
                "category": "Category A",
                "reason": "High demand due to seasonal trends",
                "url": "https://example.com/product-1"
                },
                {
                "name": "Example Service 2",
                "category": "Service B",
                "reason": "Popular on social platforms",
                "url": "https://example.com/service-2"
                }
            ],
            "similarTrendingProducts": [
                {
                "name": "Similar Product A",
                "comparedTo": "${product}",
                "trendReason": "Recommended alternative by influencers",
                "url": "https://example.com/similar-a"
                },
                {
                "name": "Similar Product B",
                "comparedTo": "${product}",
                "trendReason": "Better pricing and growing reviews",
                "url": "https://example.com/similar-b"
                }
            ],
            "moneyMakingOpportunities": [
                {
                "idea": "Dropshipping high-demand accessories",
                "platforms": [
                    {
                    "name": "TikTok Shop",
                    "url": "https://www.tiktok.com/shop"
                    },
                    {
                    "name": "Etsy",
                    "url": "https://www.etsy.com/sell"
                    }
                ],
                "why": "Low startup cost and viral potential"
                },
                {
                "idea": "Bundling digital products",
                "platforms": [
                    {
                    "name": "Gumroad",
                    "url": "https://gumroad.com/"
                    },
                    {
                    "name": "Shopify",
                    "url": "https://www.shopify.com/"
                    }
                ],
                "why": "High margin and passive income"
                }
            ],
            "platformInsights": [
                {
                "platform": "Amazon",
                "tip": "Use A+ Content and Sponsored Ads to boost visibility",
                "url": "https://sellercentral.amazon.com/aps"
                },
                {
                "platform": "Etsy",
                "tip": "SEO-rich product titles and trending tags improve discovery",
                "url": "https://www.etsy.com/sell"
                },
                {
                "platform": "TikTok Shop",
                "tip": "Leverage short product demos with trending sounds",
                "url": "https://seller.tiktokglobalshop.com/"
                }
            ]
          }
        Keep it concise, up-to-date, and data-driven.           
      `,
    });
    if (response.usage?.total_tokens) {
      totalTokens.totalTokens += response.usage.total_tokens;
      totalTokens.totalInputTokens += response.usage.input_tokens;
      totalTokens.totalOutputTokens += response.usage.output_tokens;
      await totalTokens.save();
    }

    const rawOutput = response.output_text;
    const jsonString = rawOutput.replace(/```json\n|\n```/g, "");
    try {
      const parsedJson = JSON.parse(jsonString);
      return parsedJson;
    } catch (e) {
      console.error("Failed to parse JSON from AI response:", e);
      throw new Error("Failed to parse JSON from AI response.");
    }
  } catch (error) {
    console.error("Error fetching real-time price details:", error);
    throw new Error("Error generating analysis.");
  }
};

export const analyzeTrend = async (
  userId: string,
  product: string,
  marketplace: string,
  country: string
): Promise<ITrend> => {
  try {
    const analysisData = await generateAnalysis(product, marketplace, country);

    if (!analysisData) {
      throw new Error("Failed to generate trend analysis from AI service.");
    }

    const newTrend = new Trend({
      userId: new mongoose.Types.ObjectId(userId),
      product,
      marketplace,
      country,
      data: analysisData,
    });

    await newTrend.save();
    return newTrend;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error in analyzeTrend: ${error.message}`);
      throw new Error(`Could not analyze trend: ${error.message}`);
    }
    throw new Error("An unknown error occurred in analyzeTrend.");
  }
};

export const getTrendsByUserId = async (userId: string): Promise<ITrend[]> => {
  try {
    const trends = await Trend.find({
      userId: new mongoose.Types.ObjectId(userId),
    }).sort({ createdAt: -1 });
    return trends;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error in getTrendsByUserId: ${error.message}`);
      throw new Error(`Could not fetch trends: ${error.message}`);
    }
    throw new Error("An unknown error occurred while fetching trends.");
  }
};

export const deleteTrendById = async (
  trendId: string,
  userId: string
): Promise<void> => {
  try {
    const trend = await Trend.findById(trendId);

    if (!trend) {
      throw new Error("Trend not found");
    }

    if (trend.userId.toString() !== userId) {
      throw new Error("User not authorized to delete this trend");
    }

    await Trend.findByIdAndDelete(trendId);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error in deleteTrendById: ${error.message}`);
      throw new Error(`Could not delete trend: ${error.message}`);
    }
    throw new Error("An unknown error occurred while deleting the trend.");
  }
};
