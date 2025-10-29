"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevHandler = void 0;
const express_1 = require("express");
const client_1 = require("@prisma/client");
const Types_1 = require("../Types");
const prisma = new client_1.PrismaClient();
exports.DevHandler = (0, express_1.Router)();
exports.DevHandler.get("/Health", (req, res) => {
    return res.status(200).json({
        Message: "Dev Route Up and Running"
    });
});
exports.DevHandler.post("/experiences", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsed = Types_1.ExperienceInputSchema.parse(req.body);
        const { title, image, price, description, location, about, slots } = parsed;
        const existingExperience = yield prisma.experience.findFirst({
            where: { title },
        });
        if (existingExperience) {
            return res.status(409).json({
                message: "Experience already exists",
            });
        }
        const experience = yield prisma.experience.create({
            data: {
                title,
                image,
                price,
                description,
                location,
                about,
                slots: slots
                    ? {
                        create: slots.map((slot) => ({
                            date: new Date(slot.date),
                            time: slot.time,
                            available: slot.available,
                        })),
                    }
                    : undefined,
            },
            include: { slots: true },
        });
        return res.status(201).json({
            message: "Experience added successfully",
            data: experience,
        });
    }
    catch (error) {
        if (error.name === "ZodError") {
            return res.status(400).json({
                message: "Invalid input data",
                errors: error.errors,
            });
        }
        console.error("Error creating experience:", error);
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
}));
