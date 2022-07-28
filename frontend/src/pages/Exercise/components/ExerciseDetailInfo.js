import React, {Component, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import ExerciseTestCase from "./ExerciseTestCase";
import Button from "react-bootstrap/Button";
// import {NavLink} from "react-bootstrap";

function ExerciseDetailInfo({index, title,tag, Content, Testcases}){
    const testcase = Testcases?.map(
        Testcase => (<ExerciseTestCase key = {Testcase.id} Testcase={Testcase}/>)
    )
    let problemURL = window.location.pathname;
    let problemNum = problemURL[problemURL.length-1];
    const exerciseDetail = {
        title: title,
        tag: tag,
        Content: Content,
        Testcases: Testcases
    }

    // console.log(ExerciseDetail);


    return (
        <>
            <div className="col-8 mx-auto m-3 p-2">
                <h1>{title}</h1>
            </div>
            <div className="col-8 mx-auto">
                {/*<Button href= {problemNum + "/update"} variant="secondary" >Update Exercise</Button>*/}
                <NavLink className="nav-link" to={`/exercise/${problemNum}/update`} state={{exerciseDetail: exerciseDetail}}>Update Exercise</NavLink>
            </div>
            <div className="col-8 mx-auto mt-5">
                <h3 style={{display:"inline-flex"}}>문제 &nbsp;</h3>
                <span><img src="../abc.png"></img>&nbsp;&nbsp;</span>
            </div>
            <div className="col-8 mx-auto border-top border-bottom m-3 p-2">
                {Content?.description}
            </div>
            <div className="col-8 mx-auto mt-5">
                <h3>입력</h3>
                {Content?.input_description}
            </div>
            <div className="col-8 mx-auto border-top border-bottom m-3 p-2">
                {Content?.input_value}
            </div>
            <div className="col-8 mx-auto mt-5">
                <h3>출력</h3>
                {Content?.output_description}
            </div>
            <div className="col-8 mx-auto border-top border-bottom m-3 p-2">
                {Content?.output_value}
            </div>
            <div className="col-8 mx-auto mt-5">
                <h3>테스트 케이스</h3>
            </div>
            <div className="col-8 mx-auto border-top border-bottom m-3 p-2">
                {testcase}
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