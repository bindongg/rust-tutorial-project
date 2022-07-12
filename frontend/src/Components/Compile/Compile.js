import React from "react";
//import "./style.css";
//import "./js/ide";
//import "./js/lib/ace";
//import "./js/lib/theme-monokai";

function Compile() {
  return (
    <>
      <div className="header">Rust Online Compiler</div>
      <div className="editor" id="editor"></div>
      <br/>
      <div className="stdIn" id="stdIn"></div>
      <div className="button-container">
          <button class="btn">Run</button>
      </div>
      <br/>
      <div className="output"></div>
    </>
  );
}

export default Compile;