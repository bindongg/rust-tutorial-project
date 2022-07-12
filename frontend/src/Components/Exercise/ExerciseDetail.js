import React, {Component, useEffect, useState} from "react";
import {Button, ButtonToolbar} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import ExerciseDetailInfo from "./ExerciseDetailInfo";

function ExerciseDetail() {
    const [exerciseDetails, setExerciseDetails] = useState([]);

    useEffect( () => {
        const getExerciseDetails = async () => {
            const exerciseDetails = await axios.post("https://c70c860f-2bc4-4f61-b0d4-ad3bd5305543.mock.pstmn.io/exercise/1");
            setExerciseDetails(exerciseDetails.data.details);
        }
        // 실행함으로써 데이타를 fetching합니다.
        getExerciseDetails();

    }, []);

    return (
        <>
            <ExerciseDetailInfo index={exerciseDetails.index} title={exerciseDetails.title} content={exerciseDetails.content}/>
        </>
    );
}

export default ExerciseDetail;
