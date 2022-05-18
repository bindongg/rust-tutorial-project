import React from "react";
import {Row, Container, Col, Form, Button, FormGroup, InputGroup, FormControl} from "react-bootstrap";

function PwdForgot() {
    return (
        <>
            <Container>
                <h3 className="text-black mt-5 p-3 text-center rounded">비밀번호 찾기</h3>
                <Row className="mt-5">
                    <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <Form>
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
                                이메일 전송
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default PwdForgot;