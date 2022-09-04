import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {customAxios} from "../../Common/Modules/CustomAxios";
import TutorialDoneContainer from "./components/TutorialDoneContainer";
import ExerciseTryContainer from "./components/ExerciseTryContainer";
import React from "react";

function UserInfoPage()
{
    const {id} = useParams();
    const navigate = useNavigate();
    const [tutorialDone,setTutorialDone] = useState(null);
    const [exerciseTry,setExerciseTry] = useState(null);
    const [exerciseTotal,setExerciseTotal] = useState(0);
    useEffect(()=>{
        customAxios.get(`/admin/user/${id}`)
            .then((response)=>{
                if(response.data.code === 200)
                {
                    //console.log(response.data.data.exerciseTry)
                    setExerciseTry([...response.data.data.exerciseTry]);
                    setTutorialDone([...response.data.data.tutorialDone]);
                    setExerciseTotal(response.data.data.exerciseTry.length);
                }
                else
                {

                }
            })
    },[])
    return(
        <>
            <TutorialDoneContainer tutorialDone={tutorialDone}/>
            <ExerciseTryContainer exerciseTry={exerciseTry} total={exerciseTotal}/>
        </>
    );
}

export default UserInfoPage;