import express from "express";
import {
    generateListingsController,
    getListingsSummaryController,
    getRecentListingsController,
    getAllListingsController,
    updateListingPriceController,
    analyzePriceController,
    deleteListingController,
    updateListingController
} from "../controller/listing.controller.js";
import upload from "../utils/multerStorage.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/generate", protect, upload.array("images", 5), generateListingsController);
router.get("/summary", protect, getListingsSummaryController);
router.get("/recent", protect, getRecentListingsController);
router.get("/", protect, getAllListingsController);

router.patch("/:listingId/price", protect, updateListingPriceController);

router.post("/:listingId/analyze-price", protect, analyzePriceController);

router.delete("/:listingId", protect, deleteListingController);
router.put("/:listingId", protect, updateListingController);

export default router;