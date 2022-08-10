import React, {useContext, useEffect, useState} from "react";
import {NavLink, Table} from "react-bootstrap";
import axios from "axios";
import ExerciseList from "./components/ExerciseList";
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router";
import {Token} from "../../Context/Token/Token";

function Exercise(){
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();
  const moveTo = (href) => {
    navigate(href);
  }
  const {token,setToken} = useContext(Token);
  const headers = {
    'Content-Type' : 'application/json; charset=utf-8',
    'Authorization' : token
  };

  useEffect( () => {
    const getExercises = async () => {
      const exercises = await axios.get("http://localhost:8080/exercise", {headers : headers});
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