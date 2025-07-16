import express from 'express';
import { signup, login, googleSignIn, refreshToken } from '../controller/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/google', googleSignIn);
router.post('/refresh-token', refreshToken);

export default router;
