module.exports = {
  rootDir: "../..",
  testEnvironment: "node",
  transform: {
    "^.+\\.(t|j)sx?$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/shared/unit/tsconfig.json",
      },
    ],
  },
  testMatch: ["<rootDir>/shared/unit/**/*.unit.test.ts"],
};
