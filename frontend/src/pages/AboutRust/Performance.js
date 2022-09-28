import {Accordion, Button, Container, Form, Nav, Navbar, NavLink, Tab, Tabs} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {customAxios} from "../../Common/Modules/CustomAxios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/default-highlight";
import {dark} from "react-syntax-highlighter/src/styles/hljs";
import CodeEditor from '@uiw/react-textarea-code-editor';
import React from "react";
import { decodeToken } from "react-jwt";

function Performance(){
    const role = (localStorage.getItem("refresh") === null ? null : (decodeToken(localStorage.getItem("refresh")).role));
    const [aboutRust, setAboutRust] = useState({
        id: "",
        content: "",
        title: "",
        aboutType: "PERFORMANCE"
    });
    const [input, setInput] = useState();
    const [title, setTitle] = useState();
    const [output, setOutput] = useState();
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const buttonStyle = { marginLeft:"5px", fontSize:"14px"}
    const language = ["RUST", "JAVA", "PYTHON", "CPP"];
    useEffect( () => {
        customAxios.get(`/aboutRust/` + aboutRust.aboutType)
            .then((response) =>
            {
                if (response.data.code === 200)
                {
                    let data = response.data.data;
                    setAboutRust({...data});
                    setTitle(data.title);
                }
            })
            .catch((Error) =>
            {
                alert(Error.response.status + " error");
            })
        customAxios.get(`/aboutRust/INPUT`)
            .then((response) =>
            {
                if (response.data.code === 200)
                {
                    let data = response.data.data;
                    setInput({...data});
                }
            })
            .catch((Error) =>
            {
                alert(Error.response.status + " error");
            })
            
    }, []);
    const updatePage = () => {
        if (language.includes(aboutRust.aboutType))      
        {
            navigate(`./updateForm`, {state: {aboutRust: aboutRust, input: input}});
        }
        else
        {
            navigate(`/aboutRust/performanceTitle/updateForm`, {state: {aboutRust: aboutRust}});
        }
    }

    const changeKey = (key) => {
        setAboutRust(null)
        customAxios.get(`/aboutRust/` + key)
            .then((response) =>
            {
                if (response.data.code === 200)
                {
                    let data = response.data.data
                    setAboutRust({...data});
                    setOutput(null);
                }
            })
            .catch((Error) =>
            {
                alert(Error.response.status + " error");
            })
    }

    const compileCode = (data) => {
        setLoading(true);
        customAxios.post("/tutorial/compile", {code: aboutRust.content, stdIn: input.content, language: aboutRust.aboutType})
        .then((response)=>{
          if (response.data.code === 200)
          {
            setOutput(response.data.data);
          }
        }).finally(()=>{
            setLoading(false);
        })
    }

    const tabs = language.map((language) => {
        return (
            <Tab eventKey={language} title={language}>
                <Accordion defaultActiveKey={0}>
                    <Accordion.Item eventKey={0} key={0}>
                        <Accordion.Header>Code</Accordion.Header>
                        <Accordion.Body>
                            <CodeEditor
                                rows={5}
                                value={aboutRust?.content}      
                                language={aboutRust?.aboutType.toLowerCase()}
                                disabled
                                padding={15}
                                style={{
                                fontSize: 12,
                                backgroundColor: "#f5f5f5",
                                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                                }}
                            />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey={1} key={1}>
                        <Accordion.Header>Input</Accordion.Header>
                        <Accordion.Body>
                            <Form.Control 
                                as="textarea" 
                                rows={5} 
                                value={input?.content} 
                                disabled
                            />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
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
                <div className="nav justify-content-between">
                <div><Button onClick={compileCode} disabled={loading}>Compile</Button></div>
                <div  style={{fontSize: 20}}>time: {output ? output.time / 1000 + "sec" : "    sec"}</div>
                </div>
            </Tab>
        )
    })

    return(
        <>
            {
            (role === "ROLE_ADMIN" || role === "ROLE_MANAGER") &&
            <div className="col-8 mx-auto m-3 p-2">
                <Button variant="warning" style={buttonStyle} onClick={updatePage}>수정</Button>
            </div>
            }
            <Navbar style={{ backgroundColor: "rgb(190, 195, 200)" }}>
                <Container>
                    <Link to="/aboutRust">
                        <img
                            src="/ferris/rustacean-orig-noshadow.png"
                            width="130"
                            height="90"
                            className="d-inline-block align-top mt-3"
                            alt="Ferris"
                        />
                    </Link>
                    <h2>
                        {title}
                    </h2>
                    <div></div>
                </Container>
            </Navbar>

            <div className="col-10 mx-auto pt-5">
                <Tabs
                    defaultActiveKey="PERFORMANCE"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                    onSelect={(e) => changeKey(e)}
                >
                    <Tab eventKey={"PERFORMANCE"} title="개요">
                        {aboutRust?.content}
                    </Tab>
                    {tabs}
                </Tabs>
            </div>

        </>
    );
}
export default Performance;