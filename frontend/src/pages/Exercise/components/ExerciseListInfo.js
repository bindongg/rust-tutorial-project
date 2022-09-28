import React from "react";
import {Link} from "react-router-dom";
import {EXERCISE_STATE, SCORE} from "../../../Common/Modules/Common";

function ExerciseListInfo ({ exercise}) {
    let solved = exercise?.solved;
    let score = solved !== EXERCISE_STATE[2] ? (exercise.tryTime < exercise.time ? '/'+SCORE[0] : (exercise.tryTime === exercise.time ? '/'+SCORE[1] : '/'+SCORE[2])) : "";
    let solvedStyle = {color: 'green'};

    if(solved === EXERCISE_STATE[2] ){
        solved = "";
    }else if(solved === EXERCISE_STATE[1]){
        solved = "실패";
        solvedStyle = {color: 'red'};
    }else if(solved === EXERCISE_STATE[0]){
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
            <td><Link to= {`/exercise/${exercise.id}`} style={{color: "black", textDecorationLine: "none"}}>{exercise.name}</Link></td>
            <td>{exercise.tag}</td>
            <td>{difficulty}</td>
            <td style={solvedStyle}>{solved}{score}</td>
        </tr>
    );
}
export default ExerciseListInfo;