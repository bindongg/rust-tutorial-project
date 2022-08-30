import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import TutorialList from "./components/TutorialList";
import {Button} from "react-bootstrap";
import { useNavigate } from "react-router";
import { decodeToken } from "react-jwt";
import { customAxios } from "../../Common/Modules/CustomAxios";


function Tutorial(props) {
  const [tutorials, setTutorials] = useState([]);
  const role = (localStorage.getItem("refresh") === null ? null : (decodeToken(localStorage.getItem("refresh")).role));
  const [rerender, setRerender] = useState(0);

  useEffect( () => {
        customAxios.get(`/tutorial`)
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
