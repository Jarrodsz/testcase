const base = {
  siteUrl: "http://localhost:3000",
  appUrl: "http://localhost:3000",
};

if (process.env.NODE_ENV === "production") {
  base.siteUrl = "https://me.com";
  base.appUrl = "https://me.com";
}

export { base };
