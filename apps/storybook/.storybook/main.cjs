const path = require("node:path");

const getAbsolutePath = (packageName) =>
  path.dirname(require.resolve(path.join(packageName, "package.json")));

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
module.exports = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [],
  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
};
