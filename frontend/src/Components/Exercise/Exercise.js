import React, {Component} from "react";
import { Table } from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import ExerciseList from "./ExerciseList";

class Exercise extends Component{
  state ={
    isLoading: true,
    exercises:[],
  };
  getExercises = async () => {
    //TODO 실제 api 주소로 대체하기
    const exercises = await axios.get("https://jsonplaceholder.typicode.com/albums");
    // console.log(exercises.data); //점 연산자로 json 데이터 접근
    this.setState({exercises: exercises.data});
  }

  componentDidMount() { //render() 를 호출하고난 다음에 호출됨
    this.getExercises();
  }


  render() {
    return (
      <>
        <div className="col-10 mx-auto pt-5">
          <Table striped bordered hover>
            <thead>
            <tr>
              <th>번호</th>
              <th>문제명</th>
              <th>종류</th>
              <th>난이도</th>
              <th>정보</th>
            </tr>
            </thead>
            <ExerciseList data={this.state.exercises}/>
          </Table>
        </div>
      </>
  );
  }
}

export default Exercise;