import React from "react";
import {Row, Container, Col, Form, Button, NavLink} from "react-bootstrap";

function LoginForm() {
    return (
        <>
            <Container>
                <h3 className="text-black mt-5 p-3 text-center rounded">로그인</h3>
                <Row className="mt-5">
                    <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>아이디</Form.Label>
                                <Form.Control type="id" placeholder="아이디를 입력하세요" />
                                <Form.Text className="text-muted">
                                    <NavLink to="/">아이디 찾기</NavLink>
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>비밀번호</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                                <Form.Text className="text-muted">
                                    <NavLink to="/">비밀번호 찾기</NavLink>
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="로그인 유지" />
                            </Form.Group>
                            <Button variant="info" type="submit">
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