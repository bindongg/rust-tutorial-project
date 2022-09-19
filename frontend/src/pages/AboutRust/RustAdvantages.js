import {Container, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {customAxios} from "../../Common/Modules/CustomAxios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/default-highlight";
import {dark} from "react-syntax-highlighter/src/styles/hljs";
import React from "react";

function RustAdvantages(){
    const [rustAdvantage, setRustAdvantage] = useState({
        id: "",
        number: "",
        content: "",
    });
    const [rustFeature, setRustFeature] = useState({
        id: "",
        number: "",
        content: "",
    });

    useEffect( () => {
        customAxios.get(`/tutorial/1/sub/2`)
            .then((response) =>
            {
                if (response.data.code === 200)
                {
                    let data = response.data.data
                    setRustAdvantage({...data.sub});
                    console.log(rustAdvantage);
                }
            })
            .catch((Error) =>
            {
                // alert(Error.response.status + " error");
            })

        customAxios.get(`/tutorial/1/sub/3`)
            .then((response) =>
            {
                if (response.data.code === 200)
                {
                    let data = response.data.data
                    setRustFeature({...data.sub});
                    console.log(rustFeature);
                }
            })
            .catch((Error) =>
            {
                // alert(Error.response.status + " error");
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
                        Rust의 장점은 fast와 safe, 특징은
                    </h2>
                    <div></div>
                </Container>
            </Navbar>

            <div className="col-8 mx-auto border-top border-bottom m-3 p-2">
                <ReactMarkdown children={rustAdvantage.content}
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

                <ReactMarkdown children={rustFeature.content}
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

export default RustAdvantages;