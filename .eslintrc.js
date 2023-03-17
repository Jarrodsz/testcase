/**
 * @type {import("@types/eslint").Linter.BaseConfig}
 */
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
  },
  env: {
    es6: true,
    "cypress/globals": true,
  },
  extends: [
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
    "@remix-run/eslint-config/jest-testing-library",
    "plugin:react-hooks/recommended",
    "eslint:recommended",
  ],
  plugins: ["cypress", "remix", "import", "simple-import-sort", "chakra-ui"],
  rules: {
    "remix/node-server-imports": "error",
    "remix/use-loader-data-types": "error",
    "import/newline-after-import": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/no-duplicates": "error",
    "chakra-ui/props-order": "error",
    "chakra-ui/props-shorthand": "error",
    "chakra-ui/require-specific-component": "error",
  },
  overrides: [
    {
      files: ["**/*.js", "**/*.ts", "**/*.tsx"],
      rules: {
        "simple-import-sort/imports": [
          "error",
          {
            groups: [
              // `react` first, `next` second, then packages starting with a character
              ["^react$", "^next", "^[a-z]"],
              ["^@prisma"],
              // Packages starting with `@remix-run
              ["^@remix-run/node"],
              ["^@remix-run/react"],
              // Auth
              ["^app/core/services/auth"],
              // Packages starting with `@`
              ["^@"],
              // Packages starting with `~`
              ["^~"],
              // Imports starting with `../`
              ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
              // Imports starting with `./`
              ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
              // Chakra UI
              ["^@chakra-ui"],
              // Saas UI
              ["^@saas-ui"],
              ["^app/lib"],
              ["^app/services"],
              ["^app/mailers"],
              ["^app/domains/auth"],
              [("^.+form.+", "^domain-functions")],
              ["^app/components"],
              ["^domain-functions"],
              // Domain functions
              ["^app/domains"],
              // Style imports
              ["^.+\\.s?css$"],
              // Side effect imports
              ["^\\u0000"],
            ],
          },
        ],
      },
    },
  ],
  // we're using vitest which has a very similar API to jest
  // (so the linting plugins work nicely), but it means we have to explicitly
  // set the jest version.
  settings: {
    jest: {
      version: 28,
    },
  },
};
