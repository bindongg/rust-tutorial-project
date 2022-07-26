import axios from "axios";
import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import TutorialList from "./components/TutorialList";

function Tutorial() {
  const [tutorials, setTutorials] = useState([]);

  const headers = {
    'Content-Type' : 'application/json',
    'Authorization' : localStorage.getItem("jwt")
  };

  useEffect( () => {
    const getTutorials = async () => {
        const tutorials = await axios.get("http://localhost:8080/tutorial/hdm", {headers : headers});        
        setTutorials(tutorials.data.data);                
    }    
    getTutorials();    
    }, []);

    return (
        <>
            <div className="col-8 mx-auto pt-5">
                <Accordion defaultActiveKey={0} alwaysOpen>
                    <TutorialList tutorials={tutorials}/>
                </Accordion>
            </div>
        </>
    );
}

export default Tutorial;
