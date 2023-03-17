import { createCookieSessionStorage } from "@remix-run/node";

import type { Organisation, OrganisationProfile, OrganisationSubscription, User, UserProfile } from "~/db.server";

export interface UserAuthSession extends User {
  //password: UserPassword;
  profile: UserProfile;
  organisation: Organisation;
  organisationProfile: OrganisationProfile;
  OrganisationSubscription: OrganisationSubscription;
}

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session_user",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [process.env.SESSION_USER_SECRET || "SESSION_SECRET"],
    secure: process.env.NODE_ENV === "production",
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
