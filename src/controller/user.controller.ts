import { Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import { AuthRequest } from '../middleware/auth.middleware.js';

// @desc    Get user profile
// @route   GET /api/user/me
// @access  Private
export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.userId).select('-password -refreshToken');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete user account
// @route   DELETE /api/user
// @access  Private
export const deleteUserAccount = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.userId).select('+password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If the user signed up with email, we need to verify their password
    if (user.authProvider === 'email') {
      const { password } = req.body;
      if (!password) {
        return res.status(400).json({ message: 'Password is required' });
      }

      // This should not happen for email provider, but as a safeguard
      if (!user.password) {
        return res.status(400).json({ message: 'Password not set for this account.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    }

    // For Google-authenticated users, or if email/password is a match, proceed with deletion.
    await User.findByIdAndDelete(req.userId);

    res.json({ message: 'User account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
