import {Container, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {customAxios} from "../../Common/Modules/CustomAxios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/default-highlight";
import {dark} from "react-syntax-highlighter/src/styles/hljs";
import React from "react";

function RustHistory(){
    const [rustHistory, setRustHistory] = useState({
        id: "",
        number: "",
        content: "",
    });

    useEffect( () => {
        customAxios.get(`/tutorial/1/sub/1`)
            .then((response) =>
            {
                if (response.data.code === 200)
                {
                    let data = response.data.data
                    setRustHistory({...data.sub});
                    console.log(rustHistory);
                }
            })
            .catch((Error) =>
            {
                alert(Error.response.status + " error");
            })
    }, []);

    return (
        <>
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
                        Rust가 공식 배포된 시기는 2010년 입니다.
                    </h2>
                    <div></div>
                </Container>
            </Navbar>

            <div className="col-8 mx-auto border-top border-bottom m-3 p-2">
                <ReactMarkdown children={rustHistory.content}
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

export default RustHistory;