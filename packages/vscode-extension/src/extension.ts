// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { HotMig } from "@hotmig/lib";
import { commands, ProgressLocation, window } from "vscode";
import path = require("path");
import { resolve } from "path";

let myStatusBarItem: vscode.StatusBarItem;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "hotmig" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("hotmig.helloWorld", () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user

    vscode.window.showInformationMessage("Hello World from hotmig!");
  });

  // decorator
  console.log("decorator sample is activated");

  let timeout: NodeJS.Timer | undefined = undefined;

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

  const imagePath = resolve(
    vscode.extensions.getExtension("hotmig.@hotmig/vscode")?.extensionPath ??
      "",
    "app_images"
  );

  const largeNumberDecorationType =
    vscode.window.createTextEditorDecorationType({
      cursor: "help",
      // use a themable color. See package.json for the declaration and default values.
      backgroundColor: { id: "myextension.largeNumberBackground" },
    });

  let activeEditor = vscode.window.activeTextEditor;

  function updateDecorations() {
    if (!activeEditor) {
      return;
    }
    if (!activeEditor.document.fileName.endsWith(".js")) {
      return;
    }

    const text = activeEditor.document.getText();
    const lines = text.split("\n");

    const createIcon = (iconPath?: string) =>
      vscode.window.createTextEditorDecorationType({
        gutterIconPath: resolve(imagePath, "gutter-icon-dark.svg"),
        gutterIconSize: "85%",
        // light: {}, dark: {}
      });

    activeEditor.setDecorations(largeNumberDecorationType, [
      {
        range: new vscode.Range(0, 0, 1, 0),
        hoverMessage: "Number ****",
      },
    ]);
    activeEditor.setDecorations(createIcon(), [new vscode.Range(0, 0, 29, 0)]);
  }

  function triggerUpdateDecorations(throttle: boolean = false) {
    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined;
    }
    if (throttle) {
      timeout = setTimeout(updateDecorations, 500);
    } else {
      updateDecorations();
    }
  }

  if (activeEditor) {
    triggerUpdateDecorations();
  }

  vscode.window.onDidChangeActiveTextEditor(
    (editor) => {
      activeEditor = editor;
      if (editor) {
        triggerUpdateDecorations();
      }
    },
    null,
    context.subscriptions
  );

  vscode.workspace.onDidChangeTextDocument(
    (event) => {
      if (activeEditor && event.document === activeEditor.document) {
        triggerUpdateDecorations(true);
      }
    },
    null,
    context.subscriptions
  );

  // progress
  context.subscriptions.push(
    commands.registerCommand("extension.startTask", () => {
      window.withProgress(
        {
          location: ProgressLocation.Notification,
          title: "I am long running!",
          cancellable: true,
        },
        (progress, token) => {
          token.onCancellationRequested(() => {
            console.log("User canceled the long running operation");
          });

          progress.report({ increment: 0 });

          setTimeout(() => {
            progress.report({
              increment: 10,
              message: "I am long running! - still going...",
            });
          }, 1000);

          setTimeout(() => {
            progress.report({
              increment: 40,
              message: "I am long running! - still going even more...",
            });
          }, 2000);

          setTimeout(() => {
            progress.report({
              increment: 50,
              message: "I am long running! - almost there...",
            });
          }, 3000);

          const p = new Promise<void>((resolve) => {
            setTimeout(() => {
              resolve();
            }, 5000);
          });

          return p;
        }
      );
    })
  );

  // status bar

  // register a command that is invoked when the status bar
  // item is selected
  const myCommandId = "sample.showSelectionCount";
  context.subscriptions.push(
    vscode.commands.registerCommand(myCommandId, () => {
      const n = getNumberOfSelectedLines(vscode.window.activeTextEditor);
      vscode.window.showInformationMessage(
        `Yeah, ${n} line(s) selected... Keep going!`
      );
    })
  );

  // create a new status bar item that we can now manage
  myStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  myStatusBarItem.command = myCommandId;
  context.subscriptions.push(myStatusBarItem);

  // register some listener that make sure the status bar
  // item always up-to-date
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem)
  );
  context.subscriptions.push(
    vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem)
  );

  // update status bar item once at start
  updateStatusBarItem();

  function updateStatusBarItem(): void {
    const n = getNumberOfSelectedLines(vscode.window.activeTextEditor);
    if (n > 0) {
      myStatusBarItem.text = `$(megaphone) ${n} line(s) selected`;
      myStatusBarItem.show();
    } else {
      myStatusBarItem.hide();
    }
  }

  function getNumberOfSelectedLines(
    editor: vscode.TextEditor | undefined
  ): number {
    let lines = 0;
    if (editor) {
      lines = editor.selections.reduce(
        (prev, curr) => prev + (curr.end.line - curr.start.line),
        0
      );
    }
    return lines;
  }
}

// this method is called when your extension is deactivated
export function deactivate() {}
