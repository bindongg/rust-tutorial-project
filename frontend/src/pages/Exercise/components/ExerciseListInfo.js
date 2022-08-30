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

    let difficulty = exercise?.difficulty;
    switch (difficulty){
        case 'STAR1':
            difficulty = '⭐';
            break;
        case 'STAR2':
            difficulty = '⭐⭐';
            break;
        case 'STAR3':
            difficulty = '⭐⭐⭐';
            break;
        case 'STAR4':
            difficulty = '⭐⭐⭐⭐';
            break;
        case 'STAR5':
            difficulty = '⭐⭐⭐⭐⭐';
            break;
        default:
            difficulty = 'etc';
    }

    return (
        <tr>
            <td>{exercise.id}</td>
            <td><Link to= {`/exercise/${exercise.id}`} >{exercise.name}</Link></td>
            <td>{exercise.tag}</td>
            <td>{difficulty}</td>
            <td style={solvedStyle}>{solved}</td>
        </tr>
    );
}
export default ExerciseListInfo;