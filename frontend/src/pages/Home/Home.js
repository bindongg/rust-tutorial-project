import React, {useContext, useState} from 'react';
import {Button, Figure} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {decodeToken} from "react-jwt";
import {Token} from "../../Context/Token/Token";


function Home(){

    const navigate = useNavigate();

    const {token,setToken} = useContext(Token);


    function temp()
    {
        let token = localStorage.getItem("jwt");
        let res = decodeToken(token);
        alert(res.username);
    }

    return (
        <div className="App text-center">
            <figure className="figure text-center">
                <Figure.Image width="400" height="400" alt="rust logo" src="rust-logo-512.png" />
                <h1>Rust 학습 페이지에 오신 걸 환영합니다!</h1>
            </figure>
            <div className="d-grid gap-2 col-4 mx-auto">
                <Button variant="secondary" href="/tutorial" size="lg">
                    Tutorial
                </Button>
                {""}
                <Button variant="secondary" href="/reference" size="lg">
                    Reference
                </Button>
                {""}
                <Button variant="secondary" href="/exercise" size="lg">
                    Exercise
                </Button>
                {""}
            </div>
            <br></br>
        </div>
    );
}

export default Home;