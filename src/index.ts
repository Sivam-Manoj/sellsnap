import express from "express";
import listingRoutes from "./routes/listing.routes.js";
import platformRoutes from "./routes/platform.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from './routes/user.routes.js';
import { seedPlatforms } from './utils/platform.seeder.js';
import connectDB from "./config/database.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    await seedPlatforms();

    app.use(express.json());
    app.use(express.static("public"));
    app.use("/api/listings", listingRoutes);
    app.use("/api/platforms", platformRoutes);
    app.use("/api/auth", authRoutes);
    app.use("/api/user", userRoutes);

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
