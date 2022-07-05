import React, {Component} from "react";
import {Button, ButtonToolbar} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import ExerciseDetailInfo from "./ExerciseDetailInfo";

class ExerciseDetail extends Component{
    state ={
        exerciseDetails:[]
    };
    getExerciseDetails = async () => {
        const exerciseDetails = await axios.post("https://c70c860f-2bc4-4f61-b0d4-ad3bd5305543.mock.pstmn.io/exercise/1");
        this.setState({exerciseDetails: exerciseDetails.data.details});
        // console.log(this.state.exerciseDetails);
    }
    componentDidMount() {
        this.getExerciseDetails();
    }

    render() {
        return (
            <>
                <ExerciseDetailInfo data={this.state.exerciseDetails}/>
            </>
        );
    }
}

export default ExerciseDetail;
