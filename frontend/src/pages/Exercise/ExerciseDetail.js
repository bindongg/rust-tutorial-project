import React, {Component, useEffect, useState} from "react";
import axios from "axios";
import ExerciseDetailInfo from "./components/ExerciseDetailInfo";

function ExerciseDetail() {
    const [exerciseDetails, setExerciseDetails] = useState([]);

    useEffect( () => {
        const getExerciseDetails = async () => {
            //TODO 상세페이지 API 적용하기
            let problemURL = window.location.pathname;
            let problemNum = problemURL[problemURL.length-1];
            const exerciseDetails = await axios.get(`https://ec33a7bf-9e16-4092-8ca5-aeeaf2a1072c.mock.pstmn.io/exercise/`+ problemNum);
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
