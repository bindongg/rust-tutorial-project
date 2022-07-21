import React from "react";
import {Row, Container, Col, Form, Button} from "react-bootstrap";

function InfoMain() {
    return (
        <Container>
            <h3 className="text-black mt-5 p-3 text-center rounded">회원 정보</h3>
            <Row className="mt-5">
                <Col lg={7} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>현재 비밀번호</Form.Label>
                            <Form.Control type="password" placeholder="비밀번호 확인" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>새 비밀번호</Form.Label>
                            <Form.Control type="password" placeholder="비밀번호 확인" />
                            <Form.Text>적합 여부</Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>새 비밀번호 확인</Form.Label>
                            <Form.Control type="password" placeholder="비밀번호 확인" />
                            <Form.Text>일치 여부</Form.Text>
                        </Form.Group>
                        <Button variant="info" type="button">
                            변경하기
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default InfoMain;