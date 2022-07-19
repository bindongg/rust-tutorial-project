import React from "react";
import {Link} from "react-router-dom";

function ExerciseListInfo ({ exercise}) {
    return (
        <tr>
            <td>{exercise.number}</td>
            <td><Link to= {`/exercise/${exercise.number}`} >{exercise.name}</Link></td>
            <td>{exercise.tag}</td>
            <td>{exercise.difficulty}</td>
            <td>{exercise.solved}</td>
        </tr>
    );
}
export default ExerciseListInfo;