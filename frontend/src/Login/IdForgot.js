import React from "react";
import {Button, Col, Container, Form, NavLink, Row} from "react-bootstrap";


//container -> 중앙으로 모아줌
function IdForgot() {
    return (
        <>
            <Container>
                <h3 className="text-black mt-5 p-3 text-center rounded">아이디 찾기</h3>
                <Row className="mt-5">
                    <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>비밀번호</Form.Label>
                                <Form.Control type="password" placeholder="비밀번호를 입력하세요" />
                                <Form.Text className="text-muted">
                                <NavLink to="/">비밀번호 찾기</NavLink>
                                </Form.Text>
                            </Form.Group>
                            <Button variant="info" type="submit">
                                회원가입
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default IdForgot;