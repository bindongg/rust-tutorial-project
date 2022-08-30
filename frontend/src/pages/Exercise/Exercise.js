import React, {useEffect, useState} from "react";
import {NavLink, Table} from "react-bootstrap";
import ExerciseList from "./components/ExerciseList";
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router";
import {customAxios} from "../../Common/Modules/CustomAxios";

function Exercise(){
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();
  const moveTo = (href) => {
    navigate(href);
  }

  useEffect( () => {
    const getExercises = async () => {
      const exercises = await customAxios.get(`/exercise`);
      setExercises(exercises.data.data);
    }
    // 실행함으로써 데이타를 fetching합니다.
    getExercises();    
    }, []);
    

    return (
      <>
        <div className="col-10 mx-auto pt-5">
          <Button variant="secondary" onClick={() => moveTo("add") }>Add Exercise</Button>
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