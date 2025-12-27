import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, globalIgnores } from "eslint/config";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import unusedImports from "eslint-plugin-unused-imports";
import _import from "eslint-plugin-import";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import stylistic from "@stylistic/eslint-plugin"; // 1. Import Stylistic

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default defineConfig([
    globalIgnores([
        "**/*.css",
        "**/dist",
        "public/*",
        "**/node_modules",
        "**/build",
        "**/.next",
    ]),
    {
        files: ["**/*.ts", "**/*.tsx"],
        extends: fixupConfigRules(
            compat.extends(
                "plugin:react/recommended",
                "plugin:react-hooks/recommended",
                "plugin:jsx-a11y/recommended",
            ),
        ),
        plugins: {
            react: fixupPluginRules(react),
            "unused-imports": unusedImports,
            import: fixupPluginRules(_import),
            "@typescript-eslint": typescriptEslint,
            "jsx-a11y": fixupPluginRules(jsxA11Y),
            "@stylistic": stylistic, // 2. Register Stylistic
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parser: tsParser,
            ecmaVersion: "latest",
            sourceType: "module",
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            // --- Logic Rules ---
            "no-console": "warn",
            "react/prop-types": "off",
            "react/react-in-jsx-scope": "off",
            "no-unused-vars": "off",
            "unused-imports/no-unused-imports": "warn",
            "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

            // --- Stylistic Rules (Replaces Prettier) ---
            "@stylistic/indent": ["error", 4], // 3. Set 4-space indent
            "@stylistic/jsx-indent": ["error", 4], 
            "@stylistic/jsx-indent-props": ["error", 4],
            "@stylistic/quotes": ["error", "double"],
            "@stylistic/semi": ["error", "always"],

            // --- Import / React Rules ---
            "react/self-closing-comp": "warn",
            "import/order": [
                "warn",
                {
                    groups: ["type", "builtin", "external", "internal", ["parent", "sibling", "index"]],
                    "newlines-between": "always",
                },
            ],
            "react/jsx-sort-props": [
                "warn",
                {
                    callbacksLast: true,
                    shorthandFirst: true,
                    reservedFirst: true,
                },
            ],
        },
    },
]);