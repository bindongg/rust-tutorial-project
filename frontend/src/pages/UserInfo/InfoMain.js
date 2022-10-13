import React, {useEffect, useState} from "react";
import {Row, Container, Col, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {decodeToken} from "react-jwt";
import {customAxios} from "../../Common/Modules/CustomAxios";

function InfoMain() {
    const username = localStorage.getItem("refresh") === null ? null : decodeToken(localStorage.getItem("refresh")).username;
    const [email,setEmail] = useState("");
    useEffect(()=>{
        customAxios.get(`/user/email/${username}`)
            .then((response)=>{
                if(response.data.code === 200)
                {
                    setEmail(response.data.data);
                }
            })
            .catch((error)=>{
                alert("정보를 가져올 수 없습니다");
            })
    })
    return (
        <>
            <Container>
                <h3 className="text-black mt-5 p-3 text-center rounded">회원 정보</h3>
                <Row className="mt-5">
                    <Col lg={7} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>아이디</Form.Label>
                                <Form.Control placeholder="Disabled input" disabled value={username}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>이메일</Form.Label>
                                <Form.Control placeholder="Disabled input" disabled value={email}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Text className="text-muted">
                                    <Link className={"nav-link"} to="/info/updatePwd">비밀번호 변경</Link>
                                </Form.Text>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default InfoMain;