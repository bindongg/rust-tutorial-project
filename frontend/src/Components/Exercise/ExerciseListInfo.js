import React, {Component} from "react";
import {Link} from "react-router-dom";

class ExerciseListInfo extends Component{
    static defaultProps={
        info:{
            index: 0,
            title: 'exercise title'
        }
    }
    render(){
        const {index, title} = this.props.info;
        return(
            <tr>
              <td><Link to="">{index}</Link></td>
              <td><Link to="/exercise/1">{title}</Link></td>
              <td>종류</td>
              <td>난이도</td>
              <td>성공</td>
            </tr>
        )
    }
}
export default ExerciseListInfo;