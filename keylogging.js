const { GlobalKeyboardListener } = require("node-global-key-listener");
const robot = require("robotjs");
const clipboardy = require("clipboardy");

const snippets = {
  brb: "be right back",
  tyvm: "thank you very much",
  addr: "124 Arnette Street, Lumberton, NC 28358",
};

const gkl = new GlobalKeyboardListener();
let buffer = "";

console.log("🔍 Listening for global keypresses...");

gkl.addListener((e) => {
  if (e.state === "DOWN") {
    const key = e.name.toLowerCase();

    const resetKeys = ["space", "enter", "tab"];
    if (resetKeys.includes(key)) {
      buffer = "";
      return;
    }

    if (key === "backspace") {
      buffer = buffer.slice(0, -1);
      return;
    }

    if (key.length === 1) {
      buffer += key;

      if (buffer.length > 20) buffer = buffer.slice(-20);

      for (const shortcut in snippets) {
        if (buffer.endsWith(shortcut)) {
          const expansion = snippets[shortcut];

          // Move cursor back into the word
          robot.keyTap("left"); // back 1 to get in position
          for (let i = 0; i < shortcut.length - 1; i++) {
            robot.keyTap("left");
          }

          // Select the full shortcut using Shift + Right Arrow
          for (let i = 0; i < shortcut.length; i++) {
            robot.keyTap("right", "shift");
          }

          // Delete the selection
          robot.keyTap("backspace");

          // Paste the expansion instantly
          clipboardy.writeSync(expansion);
          robot.setKeyboardDelay(0);
          robot.keyTap("v", process.platform === "darwin" ? "command" : "control");

          buffer = "";
        }
      }
    }
  }
});

