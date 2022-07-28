import React, { useState} from "react";
import {Button, Col, Container, Form, NavLink, Row, Card} from "react-bootstrap";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import {useHistory, useLocation} from "react-router-dom"


function ExerciseUpdateForm() {

    const location = useLocation();
    const exerciseDetail = location.state.exerciseDetail;

    const [editedExercise, setEditedExercise] = useState({exerciseDetail});
    const { register, watch, reset,handleSubmit } = useForm();

    const onEditChange = (e) => {
        setEditedExercise({ //문법
            ...editedExercise,
            [e.target.name]: e.target.value
        })
    }

    //"제출"을 했을 때 무슨일이 일어나는지 확인해봅시다.
    const onValid = (data) => console.log(data, "onValid");
    const onInvalid = (data) => console.log(data, "onInvalid");

    const onSubmit = (data) => {
        console.log('data', data)
        let problemURL = window.location.pathname;
        let problemNum = problemURL[problemURL.length-1];
        return  axios.patch("https://c70c860f-2bc4-4f61-b0d4-ad3bd5305543.mock.pstmn.io/exercise/"+problemNum, //TODO: patch -> put
            {data: data},
            {withCredentials: true}).then(result => { //TODO backend에서도 마찬가지로 Credential 설정을 true 로 해줘야함
            console.log('register result', result)
            // history.push("/login")
        }).catch()
    }

    const exerciseTestCases = exerciseDetail.Testcases;

    const testcases = exerciseTestCases.map(function (exerciseTestCase, index){
        return (
            <Row key={index} className="mb-3">
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>TestCase 입력 {exerciseTestCase.number}번 </Form.Label>
                        <Form.Control as="textarea" defaultValue={exerciseTestCase.input }  onChange={onEditChange} {...register("exerciseTestcases["+ index+ "].input")} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>TestCase 출력 {exerciseTestCase.number}번 </Form.Label>
                        <Form.Control as="textarea" defaultValue={exerciseTestCase.output }  onChange={onEditChange} {...register("exerciseTestcases["+ index+ "].output")} />
                    </Form.Group>
                </Col>
            </Row>
        )
    })

    return (
        <>
            <Container>
                <h3 className="text-black mt-5 p-3 text-center rounded">문제 수정하기</h3>
                <Row className="mt-7">
                    <Col lg={7} md={10} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <Form onSubmit={handleSubmit(onSubmit, onInvalid)} onReset={reset} >
                            <Form.Group className="mb-3" controlId="exerciseTitle">
                                <Form.Label>제목</Form.Label>
                                <Form.Control type="title" defaultValue={exerciseDetail.title}  onChange={onEditChange} {...register("name")} />
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="exerciseLevel">
                                    <Form.Label>문제 난이도</Form.Label>
                                    <Form.Select aria-label="exercise level"  {...register("difficulty")} >
                                        <option>난이도를 선택해주세요</option>
                                        <option value="STAR1">STAR1</option>
                                        <option value="STAR2">STAR2</option>
                                        <option value="STAR3">STAR3</option>
                                        <option value="STAR4">STAR4</option>
                                        <option value="STAR5">STAR5</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId="exerciseKind">
                                    <Form.Label>문제 분류</Form.Label>
                                    <Form.Select aria-label="exercise kind" defaultValue={exerciseDetail.tag}  onChange={onEditChange} {...register("tag")}>
                                        <option>문제 분류를 선택해주세요</option>
                                        //TODO 문제 분류 확정되면 추가하기
                                        <option value="STACK">STACK</option>
                                        <option value="QUEUE">QUEUE</option>
                                        <option value="LIST">LIST</option>
                                        <option value="BASIC">BASIC</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>문제 설명</Form.Label>
                                <Form.Control as="textarea" defaultValue={exerciseDetail.Content.description}   onChange={onEditChange} {...register("exerciseContent.description")} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>1번 입력에 대한 설명</Form.Label>
                                <Form.Control as="textarea" defaultValue={exerciseDetail.Content.input_description}   onChange={onEditChange}{...register("exerciseContent.input_description")} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>1번 입력값 예시</Form.Label>
                                <Form.Control as="textarea" defaultValue={exerciseDetail.Content.input_value}   onChange={onEditChange}{...register("exerciseContent.input_value")} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>1번 출력에 대한 설명</Form.Label>
                                <Form.Control as="textarea" defaultValue={exerciseDetail.Content.output_description}  onChange={onEditChange} {...register("exerciseContent.output_description")} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>1번 출력값 예시</Form.Label>
                                <Form.Control as="textarea" defaultValue={exerciseDetail.Content.output_value}  onChange={onEditChange} {...register("exerciseContent.output_value")} />
                            </Form.Group>

                            {testcases}

                           <Button variant="info" type="submit" >
                                문제 수정
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ExerciseUpdateForm;