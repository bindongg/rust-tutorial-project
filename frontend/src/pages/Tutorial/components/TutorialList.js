import axios from "axios";
import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { NavLink, useNavigate } from "react-router-dom";
import { Token } from "../../../Context/Token/Token";
import TutorialSubList from "./TutorialSubList";


function TutorialList({tutorials, rerender, setRerender}) {
    const navigate = useNavigate();
    const {token,setToken} = useContext(Token);
    const headers = {
        'Content-Type' : 'application/json; charset=utf-8',
        'Authorization' : token
    };

    const updateTutorial = (tutorial) => {      
        navigate("/tutorial/updateForm", {state: {tutorial : tutorial}});
    }
    const deleteTutorial = (tutorial) => {
        axios.delete(`http://localhost:8080/tutorial/${tutorial.id}`, {headers : headers}
        ).then(function(response) {
            alert(response.data.data);
            // navigate(0);
            setRerender(rerender+1);
        })
    }
    const createSub = (tutorial) => {
        navigate("/tutorial/sub/createForm", {state: {tutorial : tutorial}});
    }
    const createQuiz = (tutorial) => {
        navigate("/tutorial/quiz/createForm", {state: {tutorial : tutorial}});
    }
    
    const buttonStyle = { marginLeft:"5px", fontSize:"14px"}

    let key = tutorials.length;    
    const list = tutorials.map(
        tutorial => {
            key--;            
            return (
            <Accordion.Item eventKey={key} key={key}>
                <Accordion.Header >{tutorial.number}. {tutorial.name}</Accordion.Header> 
                <Accordion.Body>
                    <TutorialSubList tutorialSubs={tutorial.tutorialSubs} id={tutorial.id}/>
                    {tutorial.tutorialQuiz &&                    
                    <NavLink className="nav-link" to={`/tutorial/quiz/${tutorial.id}`}>{tutorial.tutorialQuiz.name}</NavLink>
                    }
                    <br></br>
                    <div className="nav justify-content-between">
                        <div>
                            <Button style={buttonStyle} onClick={() => createSub(tutorial)}>소주제 추가</Button>
                            {!tutorial.tutorialQuiz && <Button style={buttonStyle} onClick={() => createQuiz(tutorial)}>퀴즈 추가</Button>}
                        </div>
                        <div>
                            <Button variant="warning" style={buttonStyle} onClick={() => updateTutorial(tutorial)}>수정</Button>
                            <Button variant="danger" style={buttonStyle} onClick={() => deleteTutorial(tutorial)}>삭제</Button>
                        </div>                    
                    </div>
                </Accordion.Body>
            </Accordion.Item>        
        )} 
    )
    
    
    return (<>
        {list}
        </>
    )
}

export default TutorialList;