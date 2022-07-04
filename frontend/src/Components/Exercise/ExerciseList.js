import React, {Component} from "react";
import ExerciseListInfo from "./ExerciseListInfo";

class ExerciseList extends Component{
    render() {
        const {data} = this.props;
        const list = data.map(
            info => (<ExerciseListInfo key = {info.index} info={info}/>)
        )
        return (
            <tbody>
                {list}
            </tbody>
        );
    }
}
export default ExerciseList;