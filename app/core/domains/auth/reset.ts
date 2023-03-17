import { createCookie } from "@remix-run/node";

import { configuration } from "~/configuration";
import { requestPasswordResetFormSchema, resetPasswordFormSchema } from "~/core/domains/auth/_schema";
import { getUserByEmail } from "~/core/domains/user/user.server";
import { getSession } from "~/core/services/auth/role/user/session.server";
import { encrypt } from "~/core/services/auth/utils/encryption.server";
import { validateEmail } from "~/core/utils/utils";

import { makeDomainFunction } from "domain-functions";

export const requestPasswordReset = makeDomainFunction(
  requestPasswordResetFormSchema
)(async ({ email }, request) => {
  console.log("called requestPasswordReset mutation");
  // console.log("email", email);
  // console.log("request inside DF:", request);

  if (!email) {
    throw new Error("Email is required.");
  }
  if (!validateEmail(email)) {
    throw new Error("Incorrect email.");
  }

  const dbUser = await getUserByEmail(email);
  //console.log("DBUSER", dbUser.email);

  // Encrypts `email`.
  const resetPasswordToken = encrypt(
    JSON.stringify({
      type: "forget_password",
      payload: { email },
    })
  );

  // console.log("resetPasswordToken", resetPasswordToken);

  // Creates a new URL that points to the current route.
  // const resetPasswordUrl = new URL(`${configuration.host}/login/request`);
  const resetPasswordUrl = new URL(
    `${configuration.base.siteUrl}/password/${resetPasswordToken}`
  );

  // console.log("resetPasswordUrl", resetPasswordUrl);
  // console.log("email", email);
  //await sendTransactionalResetPasswordEmail(dbUser.email, dbUser);

  //const session = await getSession(request.headers.get("Cookie"));
  const session = await createCookie("forget-password", {
    email: dbUser.email,
  });

  //console.log("cookie:", session);

  return resetPasswordUrl;
});

export const resetPassword = makeDomainFunction(resetPasswordFormSchema)(
  async (request) => {
    console.log("called resetPassword mutation");
    console.log(request);
    const session = getSession(request.headers.get("Cookie"));
    console.log("SESSION", session);
    console.log("after");
  }
);
