import { Authenticator } from "remix-auth";

import type { AdminAuthSession } from "./session.server";
import { sessionStorage } from "./session.server";

/**
 * Inits Authenticator.
 */
export let authenticator = new Authenticator<AdminAuthSession>(sessionStorage);

export const HOST_URL =
  process.env.NODE_ENV === "development"
    ? process.env.DEV_HOST_URL
    : process.env.PROD_HOST_URL;
