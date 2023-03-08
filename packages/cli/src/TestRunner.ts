import chai from "chai";
import chalk from "chalk";
import * as fs from "fs";
import Mocha from "mocha";
import path from "path";

const line = "-".repeat(process.stdout.columns);

export interface TestRunResult {
  success: boolean;
}

export type TestRunnerAction = "testBefore" | "testAfter";

export class TestRunner {
  constructor(public migrationFileName: string) {}

  async run(action: TestRunnerAction, params: any): Promise<TestRunResult> {
    return new Promise<TestRunResult>(async (resolve) => {
      console.log(line);
      console.log(chalk.yellowBright(`🤔 [${action.toUpperCase()}]...`));

      // get module to check which tests are provided
      const module = await getModule(this.migrationFileName);

      // check if test is provided
      if (!module.default[action]) {
        console.log(
          chalk.greenBright(
            `✅ [${action.toUpperCase()}] ${path.basename(
              this.migrationFileName
            )}... SKIPPED (no tests found)`
          )
        );
        resolve({ success: true });
        return;
      }

      // mocha setup
      const Test = Mocha.Test;
      const suiteInstance = Mocha.Suite;
      const mocha = new Mocha({
        // 5 minutes timeout
        timeout: 5 * 60 * 1000,
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

      var success = await runMochaTests();

      if (success) {
        console.log(
          chalk.greenBright(`✅ [${action.toUpperCase()}]... SUCCESS`)
        );
      } else {
        console.log(chalk.red(`❌ [${action.toUpperCase()}]... FAILED`));
      }

      console.log(line);
      console.log();

      // run and resolve
      resolve({ success });
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
