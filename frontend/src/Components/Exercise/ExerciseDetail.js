import React, {Component, useEffect, useState} from "react";
import {Button, ButtonToolbar} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import ExerciseDetailInfo from "./ExerciseDetailInfo";

function ExerciseDetail() {
    const [exerciseDetails, setExerciseDetails] = useState([]);

    useEffect( () => {
        const getExerciseDetails = async () => {
            //TODO 상세페이지 API 적용하기
            const exerciseDetails = await axios.post(`https://c70c860f-2bc4-4f61-b0d4-ad3bd5305543.mock.pstmn.io/exercise/1`);
            // console.log(exerciseDetails.data.data);
            setExerciseDetails(exerciseDetails.data.data);
        }
        // 실행함으로써 데이타를 fetching합니다.
        getExerciseDetails();

    }, []);

    return (
        <>
            <ExerciseDetailInfo number={exerciseDetails.number} title={exerciseDetails.name}
                                 exerciseContent={exerciseDetails.exerciseContent}
            />
        </>
    );
}

export default ExerciseDetail;
