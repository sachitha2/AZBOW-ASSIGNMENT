module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "next/core-web-vitals",
        "next",
    ],
    plugins: ["unused-imports"],
    rules: {
        "react/react-in-jsx-scope": "off", // Disable React import requirement for JSX
        "no-undef": "off", // Turn off the no-undef rule for React types
        "unused-imports/no-unused-imports": "warn",
        "unused-imports/no-unused-vars": [
            "warn",
            { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
        ],
    },
};
