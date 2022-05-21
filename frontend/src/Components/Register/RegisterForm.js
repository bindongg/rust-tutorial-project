import React from "react";
import {Row, Container, Col, Form, Button, InputGroup, FormControl, FormGroup} from "react-bootstrap";

function RegisterForm() {
    return (
        <>
            <Container>
                <h3 className="text-black mt-5 p-3 text-center rounded">회원가입</h3>
                <Row className="mt-5">
                    <Col lg={7} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>아이디</Form.Label>
                                <Form.Control type="id" placeholder="아이디를 입력하세요" />
                                <Button variant="info" type="button" size="sm">
                                    중복확인
                                </Button>
                                <Form.Text>&nbsp;&nbsp; 중복 여부</Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>비밀번호</Form.Label>
                                <Form.Control type="password" placeholder="비밀번호를 입력하세요" />
                                <Form.Text>적합 여부</Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>비밀번호 확인</Form.Label>
                                <Form.Control type="password" placeholder="비밀번호 확인" />
                                <Form.Text>일치 여부</Form.Text>
                            </Form.Group>
                            <FormGroup className="mb-3" controlId="formBasicEmail">
                                <Form.Label>이메일</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="Recipient's username"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                    />
                                    <InputGroup.Text id="basic-addon2">@pusan.ac.kr</InputGroup.Text>
                                </InputGroup>
                            </FormGroup>
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

export default RegisterForm;