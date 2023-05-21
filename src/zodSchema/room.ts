import { z } from "zod";

export const RoomZodSchema = z.object({
  title: z.string(),
  description: z.string(),
  hotel: z.string(),
  roomNumbers: z.array(
    z.object({
      number: z.number(),
      unavailableDates: z.array(z.date()),
    })
  ),
  price: z.number(),
  maxPerson: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  __v: z.number(),
  _id: z.string(),
});

export const RoomCreationSchema = RoomZodSchema.pick({
  title: true,
  description: true,
  roomNumbers: true,
  price: true,
  maxPerson: true,
});

export const validateHotelId = z.object({
  hotelId: z.string(),
});
