import { z } from "zod";
import { HotelZodSchema } from "../zodSchema/hotel";

export type Hotel = z.infer<typeof HotelZodSchema>;
