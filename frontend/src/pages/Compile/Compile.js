import React, { useContext, useState } from "react";
import CodeEditor from '@uiw/react-textarea-code-editor';
import { Button, Form } from "react-bootstrap";
import { customAxios } from "../../Common/Modules/CustomAxios";

function Compile() {

  const [code, setCode] = useState(
    `fn main() {\n    println!("Hello World!"); \n}`
  );
  const [input, setInput] = useState();
  const [output, setOutput] = useState();
  const [lang, setLang] = useState("RUST");
  const [loading,setLoading] = useState(false);
  const initCode = {
    RUST: `fn main() {\n\tprintln!("Hello World!"); \n}`,
    PYTHON: 'print("Hello World!")',
    CPP: '#include <iostream> \nusing namespace std; \n\nint main() { \n\tcout << "Hello World!" << endl; \n\treturn 0; \n}',
    JAVA: `public class Code \n{ \n\tpublic static void main(String[] args) { \n\t\tSystem.out.println("Hello World!"); \n\t} \n}`
  }

  const compileCode = (data) => {
        setLoading(true);
        customAxios.post("/tutorial/compile", {code: code, stdIn: input, language: lang})
        .then((response)=>{
          if (response.data.code === 200)
          {
            setOutput(response.data.data);
          }
        })
        setLoading(false);
  }

  const changeLang = (lang) => {
    setLang(lang);
    if (lang === "RUST") { setCode(initCode.RUST); }
    else if (lang === "PYTHON") { setCode(initCode.PYTHON); }
    else if (lang === "CPP") { setCode(initCode.CPP); }
    else if (lang === "JAVA") { setCode(initCode.JAVA); }
    setOutput(null);
  }
  

  return ( 
  <div>
    <div className="col-8 mx-auto border m-3 p-2" data-color-mode="light">
    <div className="nav justify-content-between">
      <div><h4>Code</h4></div>
      <div>
        <Form.Select style={{height: 30, width: 90}} size="sm" onChange={(e) => changeLang(e.target.value)}>
          <option value="RUST">rust</option>
          <option value="PYTHON">python</option>
          <option value="CPP">c++</option>
          <option value="JAVA">java</option>
        </Form.Select>
      </div>
    </div>
      <CodeEditor
        value={code}      
        language={lang.toLowerCase()}
        placeholder="Please enter code."
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
      <Button onClick={compileCode} disabled={loading}>Compile</Button>
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