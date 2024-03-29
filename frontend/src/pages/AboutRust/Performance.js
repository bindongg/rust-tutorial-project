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
import { HorizontalGridLines, LabelSeries, VerticalBarSeries, VerticalGridLines, XAxis, XYPlot, YAxis } from "react-vis";

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
            if (aboutRust.aboutType === "RUST") 
            {
                setOutput({...output, rust: response.data.data});
            }
            else if (aboutRust.aboutType === "JAVA") 
            {
                setOutput({...output, java: response.data.data});
            }
            else if (aboutRust.aboutType === "PYTHON") 
            {
                setOutput({...output, python: response.data.data});
            }
            else 
            {
                setOutput({...output, cpp: response.data.data});
            }
          }
        }).catch((Error) => 
        {
            const status = Error.response.status
            if (status === 403)
            {
                alert("권한이 없습니다.")
                navigate("/login")
            }
            else
            {
                alert(status + " error");
            }
        }).finally(()=>{
            setLoading(false);
        })
    }

    const blueData = [
        {x: 'Rust', y: output ? output.rust?.time : 0, color: 1}, 
        {x: 'Java', y: output ? output.java?.time : 0, color: 2}, 
        {x: 'Python', y: output ? output.python?.time : 0, color: 3}, 
        {x: 'C++', y: output ? output.cpp?.time : 0, color: 4}];

    const tabs = language.map((language) => {
        var temp = null;
        if (language === "RUST")
        {
            temp = output?.rust;
        }
        else if (language === "JAVA")
        {
            temp = output?.java;
        }
        else if (language === "PYTHON")
        {
            temp = output?.python;
        }
        else 
        {
            temp = output?.cpp;
        }
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
                <div>
                    <h4>Output</h4>
                    <CodeEditor
                        disabled
                        value={temp?.stdOut}      
                        padding={15}
                        style={{
                        fontSize: 12,
                        backgroundColor: "#f5f5f5",
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                        }}
                    />   
                    <div className="nav justify-content-between">
                        <div><Button onClick={compileCode} disabled={loading}>Compile</Button></div>
                        <div  style={{fontSize: 20}}>time: {temp ? temp.time / 1000 + "sec" : "    sec"}</div>
                    </div>
                </div>
                <br/>
                <div>
                    <XYPlot xType="ordinal" width={300} height={300} xDistance={100}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <VerticalBarSeries data={blueData} colorRange={['#EF5D28', '#223388']}/>
                    </XYPlot>
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

            <div className="col-8 mx-auto border-top border-bottom m-3 p-2">
                <Tabs
                    defaultActiveKey="PERFORMANCE"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                    onSelect={(e) => changeKey(e)}
                >
                    <Tab eventKey={"PERFORMANCE"} title="개요">
                        <ReactMarkdown children={aboutRust?.content}
                            remarkPlugins={[remarkGfm]}
                            components={{
                                code({node, inline, className, children, ...props}) {
                                    const match = /language-(\w+)/.exec(className || '')
                                    return !inline && match ? (
                                        <SyntaxHighlighter
                                            children={String(children).replace(/\n$/, '')}
                                            style={dark}
                                            language={match[1]}
                                            PreTag="div"
                                            {...props}
                                        />
                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    )
                                }
                            }}/>
                    </Tab>
                    {tabs}
                </Tabs>
            </div>

        </>
    );
}
export default Performance;