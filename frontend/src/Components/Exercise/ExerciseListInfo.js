import React, {Component} from "react";
import {Link} from "react-router-dom";

function ExerciseListInfo ({info}) {
    return (
        <tr>
            <td><Link to="">{info.index}</Link></td>
            <td><Link to="/exercise/1">{info.title}</Link></td>
            <td>종류</td>
            <td>난이도</td>
            <td>성공</td>
        </tr>
    );
}
export default ExerciseListInfo;