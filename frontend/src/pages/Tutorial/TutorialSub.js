import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { decodeToken } from "react-jwt";
import { useNavigate, useParams } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { dark } from "react-syntax-highlighter/src/styles/hljs";
import remarkGfm from "remark-gfm";
import { Token } from "../../Context/Token/Token";
import ReactMarkdown from "react-markdown";
import { customAxios } from "../../Common/Modules/CustomAxios";

function TutorialSub(props) {
    const {id, subId} = useParams();
    //const {token,setToken} = useContext(Token);
    const role = (localStorage.getItem("refresh") === null ? null : (decodeToken(localStorage.getItem("refresh")).role));
    const [tutorialSub, setTutorialSub] = useState({
        id: "",
        number: "",
        content: "",
    });
    const [loading,setLoading] = useState(false);
    const [preSub, setPreSub] = useState(null);           
    const [nextSub, setNextSub] = useState(null);           
    const navigate = useNavigate();
    const buttonStyle = { marginLeft:"5px", fontSize:"14px"}

    useEffect( () => {
        customAxios.get(`/tutorial/${id}/sub/${subId}`)
        .then((response) =>
        {
            if (response.data.code === 200)
            {
                let data = response.data.data
                setTutorialSub({...data.sub});
                setNextSub(data.nextSub && {...data.nextSub});
                setPreSub(data.preSub && {...data.preSub});
            }
        })
        .catch((Error) =>
        {
            alert(Error.response.status + " error");
        })
    }, [subId]);    
    
    const updateSub = () => {      
        navigate("/tutorial/sub/updateForm", {state: {tutorialSub : tutorialSub}});
    }
    const deleteSub = () => {
        setLoading(true);
        customAxios.delete(`/tutorial/sub/${tutorialSub.id}`)
        .then((response) => 
        {
            if (response.data.code === 200)
            {
                alert(response.data.data);
            }
            navigate(-1);
        })
        .catch((Error)=>
        {
            alert(Error.response.status + " error");
        })
    }
    const goPre = () => {
        navigate(`/tutorial/${id}/sub/${preSub.id}`);
    }
    const goNext = () => {
        navigate(`/tutorial/${id}/sub/${nextSub.id}`);
    }
    
    return (
        <>
            <div className="col-8 mx-auto m-3 p-2">
                <br/>
                <h1>{tutorialSub.name}</h1>
            {
            (role === "ROLE_ADMIN" || role === "ROLE_MANAGER") &&
            <div>
                <Button variant="warning" style={buttonStyle} onClick={updateSub}>수정</Button>
                <Button variant="danger" style={buttonStyle} disabled={loading} onClick={deleteSub}>삭제</Button>
            </div>
            }
            </div>
            <div className="col-8 mx-auto border-top border-bottom m-3 p-2">
                <ReactMarkdown children={tutorialSub.content}
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
            <br/>
            <div className="col-8 mx-auto">
                <div className=" nav justify-content-between">
                    {preSub ? <Button style={buttonStyle} onClick={goPre}>Prev</Button> : <Button variant="secondary" style={buttonStyle} disabled>Prev</Button>}
                    {nextSub ? <Button style={buttonStyle} onClick={goNext}>Next</Button> : <Button variant="secondary" style={buttonStyle} disabled>Next</Button>}
                </div>
            </div>
        </>
    );
}

export default TutorialSub;
