import express from 'express';
import { signup, login, googleSignIn, refreshToken, verifyEmail, resendVerificationCode, forgotPassword, resetPassword } from '../controller/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/google', googleSignIn);
router.post('/refresh-token', refreshToken);
router.post('/verify-email', verifyEmail);
router.post('/resend-verification-code', resendVerificationCode);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

export default router;
