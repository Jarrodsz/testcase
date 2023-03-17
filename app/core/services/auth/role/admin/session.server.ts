import { createCookieSessionStorage } from "@remix-run/node";

import type { Admin, AdminProfile } from "~/db.server";

export interface AdminAuthSession extends Admin {
  AdminProfile: AdminProfile;
}

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session_admin",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [process.env.SESSION_ADMIN_SECRET || "SESSION_ADMIN_SECRET"],
    secure: process.env.NODE_ENV === "production",
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
