import * as z from "zod";

export const signUpFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

export const signInFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

export const postFormSchema = z.object({
  caption: z.string().min(5).max(2200),
  location: z.string().min(2).max(100),
  tags: z.string(),
  file: z.custom<File[]>(),
});