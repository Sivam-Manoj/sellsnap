import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware.js";
import { processBulkListing } from "../service/bulkListingService.js";
import { uploadToR2 } from "../utils/r2Storage/r2Upload.js";

export const createBulkListing = async (req: AuthRequest, res: Response) => {
  try {
    const {
      platform,
      language,
      country,
      currency,
      products,
      priceAnalysisEnabled,
    } = req.body;
    const files = req.files as Express.Multer.File[];
    const userId = req.userId;

    if (!platform || !language || !country || !currency || !products) {
      return res.status(400).json({
        message: "Missing required fields for bulk listing generation.",
      });
    }

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated." });
    }


    // The 'products' from the body will tell us how many images belong to each product.
    // We assume the files are sent in the same order as the products.
    const parsedProducts = JSON.parse(products);
    let fileIndex = 0;
    const productsWithImageUrls = [];

    for (const product of parsedProducts) {
      const imageUrls: string[] = [];
      const productImages = files.slice(
        fileIndex,
        fileIndex + product.images.length
      );
      fileIndex += product.images.length;

      for (const file of productImages) {
        const timestamp = Date.now();
        const fileName = `uploads/listings/${userId}/${timestamp}-${file.originalname}`;
        await uploadToR2(file, process.env.R2_BUCKET_NAME!, fileName);
        const fileUrl = `https://images.sellsnap.store/${fileName}`;
        imageUrls.push(fileUrl);
      }
      productsWithImageUrls.push({ images: imageUrls });
    }

    const result = await processBulkListing({
      platform,
      language,
      country,
      currency,
      priceAnalysisEnabled: priceAnalysisEnabled === "true",
      userId,
      products: productsWithImageUrls,
    });

    res.status(201).json(result);
  } catch (error: any) {
    console.error("Error in createBulkListingController:", error);
    res.status(500).json({
      message: "An unexpected error occurred while creating bulk listings.",
      error: error.message,
    });
  }
};
