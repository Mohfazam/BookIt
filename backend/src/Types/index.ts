import { z } from "zod";

export const SlotInputSchema = z.object({
  date: z.string().refine(
    (d) => !isNaN(Date.parse(d)),
    { message: "Invalid date format" }
  ),
  time: z.string().min(3, "Time is required"),
  available: z.boolean().optional().default(true),
});

export const ExperienceInputSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  image: z.string().url("Invalid image URL"),
  price: z.number().positive("Price must be positive"),
  description: z.string().min(10, "Description too short"),
  location: z.string().min(2, "Location required"),
  about: z.string().min(10, "About section too short"),
  slots: z.array(SlotInputSchema).optional(),
});


export type SlotInput = z.infer<typeof SlotInputSchema>;
export type ExperienceInput = z.infer<typeof ExperienceInputSchema>;
