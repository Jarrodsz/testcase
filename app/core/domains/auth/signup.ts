import { z } from "zod";

import { createUser, getUserByEmail } from "~/core/domains/user/user.server";
import { validateEmail } from "~/core/utils/utils";

import { makeDomainFunction } from "domain-functions";

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

export const Signup = makeDomainFunction(SignupFormSchema)(
  async ({ email, password }) => {
    console.log("calling signupUser");
    console.log("email", email);
    console.log("password", password);

    if (!validateEmail(email)) {
      throw new Error("Email is invalid");
    }

    if (!password) {
      throw new Error("Password is required");
    }

    if (password.length < 8) {
      throw new Error("Password needs to be longer than 8 characters");
    }

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      console.log("XXX");
      console.log("ExistingUser");
      console.log(existingUser);
      throw new Error("A user already exists with this email");
    }
    return await createUser(email, password);
  }
);
