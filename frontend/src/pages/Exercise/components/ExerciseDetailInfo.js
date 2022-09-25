import React, { useState} from "react";
import {Link,useNavigate, useParams} from "react-router-dom";
import CodeEditor from '@uiw/react-textarea-code-editor';
import {Button} from "react-bootstrap";
import { decodeToken } from "react-jwt";
import {customAxios} from "../../../Common/Modules/CustomAxios";

function ExerciseDetailInfo({exerciseDetail, code, setCode}) {
    const {id} = useParams();
    const [time, setTime] = useState();
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const role = (localStorage.getItem("refresh") === null ? null : (decodeToken(localStorage.getItem("refresh")).role));
    const buttonStyle = { marginLeft:"5px", fontSize:"14px"}
    const jsonCode ={
        "code": code
    }

    const compileCode = (data) => {
        console.log(jsonCode);
        setLoading(true);
        customAxios.post(`/exercise/compile/${id}`, jsonCode
        ).then(function(response) {
            alert(response.data.data.stdOut);
            setTime(response.data.data.time);
        })
        .finally(()=>{
            setLoading(false);
        })
    }
    const updateDetail = () => {
        navigate(`/exercise/${id}/update`, {state: {exerciseDetail: exerciseDetail}});
    }

    const deleteExercise = () => {
        if(window.confirm("삭제하시겠어요?")) {
            customAxios.delete(`/exercise/${id}`
            ).then(function(response) {
                alert(response.data.data);
                navigate(-1);
            })
        }
    }

    let difficulty_emoji = exerciseDetail.difficulty;
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
                <h1>{exerciseDetail.name}</h1>
                <h5  className="col-4 ms-auto m-1">난이도: {difficulty_emoji}</h5>
            </div>
            {
            (role === "ROLE_ADMIN" || role === "ROLE_MANAGER") &&
            <div className="col-4 ms-auto m-1">
                <Button variant="warning" style={buttonStyle} onClick={updateDetail}>수정</Button>
                <Button variant="danger" style={buttonStyle} onClick={deleteExercise}>삭제</Button>
            </div>
            }                
            <div className="col-8 mx-auto mt-5">
                <h3 style={{display:"inline-flex"}}>문제 &nbsp;</h3>
            </div>
            <div className="col-8 mx-auto border-top border-bottom m-3 p-2">
                {exerciseDetail.exerciseContent?.description}
            </div>
            <div className="col-8 mx-auto mt-5">
                <h3>입력</h3>
                {exerciseDetail.exerciseContent?.input_description}
            </div>
            <div className="col-8 mx-auto border-top border-bottom m-3 p-2">
                <h6>예시&#41;</h6>
                {exerciseDetail.exerciseContent?.input_value}
            </div>
            <div className="col-8 mx-auto mt-5">
                <h3>출력</h3>
                {exerciseDetail.exerciseContent?.output_description}
            </div>
            <div className="col-8 mx-auto border-top border-bottom m-3 p-2">
                <h6>예시&#41;</h6>
                {exerciseDetail.exerciseContent?.output_value}
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
                        fontSize: 12,
                        backgroundColor: "#f5f5f5",
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                      }}
                />
                <div className="nav justify-content-end" style={{fontSize: 15}}>time: {time ? time / 1000 + "sec" : "    sec"}</div>
                <Button variant="secondary" type="submit" disabled={loading} onClick={compileCode} >
                    Compile
                </Button>
            </div>
            <div className="col-8 mx-auto mt-5">
                <h3>유형</h3>
            </div>
            <div className="col-8 mx-auto border-top border-bottom m-3 p-2">
                <li>
                    <Link to={`/exercise/tag/${exerciseDetail.tag}`}>{exerciseDetail.tag}</Link>
                </li>
            </div>
        </>
    );
}

export default ExerciseDetailInfo;