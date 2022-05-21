import React from "react";
import {Col, Container, Row} from "react-bootstrap";

function SolvedExer() {
    return (
        <>
            <Container>
                <h3 className="text-black mt-5 p-3 text-center rounded">해결한 문제</h3>
                <Row className="mt-5">
                    <Col lg={7} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">

                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default SolvedExer;