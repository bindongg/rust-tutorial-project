import React, {Component} from "react";
import ExerciseListInfo from "./ExerciseListInfo";

function ExerciseList({exercises}){
    const list = exercises.map(
        info => (<ExerciseListInfo info={info}/>)
    )
    return (
        <tbody>
            {list}
        </tbody>
    );
}
export default ExerciseList;