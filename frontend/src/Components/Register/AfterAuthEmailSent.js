import React from "react";
import {Row, Container, Col} from "react-bootstrap";

function AfterAuthEmailSent() {
    return (
        <>
            <Container>
                <h3 className="text-black mt-5 p-3 text-center rounded">이메일 인증</h3>
                <Row className="mt-5">
                    <Col lg={7} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        대충 입력한 메일로 인증 메일 보냈다는 내용
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default AfterAuthEmailSent;