
import React, { useState } from "react";
import styles from "./styles"
import "./App.css";
const snippets = {
  brb: "be right back",
  tyvm: "thank you very much",
  addr: "124 Arnette Street, Lumberton, NC 28358",
};

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const expand = () => {
    const clean = input.trim().toLowerCase();
    setResult(snippets[clean] || "No expansion found.");
  };

  const checkkey = (newvalue) => {
    console.log(newvalue)
    if (newvalue in snippets) {
      setResult(snippets[newvalue] || "No expansion found.");
    }
  }


  const { GlobalKeyboardListener } = require("node-global-key-listener");

const gkl = new GlobalKeyboardListener();

gkl.addListener((e) => {
  if (e.state === "DOWN") {
    console.log(`You pressed: ${e.name}`);
  }
});

  return (
    <div className="app">
      <h1 style={styles.nicetext}>Expandly</h1>
      <p>Smart snippets that expand what you type.</p>

      <div className="snippet-box">
        <p><strong>Trigger:</strong> brb → be right back</p>
        <p><strong>Trigger:</strong> tyvm → thank you very much</p>
        <p><strong>Trigger:</strong> addr → 124 Arnette Street, Lumberton, NC</p>
      </div>

      <div className="input-box">
        <label>Type a shortcut:</label><br />
        <input
          type="text"
          value={input}
          onChange={(e) => { const pamsvalue = e.target.value; setInput(pamsvalue); checkkey(pamsvalue) }}
          placeholder="e.g. brb"
        />
        <button style={styles.scott} onClick={checkkey}>Expand</button>
        <p><strong>{result}</strong></p>
      </div>
    </div>
  );
}

export default App;
