module.exports = function (wallaby) {
  process.env.NODE_ENV = "test";

  return {
    autoDetect: true,
    testFramework: {
      // the jest configuration file path
      // (relative to project root)
      configFile: "./jest.config.js",
    },
    files: [
      "packages/**/*.ts",
      "packages/**/*.{json,yaml,ts,tsx,graphql}",
      "!packages/**/*test.ts",
    ],

    tests: ["packages/**/*test.ts", "!**/node_modules/**"],
  };
};
