import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      '@playwright/eslint-plugin': {}
    },
    rules: {
      "linebreak-style": ["error", "unix"],
      "semi": ["warn", "always"],
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "camelcase": [
         "error", {
          "ignoreImports": true,
          "ignoreDestructuring": true,
          "properties": "never"
        }
      ],
      "no-debugger": ["error"],
      "max-params": ["error", 5],
      "no-return-await": "error",
      "no-var": "error",
      "prefer-const": "error",
      "array-bracket-newline": ["error", { "multiline": true, "minItems": 3 }],
      "arrow-spacing": "error",
      "block-spacing": "error",
      "brace-style": "error",
      "comma-spacing": ["error", { "before": false, "after": true }],
      "eol-last": ["error", "always"],
      "function-call-argument-newline": ["error", "consistent"],
      "max-len": ["error", { "ignoreStrings": true, "code": 280 }],
      "no-multi-spaces": "error",
      "no-multiple-empty-lines": ["error", { "max": 2, "maxEOF": 0 }],
      "curly": "error",
      "space-before-blocks": "error",
      "space-before-function-paren": ["error", "always"],
      "@typescript-eslint/no-unused-vars": "off",
      "jest/no-identical-title": "off",
      "jest/no-standalone-expect": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "no-constant-condition": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-magic-numbers": [
        "error", {
          "ignore": [
              -1, 0, 1, 2, 3, 4, 5
          ],
          "ignoreArrayIndexes": true,
          "ignoreDefaultValues": true,
          "ignoreEnums": true,
          "ignoreNumericLiteralTypes": true,
          "ignoreTypeIndexes": true
        }
      ]
    }
  }
];
