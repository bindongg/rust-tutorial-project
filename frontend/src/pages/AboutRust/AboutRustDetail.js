import {Button, Container, Navbar} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {customAxios} from "../../Common/Modules/CustomAxios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/default-highlight";
import {dark} from "react-syntax-highlighter/src/styles/hljs";
import React from "react";
import { decodeToken } from "react-jwt";

function AboutRustDetail(){
    const {aboutType} = useParams();
    const role = (localStorage.getItem("refresh") === null ? null : (decodeToken(localStorage.getItem("refresh")).role));
    const [aboutRust, setAboutRust] = useState({
        id: "",
        content: "",
        title: "",
        aboutType: aboutType.toUpperCase()
    });
    const navigate = useNavigate();
    const buttonStyle = { marginLeft:"5px", fontSize:"14px"}
    useEffect( () => {
        customAxios.get(`/aboutRust/` + aboutRust.aboutType)
            .then((response) =>
            {
                if (response.data.code === 200)
                {
                    let data = response.data.data
                    setAboutRust({...data});
                    // console.log(aboutRust);
                }
            })
            .catch((Error) =>
            {
                alert(Error.response.status + " error");
            })

    }, []);
    const updatePage = () => {      
        navigate(`./updateForm`, {state: {aboutRust : aboutRust}});
    }

    return (
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
                        {aboutRust.title}
                    </h2>
                    <div></div>
                </Container>
            </Navbar>

            <div className="col-8 mx-auto border-top border-bottom m-3 p-2">
                <ReactMarkdown children={aboutRust.content}
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
            </div>
        </>
    );
}

export default AboutRustDetail;