import { Request, Response } from "express";
import { createPlatform, getPlatforms, updatePlatform, deletePlatform, getRecentPlatforms, getAvailablePlatforms, addPlatformFromGlobal } from "../service/platform.service.js";
import Platform from "../models/platform.model.js";

export const handleCreatePlatform = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const platformData = req.body;

    if (
      !platformData.name ||
      !platformData.fields ||
      !Array.isArray(platformData.fields) ||
      platformData.fields.length === 0
    ) {
      return res
        .status(400)
        .json({
          message: "Platform name and at least one field are required.",
        });
    }

    const existingPlatform = await Platform.findOne({
      name: platformData.name,
      user: userId,
    });
    if (existingPlatform) {
      return res
        .status(400)
        .json({ message: "Platform with this name already exists." });
    }

    const newPlatform = await createPlatform(platformData, userId);
    res.status(201).json(newPlatform);
  } catch (error) {
    console.error("Error in handleCreatePlatform:", error);
    res.status(500).json({ message: "Failed to create platform." });
  }
};

export const handleGetPlatforms = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const platforms = await getPlatforms(userId);
    res.status(200).json(platforms);
  } catch (error) {
    console.error("Error in handleGetPlatforms:", error);
    res.status(500).json({ message: "Failed to fetch platforms." });
  }
};

export const handleUpdatePlatform = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const { platformId } = req.params;
    const updateData = req.body;

    const updatedPlatform = await updatePlatform(platformId, userId, updateData);

    if (!updatedPlatform) {
      return res.status(404).json({ message: "Platform not found or user not authorized to update." });
    }

    res.status(200).json(updatedPlatform);
  } catch (error) {
    console.error("Error in handleUpdatePlatform:", error);
    res.status(500).json({ message: "Failed to update platform." });
  }
};

export const handleDeletePlatform = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const { platformId } = req.params;

    const deleted = await deletePlatform(platformId, userId);

    if (!deleted) {
      return res.status(404).json({ message: "Platform not found or user not authorized to delete." });
    }

    res.status(200).json({ message: "Platform deleted successfully." });
  } catch (error) {
    console.error("Error in handleDeletePlatform:", error);
    res.status(500).json({ message: "Failed to delete platform." });
  }
};

export const handleGetRecentPlatforms = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const platforms = await getRecentPlatforms(userId);
    res.status(200).json(platforms);
  } catch (error) {
    console.error("Error in handleGetRecentPlatforms:", error);
    res.status(500).json({ message: "Failed to fetch recent platforms." });
  }
};

export const getAvailablePlatformsController = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const availablePlatforms = await getAvailablePlatforms(userId);
    res.status(200).json(availablePlatforms);
  } catch (error) {
    console.error("Error in getAvailablePlatformsController:", error);
    res.status(500).json({ message: "Failed to fetch available platforms." });
  }
};

export const addPlatformFromGlobalController = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const { platformId } = req.params;

    const newPlatform = await addPlatformFromGlobal(platformId, userId);

    if (!newPlatform) {
      return res.status(404).json({ message: "Global platform not found or already exists for user." });
    }

    res.status(201).json(newPlatform);
  } catch (error) {
    console.error("Error in addPlatformFromGlobalController:", error);
    res.status(500).json({ message: "Failed to add platform." });
  }
};
