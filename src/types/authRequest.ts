import { Request } from "express";

export interface AuthRequest extends Request {
    user?: any;
    userId?: string;
}