import React, { useEffect, useState} from "react";
import ExerciseDetailInfo from "./components/ExerciseDetailInfo";
import {useParams} from "react-router-dom";
import './Exercise.css';
import {customAxios} from "../../Common/Modules/CustomAxios";

function ExerciseDetail() {
    const {id} = useParams();
    const [exerciseDetail, setExerciseDetail] = useState({});
    const [code, setCode] = useState();    

    useEffect( () => {
        // const getExerciseDetail = async () => {
        //      let exerciseDetail = await customAxios.get(`/exercise/${id}`);
        //     exerciseDetail = exerciseDetail.data.data;
        //     setExerciseDetail({...exerciseDetail});
        //     console.log({exerciseDetail});
        // }
        // // 실행함으로써 데이타를 fetching합니다.
        // getExerciseDetail();
        customAxios.get(`/exercise/${id}`).then((response) =>
        {
            setExerciseDetail({...response.data.data});
            setCode(response.data.data.exerciseContent.code)
        })
    }, [id]);

    return (
        <>
            <ExerciseDetailInfo exerciseDetail={exerciseDetail} code={code} setCode={setCode}/>
        </>
    );
}

export default ExerciseDetail;
