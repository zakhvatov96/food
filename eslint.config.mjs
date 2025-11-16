import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.browser,
      sourceType: "script",
      ecmaVersion: "latest",
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
      "quotes": ["error", "single"],
      "semi": ["error", "always"],
    },
  },
];