import React, {Component, useState} from "react";
import {Link} from "react-router-dom";

function ExerciseDetailInfo({index, title, content}){
    return (
        <>
            <div className="col-8 mx-auto m-3 p-2">
                <h1>{title}</h1>
            </div>
            <div className="col-8 mx-auto mt-5">
                <h3 style={{display:"inline-flex"}}>문제 &nbsp;</h3>
                <span><img src="abc.png"></img>&nbsp;&nbsp;</span>
            </div>
            <div className="col-8 mx-auto border-top border-bottom m-3 p-2">
                {content}
            </div>
            <div className="col-8 mx-auto mt-5">
                <h3>입력</h3>
            </div>
            <div className="col-8 mx-auto border-top border-bottom m-3 p-2">
                대충 이렇게 입력하셈
            </div>
            <div className="col-8 mx-auto mt-5">
                <h3>출력</h3>
            </div>
            <div className="col-8 mx-auto border-top border-bottom m-3 p-2">
                대충 이렇게 출력하셈
            </div>
            <div className="col-8 mx-auto mt-5">
                <h3>입출력 예시</h3>
            </div>
            <div className="col-8 mx-auto border-top border-bottom m-3 p-2">
                대충 이렇게 입력하면 이렇게 나와야 됨
            </div>
            <div className="col-8 mx-auto mt-5">
                <h3>유형</h3>
            </div>
            <div className="col-8 mx-auto border-top border-bottom m-3 p-2">
                <li>
                    <Link to="#">기타</Link>
                </li>
            </div>
        </>
    );
}

export default ExerciseDetailInfo