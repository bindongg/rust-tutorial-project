import React, {Component} from "react";
import {Link} from "react-router-dom";

class ExerciseInfo extends Component{
    static defaultProps={
        info:{
            id: 0,
            title: 'exercise title'
        }
    }
    render(){
        const {id, title} = this.props.info;
        return(
            <tr>
              <td><Link to="">{id}</Link></td>
              <td><Link to="/exercise/1">{title}</Link></td>
              <td>종류</td>
              <td>난이도</td>
              <td>성공</td>
            </tr>
        )
    }
}
export default ExerciseInfo;