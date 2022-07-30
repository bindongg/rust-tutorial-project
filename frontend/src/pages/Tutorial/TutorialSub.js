import axios from "axios";
import { convertToRaw } from "draft-js";
import { draftjsToMarkdown } from "draftjs-to-markdown";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Token } from "../../Context/Token/Token";

function TutorialSub(props) {
    const {id, subId} = useParams();
    const {token,setToken} = useContext(Token); 
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
    const getTutorialSub = async (nextSub, preSub) => {
        let tutorialSub = await axios.get(`http://localhost:8080/tutorial/${id}/sub/${subId}`, {headers : headers});        
        tutorialSub = tutorialSub.data.data
        setTutorialSub({...tutorialSub.sub});
        setNextSub(tutorialSub.nextSub && {...tutorialSub.nextSub});
        setPreSub(tutorialSub.preSub && {...tutorialSub.preSub});
        }    
        getTutorialSub(nextSub, preSub);    
    }, [subId]);    
    
    const updateSub = () => {      
        navigate("/tutorial/sub/updateForm", {state: {tutorialSub : tutorialSub}});
    }
    const deleteSub = () => {
        axios.delete(`http://localhost:8080/tutorial/sub/${tutorialSub.id}`, {headers : headers}
        ).then(function(response) {
            alert(response.data.data);
            navigate(-1);
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
                <div>
                    <Button variant="warning" style={buttonStyle} onClick={updateSub}>수정</Button>
                    <Button variant="danger" style={buttonStyle} onClick={deleteSub}>삭제</Button>
                </div>
            </div>
            
            <div className="col-8 mx-auto border-top border-bottom m-3 p-2" 
            dangerouslySetInnerHTML={{__html: tutorialSub.content}}>                 
            </div>
            {/* <div className="col-8 mx-auto">
                <NavLink href="#" className="sm">*추천 문제*</NavLink>
            </div> */}
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
