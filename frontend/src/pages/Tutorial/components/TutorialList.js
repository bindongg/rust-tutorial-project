import { useState } from "react";
import { Button } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { decodeToken } from "react-jwt";
import { NavLink, useNavigate } from "react-router-dom";
import { customAxios } from "../../../Common/Modules/CustomAxios";
import TutorialSubList from "./TutorialSubList";


function TutorialList({tutorials, rerender, setRerender}) {
    const navigate = useNavigate();
    const role = (localStorage.getItem("refresh") === null ? null : (decodeToken(localStorage.getItem("refresh")).role));
    const [loading,setLoading] = useState(false);

    const updateTutorial = (tutorial) => {      
        navigate("/tutorial/updateForm", {state: {tutorial : tutorial}});
    }
    const deleteTutorial = (tutorial) => {
        if(window.confirm("삭제하시겠어요?")) {
            setLoading(true);
            customAxios.delete(`/tutorial/${tutorial.id}`)
            .then((response) =>
            {
                if (response.data.code === 200)
                {
                    alert(response.data.data);
                    setRerender(rerender+1);
                }
            })
            .catch((Error) =>
            {
                alert(Error.response.status + " error");
            })
        }
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
                            {
                            (role === "ROLE_ADMIN" || role === "ROLE_MANAGER") &&
                            <Button style={buttonStyle} onClick={() => createSub(tutorial)}>소주제 추가</Button>
                            }
                            {(!tutorial.tutorialQuiz && (role === "ROLE_ADMIN" || role === "ROLE_MANAGER")) && 
                            <Button style={buttonStyle} onClick={() => createQuiz(tutorial)}>퀴즈 추가</Button>
                            }
                        </div>
                        {
                        (role === "ROLE_ADMIN" || role === "ROLE_MANAGER") &&
                        <div>
                            <Button variant="warning" style={buttonStyle} onClick={() => updateTutorial(tutorial)}>수정</Button>
                            <Button variant="danger" style={buttonStyle} disabled={loading} onClick={() => deleteTutorial(tutorial)}>삭제</Button>
                        </div>                    
                        }
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