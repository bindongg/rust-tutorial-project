import React, {Component} from "react";
import ExerciseInfo from "./ExerciseInfo";

class ExerciseList extends Component{
    render() {
        const {data} = this.props;
        const list = data.map(
            info => (<ExerciseInfo key = {info.id} info={info}/>)
        )
        return (
            <tbody>
                {list}
            </tbody>
        );
    }
}
export default ExerciseList;