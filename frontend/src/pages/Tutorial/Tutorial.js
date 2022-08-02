import axios from "axios";
import React, {useContext, useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Token } from "../../Context/Token/Token";
import TutorialList from "./components/TutorialList";
import {Button} from "react-bootstrap";
import { useNavigate } from "react-router";;


function Tutorial(props) {
  const [tutorials, setTutorials] = useState([]);
  const {token,setToken} = useContext(Token);
  const headers = {
    'Content-Type' : 'application/json; charset=utf-8',
    'Authorization' : token
  };
  const [rerender, setRerender] = useState(0);

  useEffect( () => {
    const getTutorials = async () => {
        const tutorials = await axios.get("http://localhost:8080/tutorial", {headers : headers});        
        setTutorials(tutorials.data.data);                
    }    
    getTutorials();    
    }, [rerender]);

    const navigate = useNavigate();
    const createTutorial = () => {                
        navigate("/tutorial/createForm");
    }

    return (
        <>        
            <div className="col-8 mx-auto pt-5">                
            <div style={{paddingBottom: "10px"}}><Button onClick={createTutorial}>대주제 추가</Button></div>
                <Accordion defaultActiveKey={0} alwaysOpen>
                    <TutorialList tutorials={tutorials} setRerender={setRerender} rerender={rerender}/>
                </Accordion>
            </div>
        </>
    );
}

export default Tutorial;
