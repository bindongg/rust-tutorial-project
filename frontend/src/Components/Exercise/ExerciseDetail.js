import React from "react";
import {Button, ButtonToolbar} from "react-bootstrap";
import { Link } from "react-router-dom";

function ExerciseDetail() {
    return (
        <>
            <div className="col-8 mx-auto m-3 p-2">
                <h1>[기초-출력] 출력하기01</h1>
            </div>
            <div className="col-8 mx-auto mt-5">
                <h3 style={{display:"inline-flex"}}>문제 &nbsp;</h3>
                <span><img src="abc.png"></img>&nbsp;&nbsp;</span>
            </div>
            <div className="col-8 mx-auto border-top border-bottom m-3 p-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
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

export default ExerciseDetail;
