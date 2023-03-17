import { z } from "zod";

export const userIdSchema = z.string().nonempty();

export const createUserSchema = z.object({
  email: z.string().min(1, "Email is required.").email("Email is invalid."),
  password: z.string().min(1, "Password is required."),
});

export const updateUserSchema = z.object({
  email: z.string().min(1, "Email is required.").email("Email is invalid."),
  password: z.string().min(1, "Password is required."),
});

export const updateUserProfileSchema = z.object({
  first_name: z.string().min(1, "Firstname is required"),
  last_name: z.string().min(1, "LastName is required"),
});

export const updateUserPasswordSchema = z.object({
  password_current: z.string().min(1, "Current password is required"),
  password_new: z.string().min(1, "New password is required"),
  password_confirm: z.string().min(1, "Confirm password is required"),
});

export const updateUserEmailSchema = z.object({
  email: z.string().email().min(1, "Current password is required"),
  email_confirm: z.string().email().min(1, "New password is required"),
});
