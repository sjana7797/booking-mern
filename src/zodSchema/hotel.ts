import { z } from "zod";

export const HotelZodSchema = z.object({
  name: z.string(),
  type: z.string(),
  city: z.string(),
  address: z.string(),
  photos: z.array(z.string()).optional(),
  description: z.string(),
  title: z.string(),
  rating: z.number().min(0).max(5),
  rooms: z.array(z.string()).optional(),
  cheapestPrice: z.number(),
  featured: z.boolean(),
  distance: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  __v: z.number(),
  _id: z.string(),
});

export const HotelCreationSchema = HotelZodSchema.pick({
  address: true,
  name: true,
  type: true,
  city: true,
  photos: true,
  description: true,
  rating: true,
  rooms: true,
  cheapestPrice: true,
  featured: true,
  distance: true,
  title: true,
});

export const HotelUpdateSchema = HotelCreationSchema.deepPartial();
