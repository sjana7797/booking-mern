import { z } from "zod";

export const UserZodSchema = z.object({
  _id: z.string(),
  username: z.string(),
  email: z.string(),
  password: z.string().optional(),
  isAdmin: z.boolean().optional(),
});

export const UserCreateSchema = UserZodSchema.pick({
  email: true,
  username: true,
  isAdmin: true,
}).extend({
  password: z.string(),
});

export const UserLoginSchema = UserCreateSchema.pick({
  email: true,
  password: true,
});
