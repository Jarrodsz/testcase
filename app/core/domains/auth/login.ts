import bcrypt from "bcryptjs";
import { z } from "zod";

import { client, e } from "~/db.server";

import { InputError, makeDomainFunction } from "domain-functions";

export const loginFormSchema = z.object({
  email: z.string().min(1, "Email is required.").email("Email is invalid."),
  password: z.string().min(1, "Password is required."),
});

export const loginUser = makeDomainFunction(loginFormSchema)(
  async ({ email, password }) => {
    console.log("user email: ", email);
    console.log("password: ", password);
    const user = await e
      .select(e.User, (user) => ({
        ...e.User["*"],
        password: {
          ...e.UserPassword["*"],
        },
        filter_single: e.op(user.email, "=", email),
      }))
      .run(client);

    console.log("Result of the query:", user);

    if (!user?.password) {
      console.log("No password found in the result of the query");
      throw new Error("No password.");
    } else {
      console.log("password found");
    }

    const isPasswordValid = bcrypt.compare(password, user.password.hash);
    if (!isPasswordValid) {
      console.log("invalid password");
      throw new InputError(
        'Incorrect password. Please try again or select "Forgot password" to change it.',
        "password"
      );
    } else {
      console.log("correct password");
    }

    const { password: _password, ...userWithoutPassword } = user;
    console.log("return userWithoutPassword", userWithoutPassword);
    return userWithoutPassword;
  }
);

export const loginAdmin = makeDomainFunction(loginFormSchema)(
  async ({ email, password }) => {
    console.log("Admin email: ", email);
    console.log("password: ", password);
    const Admin = await e
      .select(e.Admin, (Admin) => ({
        ...e.Admin["*"],
        password: {
          ...e.AdminPassword["*"],
        },
        filter_single: e.op(Admin.email, "=", email),
      }))
      .run(client);

    console.log("Result of the query:", Admin);

    if (!Admin?.password) {
      console.log("No password found in the result of the query");
      throw new Error("No password.");
    } else {
      console.log("password found");
    }

    const isPasswordValid = bcrypt.compare(password, Admin.password.hash);
    if (!isPasswordValid) {
      console.log("invalid password");
      throw new InputError(
        'Incorrect password. Please try again or select "Forgot password" to change it.',
        "password"
      );
    } else {
      console.log("correct password");
    }

    const { password: _password, ...AdminWithoutPassword } = Admin;
    console.log("return AdminWithoutPassword", AdminWithoutPassword);
    return AdminWithoutPassword;
  }
);
