import React from "react";
import {Link} from "react-router-dom";
import {Col, Row} from "react-bootstrap";

function SolvedExerciseContainer() {
    return (
        <>
            <Row className="mt-5">
                <Col lg={7} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                    <li><Link to="#">날짜 아이디 제목날짜</Link></li>
                </Col>
            </Row>
        </>
    );
}

export default SolvedExerciseContainer;