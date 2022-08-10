import axios from "axios";
import React, {useContext, useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Token } from "../../Context/Token/Token";
import TutorialList from "./components/TutorialList";
import {Button} from "react-bootstrap";
import { useNavigate } from "react-router";import { decodeToken } from "react-jwt";
import { IP } from "../../Context/IP";
;


function Tutorial(props) {
  const [tutorials, setTutorials] = useState([]);
  const {token,setToken} = useContext(Token);
  const ip = useContext(IP);
  const role = (token === null ? null : (decodeToken(token).role));
  const headers = {
    'Content-Type' : 'application/json; charset=utf-8',
    'Authorization' : token
  };
  const [rerender, setRerender] = useState(0);

  useEffect( () => {
    axios.get(`http://${ip}:8080/tutorial`, {headers : headers})
        .then((response) => 
        {
            if (response.data.code === 200)
            {
                setTutorials(response.data.data);
            }
        })
        .catch((Error) => 
        {
            alert(Error.response.status + " error");
        });
    }, [rerender]);

    const navigate = useNavigate();
    const createTutorial = () => {                
        navigate("/tutorial/createForm");
    }

    return (
        <>        
            <div className="col-8 mx-auto pt-5">
            {
            (role === "ROLE_ADMIN" || role === "ROLE_MANAGER") &&
            <div style={{paddingBottom: "10px"}}><Button onClick={createTutorial}>대주제 추가</Button></div>
            }                
                <Accordion defaultActiveKey={0} alwaysOpen>
                    <TutorialList tutorials={tutorials} setRerender={setRerender} rerender={rerender}/>
                </Accordion>
            </div>
        </>
    );
}

export default Tutorial;
