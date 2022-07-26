import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function TutorialSub(props) {
    const {id} = useLocation().state; 
    const [tutorialSub, setTutorialSub] = useState({
        id: "",
        number: "",
        content: "",
    });       
    const headers = {
        'Content-Type' : 'application/json',
        'Authorization' : localStorage.getItem("jwt")
      }
    
      useEffect( () => {
        const getTutorialSub = async () => {
            const tutorialSub = await axios.get("http://localhost:8080/tutorial/sub/" + id, {headers : headers});        
            setTutorialSub({...tutorialSub.data.data});
        }    
        getTutorialSub();    
        }, []);

    return (
        <>
            <div className="col-8 mx-auto m-3 p-2">
                <br/>
                <h1>{tutorialSub.name}</h1>
            </div>
            <div className="col-8 mx-auto border-top border-bottom m-3 p-2">
                {tutorialSub.content}
            </div>
            {/* <div className="col-8 mx-auto">
                <NavLink href="#" className="sm">*추천 문제*</NavLink>
            </div> */}
            <br/>
            <div className="col-8 mx-auto">
                <div className=" nav justify-content-between">
                    <Button>Prev</Button>
                    <Button>Next</Button>
                </div>
            </div>
        </>
    );
}

export default TutorialSub;
