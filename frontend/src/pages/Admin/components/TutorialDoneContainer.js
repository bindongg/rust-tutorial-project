import {Col, Row} from "react-bootstrap";
import React from "react";

function TutorialDoneContainer(props)
{
    return(
        <>
            <h3 className="text-black mt-5 p-3 text-center rounded">튜토리얼 진행 현황</h3>
            <Row className="mt-5 mb-2">
                <Col lg={7} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                    {
                        props.tutorialDone === null
                            ? (<></>)
                            : (<>
                                {
                                    props.tutorialDone.map((tutorialDone) =>
                                        (<li key={tutorialDone.date} style={{listStyleType: "none"}}>
                                            {tutorialDone.date.substring(0,10) + " " + tutorialDone.date.substring(11,16)}&nbsp;&nbsp;{tutorialDone.tutorial.name}
                                        </li>))
                                }
                            </>)
                    }
                </Col>
            </Row>
        </>
    );
}

export default TutorialDoneContainer;