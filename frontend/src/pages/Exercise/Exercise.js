import React, {useEffect, useState} from "react";
import {NavLink, Table} from "react-bootstrap";
import ExerciseList from "./components/ExerciseList";
import Button from 'react-bootstrap/Button';
import {useNavigate, useParams} from "react-router";
import {customAxios} from "../../Common/Modules/CustomAxios";
import Page from "../../Common/Page/Page";

function Exercise(){
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState([]);
  const [total,setTotal] = useState(0);
  const [recPerPage] = useState(15);
  const [page,setPage] = useState(0);
  const {tag, difficulty} = useParams();
  const navigate = useNavigate();
  const moveTo = (href) => {
    navigate(href);
  }

  useEffect( () => {
    if (tag) 
    {
      customAxios.get(`/exercise/tag`, {params: {page: page, size: recPerPage, tag: tag}}).then((response) => {
        if (response.data.code === 200)  
        {
          setTotal(response.data.total);
          setExercises([...response.data.data]);
          console.log(exercises.data.data);
        }
        else 
        {
          alert("failed");
        }
      })
    }
    else if (difficulty)
    {
      customAxios.get(`/exercise/difficulty`, {params: {page: page, size: recPerPage, difficulty: difficulty}}).then((response) => {
        if (response.data.code === 200)  
        {
          setTotal(response.data.total);
          setExercises([...response.data.data]);
          console.log(exercises.data.data);
        }
        else 
        {
          alert("failed");
        }
      })
    }
    else
    {
      customAxios.get(`/exercise`, {params: {page: page, size: recPerPage}}).then((response) => {
        if (response.data.code === 200)  
        {
          setTotal(response.data.total);
          setExercises([...response.data.data]);
          console.log(exercises.data.data);
        }
        else 
        {
          alert("failed");
        }
      })
    }
    
    }, [page, window.location.href]);
    

    return (
      <>
        <div className="col-10 mx-auto pt-5">
          <Button variant="secondary" onClick={() => moveTo("/exercise/add") }>Add Exercise</Button>
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
          <Page page={page} setPage={setPage} total={total} recPerPage={recPerPage}/>
        </div>
      </>
    );
}

export default Exercise;