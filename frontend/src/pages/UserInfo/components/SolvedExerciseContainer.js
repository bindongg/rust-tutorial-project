import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Col, Row} from "react-bootstrap";
import {customAxios} from "../../../Common/Modules/CustomAxios";
import {decodeToken} from "react-jwt";
import Page from "../../../Common/Page/Page";

function SolvedExerciseContainer() {
    const username = localStorage.getItem("refresh") === null ? null : decodeToken(localStorage.getItem("refresh")).username;
    const [page,setPage] = useState(0);
    const [total,setTotal] = useState(0);
    const [recPerPage] = useState(15);
    const [exerciseList,setExerciseList] = useState([]);
    useEffect(()=>{
        customAxios.get(`/user/exercise/success/${username}`,{params: {page: page, size: recPerPage}})
            .then((response)=>{
                if(response.data.code === 200)
                {
                    setTotal(response.data.total);
                    setExerciseList([...response.data.data]);
                }
                else
                {
                    alert("failed");
                }
        })
    },[page])
    return (
        <>
            <Row className="mt-5">
                <Col lg={7} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                    {
                        exerciseList === null
                            ? (<></>)
                            : (<>
                                {
                                    exerciseList.map((exercise,index)=>
                                        (<li key={index} style={{listStyleType: "none"}}>
                                            <Link to={`/exercise/${exercise.exercise.id}`} style={{color: "blue", textDecorationLine: "none"}}>{exercise.date.substring(0,10)+" "+exercise.date.substring(11,16)}&nbsp;&nbsp;{exercise.exercise.name}</Link>
                                        </li>)
                                    )
                                }</>)
                    }
                </Col>
                <Page page={page} setPage={setPage} total={total} recPerPage={recPerPage}/>
            </Row>
        </>
    );
}

export default SolvedExerciseContainer;