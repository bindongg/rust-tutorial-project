import React, {Component, useContext, useState} from "react";
import {Link, NavLink, useNavigate, useParams} from "react-router-dom";
import CodeEditor from '@uiw/react-textarea-code-editor';
import {Button} from "react-bootstrap";
import axios from "axios";
import {Token} from "../../../Context/Token/Token";
import { IP } from "../../../Context/IP";

function ExerciseDetailInfo({index, title,tag, Content, Testcases, difficulty}){
    // let problemURL = window.location.pathname;
    // let problemNum = problemURL[problemURL.length-1];
    const {id} = useParams();
    const {token,setToken} = useContext(Token);
    const ip = useContext(IP);
    const headers = {
        'Content-Type' : 'application/json; charset=utf-8',
        'Authorization' : token
    };
    const navigate = useNavigate();
    const buttonStyle = { marginLeft:"5px", fontSize:"14px"}
    // const [exerciseDetail, setExerciseDetail] = useState({});
    const exerciseDetail = {
        title: title,
        tag: tag,
        Content: Content,
        Testcases: Testcases,
        difficulty: difficulty
    }
    const [code, setCode] = useState(`fn main() {
  
}
`);
    const jsonCode ={
        "code": code
    }

    const compileCode = (data) => {
        console.log(jsonCode);
        axios.post(`http://localhost:8080/exercise/compile/${id}`, jsonCode, {headers : headers}
        ).then(function(response) {
            alert(response.data);
            navigate(-1);
        })
    }
    const updateDetail = () => {
        navigate(`/exercise/${id}/update`, {state: {exerciseDetail: exerciseDetail}});
    }

    const deleteExercise = () => {
        axios.delete(`http://${ip}:8080/exercise/${id}`, {headers : headers}
        ).then(function(response) {
            alert(response.data.data);
            navigate(-1);
        })
    }

    let difficulty_emoji = difficulty;
    switch (difficulty_emoji){
        case 'STAR1':
            difficulty_emoji = '⭐';
            break;
        case 'STAR2':
            difficulty_emoji = '⭐⭐';
            break;
        case 'STAR3':
            difficulty_emoji = '⭐⭐⭐';
            break;
        case 'STAR4':
            difficulty_emoji = '⭐⭐⭐⭐';
            break;
        case 'STAR5':
            difficulty_emoji = '⭐⭐⭐⭐⭐';
            break;
        default:
            difficulty_emoji = 'etc';
    }

    return (
        <>
            <div className="col-8 mx-auto m-3 p-2">
                <h1>{title}</h1>
                <h5  className="col-4 ms-auto m-1">난이도: {difficulty_emoji}</h5>
            </div>
            <div className="col-4 ms-auto m-1">
                <Button variant="warning" style={buttonStyle} onClick={updateDetail}>수정</Button>
                <Button variant="danger" style={buttonStyle} onClick={deleteExercise}>삭제</Button>
            </div>
            <div className="col-8 mx-auto mt-5">
                <h3 style={{display:"inline-flex"}}>문제 &nbsp;</h3>
            </div>
            <div className="col-8 mx-auto border-top border-bottom m-3 p-2">
                {Content?.description}
            </div>
            <div className="col-8 mx-auto mt-5">
                <h3>입력</h3>
                {Content?.input_description}
            </div>
            <div className="col-8 mx-auto border-top border-bottom m-3 p-2">
                <h6>예시&#41;</h6>
                {Content?.input_value}
            </div>
            <div className="col-8 mx-auto mt-5">
                <h3>출력</h3>
                {Content?.output_description}
            </div>
            <div className="col-8 mx-auto border-top border-bottom m-3 p-2">
                <h6>예시&#41;</h6>
                {Content?.output_value}
            </div>
            <div className="col-8 mx-auto mt-5">
                <h3>컴파일</h3>
            </div>
            <div className="col-8 mx-auto border-top border-bottom m-3 p-2">
                <CodeEditor
                    value={code}
                    language="rust"
                    placeholder="Please enter RUST code."
                    onChange={(event) => setCode(event.target.value)}
                    padding={15}
                    style={{
                        fontSize: 15,
                        backgroundColor: "#f5f5f5",
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                        fontWeight: "bold"
                    }}
                />
                <Button variant="secondary" type="submit" onClick={compileCode} >
                    Compile
                </Button>
            </div>
            <div className="col-8 mx-auto mt-5">
                <h3>유형</h3>
            </div>
            <div className="col-8 mx-auto border-top border-bottom m-3 p-2">
                <li>
                    <Link to="#">{tag}</Link>
                </li>
            </div>
        </>
    );
}

export default ExerciseDetailInfo;