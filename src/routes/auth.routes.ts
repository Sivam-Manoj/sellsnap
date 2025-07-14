import express from 'express';
import { signup, login, refreshToken } from '../controller/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/refresh-token', refreshToken);

export default router;
