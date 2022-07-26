import React, {useContext, useState} from "react";
import {Row, Container, Col, Form, Button} from "react-bootstrap";
import {Token} from "../../Context/Token/Token";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {logout} from "../../Common/Modules/Common";

function InfoMain() {

    const {token,setToken} = useContext(Token);

    const navigate = useNavigate();

    const [password,setPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [newPasswordCheck,setNewPasswordCheck] = useState("");

    function onChangePassword(e)
    {
        setPassword(e.target.value);
    }

    function onChangeNewPassword(e)
    {
        setNewPassword(e.target.value);
    }

    function onChangeNewPasswordCheck(e)
    {
        setNewPasswordCheck(e.target.value);
    }

    function send()
    {
        if(newPassword === newPasswordCheck)
        {
            let pwdEx = new RegExp(/^(?=.*?[A-Za-z#?!@$%^&*-]).{8,20}$/);
            if(pwdEx.test(newPassword))
            {
                axios.post("http://localhost:8080/user/password", {password: password, newPassword: newPassword}, {headers: {authorization: token}})
                    .then((Response)=>{
                        if(Response.data.code === 200)
                        {
                            alert("비밀번호 변경을 완료했습니다");
                            navigate("/login");
                        }
                        else
                        {
                            alert("비밀번호 변경에 실패했습니다");
                        }
                    })
                    .catch((Error)=>{
                        alert(Error.response.status + " Error");
                        if(Error.response.status === 401 || Error.response.status === 403)
                        {
                            logout(token,setToken,navigate);
                        }
                    })
            }
            else
            {
                alert("변경할 비밀번호가 올바른 형식이 아닙니다.");
            }
        }
        else
        {
            alert("변경할 비밀번호를 다시 확인해주세요");
        }
    }

    return (
        <Container>
            <h3 className="text-black mt-5 p-3 text-center rounded">회원 정보</h3>
            <Row className="mt-5">
                <Col lg={7} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>현재 비밀번호</Form.Label>
                            <Form.Control type="password" placeholder="비밀번호 확인" onChange={onChangePassword}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>새 비밀번호</Form.Label>
                            <Form.Control type="password" placeholder="비밀번호 확인" onChange={onChangeNewPassword}/>
                            <Form.Text>적합 여부</Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>새 비밀번호 확인</Form.Label>
                            <Form.Control type="password" placeholder="비밀번호 확인" onChange={onChangeNewPasswordCheck}/>
                            <Form.Text>일치 여부</Form.Text>
                        </Form.Group>
                        <Button variant="info" type="button" onClick={send}>
                            변경하기
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default InfoMain;