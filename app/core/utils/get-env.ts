import isBrowser from "~/core/utils/is-browser";

function getEnv() {
  return isBrowser() ? window.ENV : process.env;
}

export default getEnv;
