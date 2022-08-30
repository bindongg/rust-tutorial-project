import React, { useEffect, useState} from "react";
import ExerciseDetailInfo from "./components/ExerciseDetailInfo";
import {useParams} from "react-router-dom";
import './Exercise.css';
import {customAxios} from "../../Common/Modules/CustomAxios";

function ExerciseDetail() {
    const {id} = useParams();
    const [exerciseDetail, setExerciseDetail] = useState({});

    useEffect( () => {
        const getExerciseDetail = async () => {
             let exerciseDetail = await customAxios.get(`/exercise/${id}`);
            exerciseDetail = exerciseDetail.data.data;
            setExerciseDetail({...exerciseDetail});
            console.log({exerciseDetail});
        }
        // 실행함으로써 데이타를 fetching합니다.
        getExerciseDetail();

    }, [id]);

    return (
        <>
            <ExerciseDetailInfo id={exerciseDetail.id}  title={exerciseDetail.name} tag= {exerciseDetail.tag} difficulty = {exerciseDetail.difficulty}
                                 Content={exerciseDetail.exerciseContent} Testcases={exerciseDetail.exerciseTestcases}
            />
        </>
    );
}

export default ExerciseDetail;
