import React from "react";
import {Row, Container, Col} from "react-bootstrap";

function IdForgotGetId() {
    return (
        <>
            <Container>
                <h3 className="text-black mt-5 p-3 text-center rounded">아이디 찾기</h3>
                <Row className="mt-5">
                    <Col lg={7} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        대충 비번 치면 맞는 아이디 찾아서 알려줌
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default IdForgotGetId;