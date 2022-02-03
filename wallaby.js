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
      "src/**/*.ts",
      "src/**/*.{json,yaml,ts,tsx,graphql}",
      "!src/**/*test.ts",
    ],

    tests: ["src/**/*test.ts", "!**/node_modules/**"],
  };
};
