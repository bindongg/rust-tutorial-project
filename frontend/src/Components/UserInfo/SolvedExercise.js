import React from "react";
import {Container} from "react-bootstrap";
import SolvedExerciseContainer from "./SolvedExerciseContainer";

function SolvedExercise() {
    return (
        <>
            <Container>
                <h3 className="text-black mt-5 p-3 text-center rounded">해결한 문제</h3>
                <SolvedExerciseContainer/>
                <br/>
                <br/>
                <h3 className="text-black mt-5 p-3 text-center rounded">실패한 문제</h3>
                <SolvedExerciseContainer/>
            </Container>
        </>
    );
}

export default SolvedExercise;