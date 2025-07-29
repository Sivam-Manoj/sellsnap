import { Response } from 'express';
import { analyzeTrend, getTrendsByUserId, deleteTrendById } from '../service/trendService.js';
import { AuthRequest } from '../types/authRequest.js';

export const getTrendAnalysis = async (req: AuthRequest, res: Response) => {
  try {
    const { product, marketplace, country } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    if (!product || !marketplace || !country) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const trendAnalysis = await analyzeTrend(
      userId,
      product,
      marketplace,
      country
    );
    res.status(201).json(trendAnalysis);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    } else {
      res.status(500).json({ message: 'An unknown server error occurred' });
    }
  }
};

export const getTrends = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const trends = await getTrendsByUserId(userId);
    res.status(200).json(trends);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    } else {
      res.status(500).json({ message: 'An unknown server error occurred' });
    }
  }
};

export const deleteTrend = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { id: trendId } = req.params;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    await deleteTrendById(trendId, userId);

    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    } else {
      res.status(500).json({ message: 'An unknown server error occurred' });
    }
  }
};
