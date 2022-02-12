// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { HotMig, listGlobal } from "@hotmig/lib";
// import { commands, ProgressLocation, window } from "vscode";
import path = require("path");
import axios from "axios";
import { getDirectoriesReursively } from "./utils";
import { readdirSync, statSync } from "fs";
import { dirname, resolve } from "path";
// import { execa } from "execa";
// import { resolve } from "path";
// import { getDirectoriesReursively } from "./utils";

function run(cmd) {
  console.log("running...", cmd);
  return new Promise((resolve, reject) => {
    var spawn = require("child_process").spawn;
    let options = { shell: true };
    var command = spawn(cmd, [], options);
    var result = "";
    command.stdout.on("data", function (data) {
      result += data.toString();
    });
    command.on("close", function (code) {
      resolve(result);
    });
    command.on("error", function (err) {
      reject(err);
    });
  });
}

// let myStatusBarItem: vscode.StatusBarItem;
const Output = vscode.window.createOutputChannel("HotMig");

const getDirectoryContent = (
  basePath: string,
  last: Array<{
    type: "file" | "directory";
    value: string;
  }> = []
) => {
  const files = readdirSync(basePath);

  last.push({
    type: "directory",
    value: basePath,
  });

  files.forEach(function (file) {
    if (statSync(basePath + "/" + file).isDirectory()) {
      last = getDirectoryContent(basePath + "/" + file, last);
    } else {
      last.push({
        value: path.normalize(path.join(basePath, "\\", file)),
        type: "file",
      });
    }
  });

  return last;
};

const getHotmigs = (basePath: string) => {
  const content = getDirectoryContent(basePath);
  const hotmigs = content.filter(
    (item) => item.type === "file" && item.value.endsWith("hotmig.config.js")
  );
  return hotmigs.map((x) => dirname(x.value));
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "hotmig" is now active!');

  vscode.commands.registerCommand("hotmig.helloWorld", () => {
    vscode.window.showInformationMessage("Hello World from hotmig!");
    console.log(getDirectoryContent(resolve(__dirname, "../")));
    console.log(require("execa"));
  });

  vscode.commands.registerCommand("hotmig.init-target", async () => {
    // get all "hotmigs"

    const hotmigs = new Array<HotMig>();
    vscode.workspace.workspaceFolders?.map((folder) => {
      const content = getHotmigs(path.resolve(folder.uri.fsPath));
      for (const hmPath of content) {
        hotmigs.push(new HotMig(hmPath));
      }
    });

    if (hotmigs.length === 0) {
      vscode.window.showWarningMessage(
        "No hotmig found in any of the folders. Please run init."
      );
      return;
    }

    const a = await vscode.window.showQuickPick(hotmigs.map((hm) => hm.path));
    if (!a || a.length === 0) return;

    const hm = hotmigs.find((x) => x.path === a);

    const name = await vscode.window.showInputBox({
      prompt: "Enter the name of the target",
      value: "my-target",
    });
    console.log("name", name);
    if (!name) return;

    console.log(name);
    const target = await hm?.target(name);
    console.log(target);
    if (!target) return;

    if (target.isInitialized()) {
      vscode.window.showInformationMessage(
        `Target ${name} already initialized`
      );
      return;
    }

    // get global node modules
    let available = new Array<{ name: string; version: string }>();
    console.log(available);
    await vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: "I am long running!",
        cancellable: true,
      },
      async (progress) => {
        progress.report({ increment: 0 });

        // await new Promise((res) => setTimeout(res, 3000));

        let global = await listGlobal();
        available = global.filter((x) => x.name.indexOf("hotmig-driver-") > -1);
        console.log(available, global);
        progress.report({ increment: 100 });
      }
    );

    console.log(available);

    if (available.length === 0) {
      vscode.window.showWarningMessage(
        "No driver found. Please run install driver."
      );
      return;
    }

    console.log("aslkjdlakjsd");

    const driver = await vscode.window.showQuickPick(
      available.map((x) => x.name)
    );
    if (!driver || driver.length === 0) return;

    await target.init(driver, false);

    console.log(name, hm);

    return;

    // const hm = new HotMig(process.cwd());
    // if (!hm.isInitialized()) {
    //   // await vscode.window.showErrorMessage(`HotMig is not initialized in ${}`);
    //   return;
    // }
    // await hm.loadConfig();

    // const target = await hm.target(name);

    // if (await target.isInitialized()) {
    //   console.log(chalk.red(`target "${name}" is already initialized`));
    //   process.exit(1);
    // }

    console.log("init-target");
  });

  vscode.commands.registerCommand("hotmig.install-driver", async () => {
    // vscode.window.showErrorMessage(`asdkfjlsadfj`);

    await vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: "HotMig install driver...",
        cancellable: true,
      },
      async (progress) => {
        progress.report({ increment: 0 });
        const url =
          "https://gist.githubusercontent.com/Knaackee/b4feaaad25ca38a82e6442a5947289a6/raw";
        const response = await axios.get(url);
        const drivers = await response.data;
        console.log(drivers);

        const a = await vscode.window.showQuickPick(
          drivers?.map((x: any) => x.package) || [],
          {
            canPickMany: true,
          }
        );
        if (!a || a.length === 0) return;

        for (const name of a) {
          Output.appendLine(`Installing ${name}`);
          console.log("installing", name);
          var cp = require("child_process");
          try {
            const result = await run(
              (/^win/.test(process.platform) ? "npm.cmd" : `npm`) +
                ` install ${name}`
            );

            console.log("result coming up:");
            console.log(result);
          } catch (e) {
            console.log(e);
          }
          Output.appendLine("done");
          console.log("done");
          vscode.window.showInformationMessage(
            `Installed ${name} successfully`
          );
        }
        progress.report({ increment: 100 });
      }
    );
  });

  vscode.commands.registerCommand("hotmig.init", async () => {
    // get all folders in the workspace
    const workspaceFolders = vscode.workspace.workspaceFolders?.map((folder) =>
      getDirectoriesReursively(path.resolve(folder.uri.fsPath))
    );
    // let user show picker to select a folder
    // const a = await vscode.window.showQuickPick(workspaceFolders?.flat() || []);
    // if (!a) return;
    // const hm = new HotMig(a);
    // if (await hm.isInitialized()) {
    //   await vscode.window.showErrorMessage(
    //     `HotMig is already initialized in ${a}`
    //   );
    //   return;
    // }

    // var slugify = require("slugify");
    // const migrationsFolder = slugify(
    //   (await vscode.window.showInputBox({
    //     prompt: "Migration Folder",
    //     value: ".migrations",
    //   })) || ".migrations"
    // );

    // await hm.init(migrationsFolder);
  });

  // ask if the users wants to create its first target

  // showspinner and get global modules

  // exit if no driver was found
  // if (available.length === 0) {
  // }

  //   vscode.window.showInformationMessage(
  //     `HotMig successfuly initialized in ${a}!`
  //   );
  // });
  // decorator
  // console.log("decorator sample is activated");

  // let timeout: NodeJS.Timer | undefined = undefined;

  //   create a decorator type that we use to decorate small numbers
  //     const smallNumberDecorationType =
  //       vscode.window.createTextEditorDecorationType({
  //         borderWidth: "1px",
  //         borderStyle: "solid",
  //         overviewRulerColor: "blue",
  //         overviewRulerLane: vscode.OverviewRulerLane.Right,
  //         light: {
  //           // this color will be used in light color themes
  //           borderColor: "darkblue",
  //         },
  //         dark: {
  //           // this color will be used in dark color themes
  //           borderColor: "lightblue",
  //         },
  //       });

  // const imagePath = resolve(
  //   vscode.extensions.getExtension("hotmig.@hotmig/vscode")?.extensionPath ??
  //     "",
  //   "app_images"
  // );

  // const backgroundDecoration = vscode.window.createTextEditorDecorationType({
  //   cursor: "help",
  //   // use a themable color. See package.json for the declaration and default values.
  //   backgroundColor: { id: "myextension.largeNumberBackground" },
  // });

  // let activeEditor = vscode.window.activeTextEditor;

  // function updateDecorations() {
  //   if (!activeEditor) {
  //     return;
  //   }
  //   if (!activeEditor.document.fileName.endsWith(".js")) {
  //     return;
  //   }

  //   const text = activeEditor.document.getText();
  //   // const lines = text.split("\n");

  //   //     console.log(getDirectoriesReursively(context))

  //   const createIcon = (iconPath?: string) =>
  //     vscode.window.createTextEditorDecorationType({
  //       gutterIconPath: resolve(imagePath, "gutter-icon-dark.svg"),
  //       gutterIconSize: "85%",
  //       // light: {}, dark: {}
  //     });
  //   const gutterIcon = createIcon();
  //   activeEditor.setDecorations(backgroundDecoration, [
  //     {
  //       range: new vscode.Range(0, 0, 1, 0),
  //       hoverMessage: "Number ****",
  //     },
  //   ]);
  //   activeEditor.setDecorations(gutterIcon, [new vscode.Range(0, 0, 29, 0)]);
  // }

  // function triggerUpdateDecorations(throttle: boolean = false) {
  //   if (timeout) {
  //     clearTimeout(timeout);
  //     timeout = undefined;
  //   }
  //   if (throttle) {
  //     timeout = setTimeout(updateDecorations, 500);
  //   } else {
  //     updateDecorations();
  //   }
  // }

  // if (activeEditor) {
  //   triggerUpdateDecorations();
  // }

  // vscode.window.onDidChangeActiveTextEditor(
  //   (editor) => {
  //     activeEditor = editor;
  //     if (editor) {
  //       triggerUpdateDecorations();
  //     }
  //   },
  //   null,
  //   context.subscriptions
  // );
  // vscode.workspace.onDidChangeTextDocument(
  //   (event) => {
  //     if (activeEditor && event.document === activeEditor.document) {
  //       triggerUpdateDecorations(true);
  //     }
  //   },
  //   null,
  //   context.subscriptions
  // );

  // // progress
  // context.subscriptions.push(
  //   commands.registerCommand("extension.startTask", () => {
  //     window.withProgress(
  //       {
  //         location: ProgressLocation.Notification,
  //         title: "I am long running!",
  //         cancellable: true,
  //       },
  //       (progress, token) => {
  //         token.onCancellationRequested(() => {
  //           console.log("User canceled the long running operation");
  //         });

  //         progress.report({ increment: 0 });

  //         setTimeout(() => {
  //           progress.report({
  //             increment: 10,
  //             message: "I am long running! - still going...",
  //           });
  //         }, 1000);

  //         setTimeout(() => {
  //           progress.report({
  //             increment: 40,
  //             message: "I am long running! - still going even more...",
  //           });
  //         }, 2000);

  //         setTimeout(() => {
  //           progress.report({
  //             increment: 50,
  //             message: "I am long running! - almost there...",
  //           });
  //         }, 3000);

  //         const p = new Promise<void>((resolve) => {
  //           setTimeout(() => {
  //             resolve();
  //           }, 5000);
  //         });

  //         return p;
  //       }
  //     );
  //   })
  // );

  // // status bar

  // // register a command that is invoked when the status bar
  // // item is selected
  // const myCommandId = "sample.showSelectionCount";
  // context.subscriptions.push(
  //   vscode.commands.registerCommand(myCommandId, () => {
  //     const n = getNumberOfSelectedLines(vscode.window.activeTextEditor);
  //     vscode.window.showInformationMessage(
  //       `Yeah, ${n} line(s) selected... Keep going!`
  //     );
  //   })
  // );

  // // create a new status bar item that we can now manage
  // myStatusBarItem = vscode.window.createStatusBarItem(
  //   vscode.StatusBarAlignment.Right,
  //   100
  // );
  // myStatusBarItem.command = myCommandId;
  // context.subscriptions.push(myStatusBarItem);

  // // register some listener that make sure the status bar
  // // item always up-to-date
  // context.subscriptions.push(
  //   vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem)
  // );
  // context.subscriptions.push(
  //   vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem)
  // );

  // // update status bar item once at start
  // updateStatusBarItem();

  // function updateStatusBarItem(): void {
  //   const n = getNumberOfSelectedLines(vscode.window.activeTextEditor);
  //   if (n > 0) {
  //     myStatusBarItem.text = `$(megaphone) ${n} line(s) selected`;
  //     myStatusBarItem.show();
  //   } else {
  //     myStatusBarItem.hide();
  //   }
  // }

  // function getNumberOfSelectedLines(
  //   editor: vscode.TextEditor | undefined
  // ): number {
  //   let lines = 0;
  //   if (editor) {
  //     lines = editor.selections.reduce(
  //       (prev, curr) => prev + (curr.end.line - curr.start.line),
  //       0
  //     );
  //   }
  //   return lines;
  // }
}

// this method is called when your extension is deactivated
export function deactivate() {}
