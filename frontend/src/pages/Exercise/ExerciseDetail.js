import React, {Component, useContext, useEffect, useState} from "react";
import axios from "axios";
import ExerciseDetailInfo from "./components/ExerciseDetailInfo";
import {useParams} from "react-router-dom";
import {Token} from "../../Context/Token/Token";

function ExerciseDetail() {
    const {id} = useParams();
    const [exerciseDetail, setExerciseDetail] = useState({});
    const {token, setToken} = useContext(Token);
    const headers = {
        'Content-Type' : 'application/json',
        'Authorization' : token
    }

    useEffect( () => {
        const getExerciseDetail = async () => {
             let exerciseDetail = await axios.get(`http://localhost:8080/exercise/${id}`, {headers : headers});
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
