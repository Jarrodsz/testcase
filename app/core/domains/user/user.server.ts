import bcrypt from "bcryptjs";

import {
  createUserSchema,
  updateUserEmailSchema,
  updateUserProfileSchema,
  userIdSchema
} from "~/core/domains/user/_schema";
import { client, e } from "~/db.server";

import { makeDomainFunction } from "domain-functions";

export function User(id: string) {
  return e.select(e.User, (user) => ({
    filter: e.op(user.id, "=", e.uuid(id)),
  }));
}

export const updateUserPassword = makeDomainFunction(updateUserProfileSchema)(
  async ({ first_name, last_name }) => {
    //todo
  }
);

export const updateUserEmail = makeDomainFunction(updateUserEmailSchema)(
  async ({ email, email_confirm }) => {
    //todo
  }
);

export const createUser = makeDomainFunction(createUserSchema)(
  async ({ email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = e
      .insert(e.User, {
        created_at: new Date(),
        onboarded: false,
        email: email,
        password: e.insert(e.UserPassword, {
          hash: hashedPassword,
        }),
        profile: e.insert(e.UserProfile, {
          first_name: "first_name",
          last_name: "last_name",
        }),
        // organisation: e.insert(e.Organisation, {
        //   profile: e.insert(e.OrganisationProfile, {
        //     name: "Name",
        //     address: "Address",
        //     addressNr: "AddressNr",
        //     city: "City",
        //     postal: "PostalCode",
        //   }),
        // }),
      })
      .run(client);

    return user;
  }
);

export const updateUserProfile = makeDomainFunction(
  updateUserProfileSchema,
  userIdSchema
)(async (fields, userId) => {
  const updatedProfile = e
    .update(e.UserProfile, (UserProfile) => ({
      filter_single: { id: userId },
      set: {
        ...fields,
      },
    }))
    .run(client);
  console.log("userId: ", userId);
  console.log("fields: ", fields);
  return updatedProfile;
});

export async function getUserById(id: string) {
  const user = await e
    .select(e.User, (user) => ({
      ...e.User["*"],
      ...e.UserProfile["*"],
      //get organisation here based on the organisationId
      // that is populated true dropdown?
      // or set to the first oragnisation
      filter_single: e.op(user.id, "=", e.uuid(id)),
    }))
    .run(client);
  console.log("user:", user);
  return user;
}

export async function getUserByEmail(email: string) {
  const user = await e
    .select(e.User, (user) => ({
      ...e.User["*"],
      filter_single: e.op(user.email, "=", email),
    }))
    .run(client);

  return user;
}

export async function deleteUserByEmail(email: string) {
  return e
    .delete(e.User, (user) => ({
      filter: e.op(user.email, "=", email),
    }))
    .run(client);
}
