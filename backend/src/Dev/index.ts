import { Router } from "express";
import { PrismaClient } from "@prisma/client"
import { ExperienceInputSchema } from "../Types";

const prisma = new PrismaClient();
export const DevHandler = Router();



DevHandler.get("/Health", (req, res) => {
    return res.status(200).json({
        Message: "Dev Route Up and Running"
    });
});


DevHandler.post("/experiences", async (req, res) => {
  try {
    
    const parsed = ExperienceInputSchema.parse(req.body);
    const { title, image, price, description, location, about, slots } = parsed;

    
    const existingExperience = await prisma.experience.findFirst({
      where: { title },
    });

    if (existingExperience) {
      return res.status(409).json({
        message: "Experience already exists",
      });
    }

    
    const experience = await prisma.experience.create({
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
  } catch (error: any) {
    
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
});
