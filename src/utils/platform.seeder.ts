import mongoose from "mongoose";
import Platform from "../models/platform.model.js";
import { defaultPlatforms } from "./defaultPlatforms.js";

export const seedPlatforms = async () => {
  try {
    const indexName = "name_1";
    const collection = mongoose.connection.collection("platforms");
    const indexes = await collection.listIndexes().toArray();
    const indexExists = indexes.some((index) => index.name === indexName);

    if (indexExists) {
      console.log(`Dropping conflicting index: ${indexName}...`);
      await collection.dropIndex(indexName);
      console.log("Index dropped successfully.");
    }
  } catch (error) {
    // Ignore errors, such as the index not existing
    console.log("Could not drop index (it may not exist, which is fine).");
  }
  try {
    for (const platformData of defaultPlatforms) {
      // Find a platform with a null user and the same name
      const existingPlatform = await Platform.findOne({
        name: platformData.name,
        user: null,
      });

      if (!existingPlatform) {
        await Platform.create(platformData);
        console.log(`Seeded platform: ${platformData.name}`);
      }
    }
  } catch (error) {
    console.error("Error seeding platforms:", error);
  }
};
