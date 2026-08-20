import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  ...eslintPluginAstro.configs.recommended,
  eslintConfigPrettier,
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: eslintPluginAstro.parser,
      parserOptions: {
        parser: tseslint,
        extraFileExtensions: [".astro"],
      },
    },
  },
];
