import React from "react";
import {Link} from "react-router-dom";

function ExerciseListInfo ({ exercise}) {
    let solved = exercise?.solved;
    let solvedStyle = {color: 'gold'};

    if(solved == "NO_TRY" ){
        solved = "";
    }else if(solved == "FAIL"){
        solved = "실패";
        solvedStyle = {color: 'red'};
    }else if(solved == "SOLVE"){
        solved = "성공";
        solvedStyle = {color: 'forestgreen'};
    }else{
        solved = "오류";
    }
    return (
        <tr>
            <td>{exercise.id}</td>
            <td><Link to= {`/exercise/${exercise.id}`} >{exercise.name}</Link></td>
            <td>{exercise.tag}</td>
            <td>{exercise.difficulty}</td>
            <td style={solvedStyle}>{solved}</td>
        </tr>
    );
}
export default ExerciseListInfo;