import React, {Component, useEffect, useState} from "react";
import axios from "axios";
import ExerciseDetailInfo from "./ExerciseDetailInfo";

function ExerciseDetail() {
    const [exerciseDetails, setExerciseDetails] = useState([]);

    useEffect( () => {
        const getExerciseDetails = async () => {
            //TODO 상세페이지 API 적용하기
            let problemURL = window.location.pathname;
            let problemNum = problemURL[problemURL.length-1];
            const exerciseDetails = await axios.post(`https://c70c860f-2bc4-4f61-b0d4-ad3bd5305543.mock.pstmn.io/exercise/`+ problemNum);
            setExerciseDetails(exerciseDetails.data.data);
        }
        // 실행함으로써 데이타를 fetching합니다.
        getExerciseDetails();

    }, []);

    return (
        <>
            <ExerciseDetailInfo number={exerciseDetails.number} tag= {exerciseDetails.tag} title={exerciseDetails.name}
                                 Content={exerciseDetails.exerciseContent} Testcases={exerciseDetails.exerciseTestcases}
            />
        </>
    );
}

export default ExerciseDetail;
