/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  watchPaths: ["./core/**/*"],
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
};
