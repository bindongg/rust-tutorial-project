import {Col, Row} from "react-bootstrap";
import React, {useEffect} from "react";

function ExerciseTryContainer(props) {
    return(
        <>
            <h3 className="text-black mt-5 p-3 text-center rounded">시도한 문제</h3>
            <Row className="mt-5 mb-2">
                <Col lg={7} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                    {
                        props.exerciseTry === null
                            ? (<></>)
                            : (<>
                                {
                                    props.exerciseTry.map((exerciseTry) =>
                                        exerciseTry.solved === "SUCCESS"
                                            ? (<li key={exerciseTry.date} style={{listStyleType: "none"}}>
                                                {exerciseTry.date.substring(0,10) + " " + exerciseTry.date.substring(11,16)}&nbsp;&nbsp;{exerciseTry.exercise.name}
                                            </li>)
                                            : null)
                                }
                            </>)
                    }
                </Col>
            </Row>
        </>
    );
}

export default ExerciseTryContainer;