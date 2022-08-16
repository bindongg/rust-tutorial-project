import React, {useContext, useState} from "react";
import {Row, Container, Col, Form, Button, NavLink} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Token} from "../../Context/Token/Token";
import {decodeToken} from "react-jwt";
import { IP } from "../../Context/IP";

const config = {
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    },
};

function LoginForm() {
    const {token,setToken} = useContext(Token);
    const ip = useContext(IP);
    const [userId,setUserId] = useState("");
    const [userPwd,setUserPwd] = useState("");
    const navigate = useNavigate();
    function onChangeId(e)
    {
        setUserId(e.target.value);
    }

    function onChangePwd(e)
    {
        setUserPwd(e.target.value);
    }

    function logIn()
    {
        axios.post(`http://${ip}:8080/login`,{userId: userId, userPassword: userPwd}, config)
            .then((response)=>{
                if(response.status === 200)
                {
                    localStorage.setItem("jwt", response.headers['authorization']);
                    setToken(localStorage.getItem("jwt"));
                    navigate(-1);
                }
            })
            .catch((Error)=>{
                alert(Error.response.status+" 아이디 또는 비밀번호가 일치하지 않습니다");
            })
    }

    return (
        <>
            <Container>
                <h3 className="text-black mt-5 p-3 text-center rounded">로그인</h3>
                <Row className="mt-5">
                    <Col lg={7} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>아이디</Form.Label>
                                <Form.Control type="id" placeholder="아이디를 입력하세요" onChange={onChangeId}/>
                                <Form.Text className="text-muted">
                                    <NavLink href="/idForgot">아이디 찾기</NavLink>
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>비밀번호</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={onChangePwd}/>
                                <Form.Text className="text-muted">
                                    <NavLink href="/pwdForgot">비밀번호 찾기</NavLink>
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="로그인 유지" />
                            </Form.Group>
                            <Button variant="info" type="button" onClick={logIn}>
                                로그인
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default LoginForm;