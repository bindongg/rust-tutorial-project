import React from "react";
import {Link} from "react-router-dom";

function ExerciseListInfo ({ exercise}) {
    return (
        <tr>
            <td>{exercise.id}</td>
            <td><Link to= {`/exercise/${exercise.id}`} >{exercise.name}</Link></td>
            <td>{exercise.tag}</td>
            <td>{exercise.difficulty}</td>
            <td>{exercise.solved}</td>
        </tr>
    );
}
export default ExerciseListInfo;