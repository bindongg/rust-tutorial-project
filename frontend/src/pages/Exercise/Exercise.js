import React, {useEffect, useState} from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import ExerciseList from "./components/ExerciseList";
import Button from 'react-bootstrap/Button';

function Exercise(){
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState([]);

  useEffect( () => {
    const getExercises = async () => {
      const exercises = await axios.get("https://ec33a7bf-9e16-4092-8ca5-aeeaf2a1072c.mock.pstmn.io/exercise?user_id=testid");
      setExercises(exercises.data.data);
    }
    // 실행함으로써 데이타를 fetching합니다.
    getExercises();    
    }, []);
    

    return (
      <>
        <div className="col-10 mx-auto pt-5">
          <Button href="exercise/add" variant="secondary">Add Exercise</Button>
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