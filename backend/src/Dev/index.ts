import { Router } from "express";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();
export const DevHandler = Router();

DevHandler.get("/Health", (req, res) => {
    return res.status(200).json({
        Message: "Dev Route Up and Running"
    });
});