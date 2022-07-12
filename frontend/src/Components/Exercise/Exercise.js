import React, {Component,useEffect, useState} from "react";
import { Table } from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import ExerciseList from "./ExerciseList";

function Exercise(){
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState([]);

  useEffect( () => {
    const getExercises = async () => {
      const exercises = await axios.get("https://c70c860f-2bc4-4f61-b0d4-ad3bd5305543.mock.pstmn.io/exercise");
      setExercises(exercises.data);
    }
    // 실행함으로써 데이타를 fetching합니다.
    getExercises();
    }, []);



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
            <ExerciseList exercises={exercises}/>
          </Table>
        </div>
      </>
    );
}

export default Exercise;