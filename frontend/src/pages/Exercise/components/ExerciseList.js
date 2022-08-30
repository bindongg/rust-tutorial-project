import React from "react";
import ExerciseListInfo from "./ExerciseListInfo";

function ExerciseList({exercises}){
    const list = exercises.map(
        exercise => (<ExerciseListInfo key = {exercise.id} exercise={exercise}/>)
    )
    return (
        <tbody>
            {list}
        </tbody>
    );
}
export default ExerciseList;