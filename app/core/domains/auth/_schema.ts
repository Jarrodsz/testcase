import { z } from "zod";

export const SignupFormSchema = z.object({
  //organisationName: z.string().min(1, 'Organisation name is required'),
  //firstName: z.string().min(1, 'First name is required'),
  //lastName: z.string().min(1, 'Last name is required'),
  //confirmPassword: z.string().min(1, 'Confirm Password is required.'),
  email: z.string().min(1, "Email is required").email("Email is invalid"),
  password: z.string().min(1, "Password is required"),
  //})
  //.refine((data) => data.password === data.confirmPassword, {
  //	message: 'Passwords does not match.',
  //	path: ['confirmPassword']
});

export const requestPasswordResetFormSchema = z.object({
  email: z.string().min(1, "Email is required.").email("email is invalid"),
});

export const resetPasswordFormSchema = z.object({
  password: z.string().min(1, "Password is required."),
  password_confirm: z.string().min(1, "Password confirmation is required."),
});
