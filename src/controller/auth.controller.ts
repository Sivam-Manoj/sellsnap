import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
import User from "../models/user.model.js";
import {
  sendVerificationCode,
  sendPasswordResetLink,
} from "../utils/sendVerificationEmail.js";
import crypto from "crypto";
import appleAuth from "apple-signin-auth";

dotenv.config();

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const username = email.split("@")[0];

    const verificationCode = Math.floor(
      10000 + Math.random() * 90000
    ).toString();
    const verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const newUser = new User({
      email,
      password: hashedPassword,
      username,
      authProvider: "email",
      verificationCode,
      verificationCodeExpires,
    });

    await newUser.save();

    try {
      await sendVerificationCode(email, verificationCode);
      res
        .status(201)
        .json({
          message:
            "Signup successful. Please check your email for a verification code.",
        });
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError);
      // Optional: Decide if you want to proceed without email verification or return an error
      res
        .status(500)
        .json({
          message: "User created, but failed to send verification email.",
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user || user.authProvider !== "email") {
      return res.status(404).json({
        message: "User not found or not registered with email/password.",
      });
    }

    if (!user.isVerified) {
      return res
        .status(403)
        .json({ message: "Please verify your email before logging in." });
    }

    if (!user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "7d" }
    );

    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const googleSignIn = async (req: Request, res: Response) => {
  const { idToken } = req.body;

  if (!process.env.GOOGLE_CLIENT_ID) {
    console.error("Google Client ID not configured.");
    return res
      .status(500)
      .json({ message: "Google Sign-In is not configured on the server." });
  }

  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).json({ message: "Invalid Google token" });
    }

    const { sub: googleId, email, name } = payload;

    let user = await User.findOne({ googleId });

    if (!user) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({
            message:
              "An account with this email already exists. Please sign in with your password.",
          });
      }

      user = new User({
        googleId,
        email,
        username: name, // Or generate a unique username
        authProvider: "google",
        isVerified: true, // Google users are considered verified
      });
      await user.save();
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "7d" }
    );

    user.refreshToken = refreshToken;
    await user.save();

    res
      .status(200)
      .json({
        accessToken,
        refreshToken,
        user: { id: user._id, email: user.email, username: user.username },
      });
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    res.status(500).json({ message: "Google Sign-In failed" });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { email, verificationCode } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Email is already verified." });
    }

    if (user.verificationCode !== verificationCode) {
      return res.status(400).json({ message: "Invalid verification code." });
    }

    if (
      user.verificationCodeExpires &&
      user.verificationCodeExpires < new Date()
    ) {
      return res
        .status(400)
        .json({ message: "Verification code has expired." });
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "7d" }
    );

    user.refreshToken = refreshToken;
    await user.save();

    res
      .status(200)
      .json({
        message: "Email verified successfully.",
        accessToken,
        refreshToken,
      });
  } catch (error) {
    console.error("Email Verification Error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong during email verification." });
  }
};

export const resendVerificationCode = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Email is already verified." });
    }

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.verificationCode = verificationCode;
    user.verificationCodeExpires = verificationCodeExpires;
    await user.save();

    await sendVerificationCode(email, verificationCode);

    res
      .status(200)
      .json({
        message: "A new verification code has been sent to your email.",
      });
  } catch (error) {
    console.error("Resend Verification Code Error:", error);
    res
      .status(500)
      .json({
        message: "Something went wrong while resending the verification code.",
      });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Refresh token not provided" });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== token) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "15m",
    });

    res.json({ accessToken });
  } catch (error) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      // To prevent user enumeration, we send a generic success message even if the user doesn't exist.
      return res
        .status(200)
        .json({
          message:
            "If an account with that email exists, a password reset link has been sent.",
        });
    }

    // Generate a reset token that will be sent to the user.
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash the token before storing it in the database for security.
    user.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Set token expiration to 10 minutes from now.
    user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    // This URL will point to the web page for resetting the password.
    const resetUrl = `${
      process.env.CLIENT_URL || "http://localhost:3000"
    }/reset-password.html?token=${resetToken}`;

    await sendPasswordResetLink(user.email, resetUrl);

    res
      .status(200)
      .json({
        message:
          "If an account with that email exists, a password reset link has been sent.",
      });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    // Do not reveal specific errors to the client.
    res
      .status(200)
      .json({
        message:
          "If an account with that email exists, a password reset link has been sent.",
      });
  }
};

export const appleSignIn = async (req: Request, res: Response) => {
  console.log('Apple Sign-In request received');
  console.log('Request body:', req.body);
  const { token, fullName } = req.body;

  if (!process.env.APPLE_CLIENT_ID) {
    console.error("Apple Client ID not configured.");
    return res
      .status(500)
      .json({ message: "Apple Sign-In is not configured on the server." });
  }

  try {
    console.log('Verifying Apple token...');
    // Allow Expo Go client ID during development
    const audience = process.env.NODE_ENV === 'development'
      ? [process.env.APPLE_CLIENT_ID, 'host.exp.Exponent']
      : process.env.APPLE_CLIENT_ID;

    const claims = await appleAuth.verifyIdToken(token, {
      audience: audience,
      ignoreExpiration: true, // Recommended for server-side validation
    });
    console.log('Apple token verified successfully. Claims:', claims);
    const { sub: appleId, email } = claims;

    let user = await User.findOne({ appleId });

    if (!user) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({
            message:
              "An account with this email already exists. Please sign in with your original method.",
          });
      }

      // Note: Apple only provides name on the first sign-in.
      // The client can optionally send it if available.
      const username = fullName || email.split("@")[0];

      user = new User({
        appleId,
        email,
        username,
        authProvider: "apple",
        isVerified: true, // Email from Apple is considered verified
      });

      await user.save();
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "7d" }
    );

    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.error('Apple Sign-In Error - Something went wrong in the try block:', error);
    res
      .status(500)
      .json({ message: "Something went wrong during Apple Sign-In." });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Hash the token from the URL to match the one stored in the DB
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }, // Check if the token is not expired
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Password reset token is invalid or has expired." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update user's password and clear the reset token fields
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    // Invalidate any existing refresh tokens by clearing them
    user.refreshToken = undefined;

    await user.save();

    // Log the user in by sending new tokens
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "7d" }
    );

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    res
      .status(200)
      .json({
        message: "Password has been reset successfully.",
        accessToken,
        refreshToken,
      });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while resetting the password." });
  }
};
