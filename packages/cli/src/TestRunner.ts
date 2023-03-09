import chai from "chai";
import chalk from "chalk";
import * as fs from "fs";
import Mocha from "mocha";
import path from "path";

// const line = "-".repeat(process.stdout.columns);
const line = "-".repeat(32);

export interface TestRunResult {
  success: boolean;
}

type TestFileContent = Array<{
  commit: string;
  tests: Array<{
    name: string;
    skip?: boolean;
  }>;
}>;

export type TestRunnerAction = "testBefore" | "testAfter";

export const runAllTests = async (testFilePath: string, params: any) => {
  return new Promise<TestRunResult>(async (resolve) => {
    // mocha setup
    const Test = Mocha.Test;
    const suiteInstance = Mocha.Suite;
    const mocha = new Mocha({
      // 5 minutes timeout
      timeout: 5 * 60 * 1000,
    });

    let success = false;

    console.log(line);
    console.log(chalk.yellowBright(`🤔 [TESTALL]...`));

    try {
      // load test file json
      let testFile: TestFileContent = [];
      if (fs.existsSync(testFilePath)) {
        testFile = JSON.parse(fs.readFileSync(testFilePath).toString());
      } else {
        fs.writeFileSync(testFilePath, JSON.stringify(testFile));
      }

      // iterate over defined tests
      for (var testDef of testFile) {
        // create suite
        const suite = suiteInstance.create(mocha.suite, testDef.commit);

        // load commit
        const commitPath = path.join(
          path.dirname(testFilePath),
          "commits",
          testDef.commit + ".ts"
        );
        const commit = await getModule(commitPath);

        // get tests from commit
        const tests = await commit["testAfter"]?.(params, chai);

        for (var t of testDef.tests) {
          if (!t.skip) {
            const testF = tests[t.name];
            if (testF) {
              const test = new Mocha.Test(t.name, async () => {
                await testF(params, chai);
              });
              suite.addTest(test);
            }
          } else {
            console.log(
              chalk.yellowBright(`🟡 ${t.name} @ ${testDef.commit}... SKIPPED`)
            );
          }
        }
      }
    } catch (e) {
      console.log(chalk.red("Test file not found or invalid"));
      console.log(line);
      console.log();

      console.log(e);

      // run and resolve
      resolve({ success });
      return;
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

    success = await runMochaTests();

    if (success) {
      console.log(chalk.greenBright(`🟢 [TESTALL]... SUCCESS`));
    } else {
      console.log(chalk.red(`🔴 [TESTALL]... FAILED`));
    }

    console.log(line);
    console.log();

    // run and resolve
    resolve({ success });
  });
};

export class TestRunner {
  constructor(public module: any) {}

  async run(action: TestRunnerAction, params: any): Promise<TestRunResult> {
    return new Promise<TestRunResult>(async (resolve) => {
      console.log(line);
      console.log(chalk.yellowBright(`🤔 [${action.toUpperCase()}]...`));

      // check if test is provided
      if (!this.module.default[action]) {
        console.log(
          chalk.yellowBright(
            `🟡 [${action.toUpperCase()}]... SKIPPED (no tests found)`
          )
        );
        console.log(line);
        console.log();
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
      const suite = suiteInstance.create(mocha.suite, action);

      // get tests
      const tests = this.module.default[action](params, chai) || {};

      // add tests to suite
      for (var testName of Object.keys(tests)) {
        suite.addTest(
          new Test(testName, async () => {
            await tests[testName](params, chai);
          })
        );
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
          chalk.greenBright(`🟢 [${action.toUpperCase()}]... SUCCESS`)
        );
      } else {
        console.log(chalk.red(`🔴 [${action.toUpperCase()}]... FAILED`));
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
