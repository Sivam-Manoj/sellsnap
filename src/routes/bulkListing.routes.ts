import express from 'express';
import { createBulkListing } from '../controller/bulkListingController.js';
import upload from '../utils/multerStorage.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Assuming a maximum of 10 products with 10 images each = 100 images max
router.post('/', protect, upload.array('images', 100), createBulkListing);

export default router;
