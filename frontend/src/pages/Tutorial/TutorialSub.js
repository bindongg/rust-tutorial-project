import axios from "axios";
import { convertToRaw } from "draft-js";
import { draftjsToMarkdown } from "draftjs-to-markdown";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { decodeToken } from "react-jwt";
import { useNavigate, useParams } from "react-router-dom";
import { Token } from "../../Context/Token/Token";

function TutorialSub(props) {
    const {id, subId} = useParams();
    const {token,setToken} = useContext(Token); 
    const role = (token === null ? null : (decodeToken(token).role));
    const [tutorialSub, setTutorialSub] = useState({
        id: "",
        number: "",
        content: "",
    });
    const [preSub, setPreSub] = useState(null);           
    const [nextSub, setNextSub] = useState(null);           
    const headers = {
        'Content-Type' : 'application/json',
        'Authorization' : token
    }
    const navigate = useNavigate();
    const buttonStyle = { marginLeft:"5px", fontSize:"14px"}

    useEffect( () => {
        axios.get(`http://localhost:8080/tutorial/${id}/sub/${subId}`, {headers : headers})
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
        axios.delete(`http://localhost:8080/tutorial/sub/${tutorialSub.id}`, {headers : headers})
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
                <Button variant="danger" style={buttonStyle} onClick={deleteSub}>삭제</Button>
            </div>
            }
            </div>
            <div className="col-8 mx-auto border-top border-bottom m-3 p-2" 
            dangerouslySetInnerHTML={{__html: tutorialSub.content}}>                 
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
