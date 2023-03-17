import { base } from "app/core/config/base";
import { meta } from "app/core/config/meta";

const mailer = {
  mailer_from: `"${meta.siteName}" <mailer@${base.siteUrl}>`,
  smtp_host: "localhost",
  smtp_port: 1025,
  smtp_user: "dummyuser",
  smtp_password: "dummypassword",
  secure: false,
};

if (process.env.NODE_ENV === "production") {
  mailer.mailer_from = `"${meta.siteName}" <mailer@${base.siteUrl}>`;
  mailer.smtp_host = "smtp.gmail.com";
  mailer.smtp_port = 587;
  mailer.smtp_user = "mailere@myapp.local";
  mailer.smtp_password = "password";
  mailer.smtp_tls = false;
}

export { mailer };
