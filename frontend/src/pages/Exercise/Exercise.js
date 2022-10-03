import React, {useEffect, useState} from "react";
import {NavLink, Table} from "react-bootstrap";
import ExerciseList from "./components/ExerciseList";
import Button from 'react-bootstrap/Button';
import {useNavigate, useParams} from "react-router";
import {customAxios} from "../../Common/Modules/CustomAxios";
import Page from "../../Common/Page/Page";
import { decodeToken } from "react-jwt";

function Exercise(){
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState([]);
  const [total,setTotal] = useState(0);
  const [recPerPage] = useState(15);
  const [page,setPage] = useState(0);
  const role = (localStorage.getItem("refresh") === null ? null : (decodeToken(localStorage.getItem("refresh")).role));
  const {tag, difficulty} = useParams();
  const navigate = useNavigate();
  const moveTo = (href) => {
    navigate(href);
  }

  useEffect( () => {
    var request = '/exercise'
    var requestParams = {page: page, size: recPerPage}
    if (tag) 
    {
      request = '/exercise/tag'
      requestParams = {...requestParams, tag: tag}
    }
    else if (difficulty)
    {
      request = '/exercise/difficulty'
      requestParams = {...requestParams, difficulty: difficulty}
    }
    console.log(requestParams);
    customAxios.get(request, {params: {...requestParams}}).then((response) => {
      if (response.data.code === 200)  
      {
        setTotal(response.data.total);
        setExercises([...response.data.data]);

      }
      else 
      {
        alert("failed");
      }
    }).catch((Error) => 
    {
        const status = Error.response.status
        if (status === 403)
        {
            alert("권한이 없습니다.")
            navigate("/login")
        }
        else
        {
            alert(status + " error");
        }
    });
    
    }, [page, window.location.href]);
    

    return (
      <>
        <div className="col-10 mx-auto pt-5">
        {
            (role === "ROLE_ADMIN" || role === "ROLE_MANAGER") &&
            <Button className="mb-3" variant="secondary" onClick={() => moveTo("/exercise/add") }>Add Exercise</Button>
        }                
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