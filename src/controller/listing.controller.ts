import { Response } from "express";
import { uploadToR2 } from "../utils/r2Storage/r2Upload.js";
import {
  generateListings,
  getListingsSummary,
  getRecentListings,
  getAllListings,
  getRealtimePriceDetails,
  updateListingPrice,
  analyzePriceForListing,
  deleteListing,
  updateListing,
} from "../service/listingService.js";
import { AuthRequest } from "../middleware/auth.middleware.js";
import User from "../models/user.model.js";

export const generateListingsController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const {
      platform,
      language,
      country,
      currency,
      prompt,
      priceAnalysisEnabled,
    } = req.body;
    const files = req.files as Express.Multer.File[];
    const userId = req.userId;

    if (!platform || !language || !country || !currency) {
      return res.status(400).json({
        message: "Missing required fields for listing generation.",
      });
    }
    const imageUrls: string[] = [];
    if (files?.length) {
      for (const file of files) {
        try {
          const timestamp = Date.now();
          const fileName = `uploads/listings/${userId}/${timestamp}-${file.originalname}`;
          await uploadToR2(file, process.env.R2_BUCKET_NAME!, fileName);
          const fileUrl = `https://images.sellsnap.store/${fileName}`;
          imageUrls.push(fileUrl);
        } catch (uploadError: any) {
          console.error("File upload failed:", uploadError);
          return res.status(500).json({
            message: "File upload failed",
            error: uploadError.message,
          });
        }
      }
    }

    const newListing = await generateListings(
      prompt,
      imageUrls,
      files,
      platform,
      language,
      country,
      currency,
      userId as string
    );

    if (priceAnalysisEnabled === "true") {
      const priceDetailsString = await getRealtimePriceDetails(newListing);
      if (priceDetailsString) {
        try {
          const jsonMatch = priceDetailsString.match(
            /```json\n([\s\S]*?)\n```/
          );
          const jsonString = jsonMatch ? jsonMatch[1] : priceDetailsString;
          newListing.priceDetails = JSON.parse(jsonString);
          await newListing.save();
        } catch (error) {
          console.error("Failed to parse or save price details:", error);
          // Do not block listing return due to price detail parsing
        }
      }
    }

    return res.status(201).json(newListing);
  } catch (error: any) {
    console.error("Error in generateListingsController:", error);
    if (error.message.includes("Failed to generate listing content from AI")) {
      return res.status(500).json({
        message:
          "The AI failed to generate listing content. This might be due to a restrictive prompt or a problem with the AI service. Please try again.",
      });
    }
    if (error.message.includes("not found for this user")) {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({
      message: "An unexpected error occurred while generating listings.",
    });
  }
};

export const getListingsSummaryController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: "User not authenticated." });
    }

    const summary = await getListingsSummary(userId);
    res.json(summary);
  } catch (error) {
    console.error("Error fetching listings summary:", error);
    res.status(500).json({ error: "Failed to fetch listings summary" });
  }
};

export const getRecentListingsController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: "User not authenticated." });
    }

    const listings = await getRecentListings(userId);
    res.json({ listings });
  } catch (error) {
    console.error("Error fetching recent listings:", error);
    res.status(500).json({ error: "Failed to fetch recent listings" });
  }
};

export const getAllListingsController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.userId;
    const { search, platform } = req.query;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated." });
    }

    const listings = await getAllListings(
      userId,
      search as string | undefined,
      platform as string | undefined
    );
    res.json({ listings });
  } catch (error) {
    console.error("Error fetching all listings:", error);
    res.status(500).json({ error: "Failed to fetch all listings" });
  }
};

export const updateListingPriceController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { listingId } = req.params;
    const { price } = req.body;

    if (!price || typeof price !== "number") {
      return res
        .status(400)
        .json({ message: "Price is required and must be a number." });
    }

    const updatedListing = await updateListingPrice(listingId, price);
    res.status(200).json(updatedListing);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const analyzePriceController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { listingId } = req.params;
    const updatedListing = await analyzePriceForListing(listingId);
    res.status(200).json(updatedListing);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteListingController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { listingId } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    await deleteListing(listingId, userId);
    res.status(200).json({ message: "Listing deleted successfully." });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateListingController = async (
  req: AuthRequest,
  res: Response
) => {
  const { listingId } = req.params;
  const userId = req.userId;
  const updateData = req.body;

  if (!userId) {
    return res
      .status(401)
      .json({ message: "Authentication error: User ID is missing." });
  }

  try {
    const updatedListing = await updateListing(listingId, userId, updateData);
    if (!updatedListing) {
      return res.status(404).json({
        message:
          "Listing not found or you do not have permission to update it.",
      });
    }

    return res.status(200).json(updatedListing);
  } catch (error) {
    console.error("Error updating listing:", error);
    return res
      .status(500)
      .json({ message: "Server error while updating listing." });
  }
};
