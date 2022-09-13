import React, { useContext, useState } from "react";
import CodeEditor from '@uiw/react-textarea-code-editor';
import { Button } from "react-bootstrap";
import { customAxios } from "../../Common/Modules/CustomAxios";

function Compile() {

  const [code, setCode] = useState(
    `fn main() {\n    println!("Hello World!"); \n}`
  );
  const [input, setInput] = useState();
  const [output, setOutput] = useState();

  const compileCode = (data) => {
        customAxios.post("/tutorial/compile", {code: code, stdIn: input})
        .then((response)=>{
          if (response.data.code === 200)
          {
            setOutput(response.data.data);
          }
        })
  }

  return ( 
  <div>
    <div className="col-8 mx-auto border m-3 p-2" data-color-mode="light">
      <h4>Rust code</h4>
      <CodeEditor
        value={code}      
        language="rust"
        placeholder="Please enter Rust code."
        onChange={(evn) => setCode(evn.target.value)}
        padding={15}
        style={{
          fontSize: 12,
          backgroundColor: "#f5f5f5",
          fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
      />
    </div>
    <div className="col-8 mx-auto border m-3 p-2" data-color-mode="light">
      <h4>Input</h4>
      <CodeEditor
        value={input}      
        placeholder="Please enter Input value."
        onChange={(evn) => setInput(evn.target.value)}
        padding={15}
        style={{
          fontSize: 12,
          backgroundColor: "#f5f5f5",
          fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
      />
    </div>
    <div className="col-8 mx-auto  m-3" data-color-mode="light">
      <Button onClick={compileCode} >Compile</Button>
    </div><br/>
    <div className="col-8 mx-auto border m-3 p-2" data-color-mode="light">
      <h4>Output</h4>
      <CodeEditor
        disabled
        value={output?.stdOut}      
        padding={15}
        style={{
          fontSize: 12,
          backgroundColor: "#f5f5f5",
          fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
      />
      <div className="nav justify-content-end" style={{fontSize: 12}}>time: {output ? output.time / 1000 + "sec" : "    sec"}</div>
    </div>
  </div>
  );
}

export default Compile;