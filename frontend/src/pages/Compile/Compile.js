import React, { useContext, useState } from "react";
import CodeEditor from '@uiw/react-textarea-code-editor';
import { Button } from "react-bootstrap";
import axios from "axios";
import { customAxios } from "../../Common/Modules/CustomAxios";
import { Token } from "../../Context/Token/Token";
import { IP } from "../../Context/IP";

function Compile() {
  //const {token,setToken} = useContext(Token);
  const ip = useContext(IP);
  const [code, setCode] = useState(
    `fn main() {\n    println!("Hello World!"); \n}`
  );
  const [input, setInput] = useState();
  const [output, setOutput] = useState();

  const compileCode = (data) => {
    /*axios.post(`http://${ip}:8080/tutorial/compile`,
        {code : code, stdIn : input},
        {headers : headers})
        .then(response => { 
          setOutput(response.data.data);
        })*/
        customAxios.post("/tutorial/compile",{code: code, stdIn: input})
        .then((response)=>{
            setOutput(response.data.data);
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
        value={output}      
        padding={15}
        style={{
          fontSize: 12,
          backgroundColor: "#f5f5f5",
          fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
      />
    </div>
  </div>
  );
}

export default Compile;