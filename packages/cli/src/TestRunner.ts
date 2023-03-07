import chai from "chai";
import chalk from "chalk";
import * as fs from "fs";
import Mocha from "mocha";
import ora from "ora";
import path from "path";

export interface TestRunResult {
  success: boolean;
  failureMessages?: Array<string>;
}

export type TestRunnerAction = "testBefore" | "testAfter";

export class TestRunner {
  constructor(public migrationFileName: string) {}

  async run(action: TestRunnerAction, params: any): Promise<TestRunResult> {
    return new Promise<TestRunResult>(async (resolve) => {
      // start spinner
      var spinner = ora(
        chalk.yellowBright(`[RUNNING] `) +
          `\"${action}\" on ${path.basename(this.migrationFileName)}`
      ).start();

      try {
        // get module to check which tests are provided
        const module = await getModule(this.migrationFileName);

        // check if test is provided
        if (!module.default[action]) {
          spinner.succeed(
            chalk.yellowBright(`[SKIPPED] `) + `\"${action}\": No test found.`
          );
          resolve({ success: true });
          return;
        }

        // mocha setup
        const Test = Mocha.Test;
        const suiteInstance = Mocha.Suite;
        const mocha = new Mocha({
          timeout: 200000,
        });

        // create suite
        const suite = suiteInstance.create(
          mocha.suite,
          path.basename(this.migrationFileName)
        );

        // get tests
        const tests = (await module.default[action](params, chai)) || {};

        // add tests to suite
        for (var testName of Object.keys(tests)) {
          suite.addTest(new Test(testName, tests[testName]));
        }

        // create test runner
        const runMochaTests = () => {
          return new Promise<boolean>((resolve) => {
            mocha.run((failures) => {
              if (failures) return resolve(false);
              resolve(true);
            });
          });
        };

        // run and resolve
        resolve({ success: await runMochaTests() });
      } finally {
        spinner.stop();
      }
    });
  }
}

const getModule = async (p: string) => {
  if (!fs.existsSync(p)) {
    throw new Error("File does not exist" + p);
  }
  const module = await import(p);
  // delete require cache
  delete require.cache[p];
  return module;
};

// Back to Hotmig,
// db zu testen =>
// run jest cli with execa
// - testen,
// - console logs entfernen (hotmig)
// - dateinamen länge sicherstellen (fix)
// (dev) neue actions =>
// - next (commit, migrate, new),
// - commit, migrate and exit,
// - exit (gibbet schon)
