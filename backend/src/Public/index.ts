import { Router } from "express";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();
export const PublicHandler = Router();

PublicHandler.get("/Health", (req, res) => {
    return res.status(200).json({
        Message: "Public Route Up and Running"
    });
});

PublicHandler.get("/", (req, res) => {

});