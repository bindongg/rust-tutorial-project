import React, {useContext, useState} from "react";
import {Button, Col, Container, Form, NavLink, Row, Card} from "react-bootstrap";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import {useHistory, useNavigate} from "react-router-dom"
import {Token} from "../../Context/Token/Token";
import { IP } from "../../Context/IP";


function ExerciseCreate() {
    const { register, watch, reset,handleSubmit, formState: {errors} } = useForm();
    const [testcaseNums, setTestcaseNums] = useState([1 ]);
    const {token,setToken} = useContext(Token);
    const ip = useContext(IP);
    const headers = {
        'Content-Type' : 'application/json; charset=utf-8',
        'Authorization' : token
    };
    const navigate = useNavigate();

    //"제출"을 했을 때 무슨일이 일어나는지 확인해봅시다.
    const onValid = (data) => console.log(data, "onValid");
    const onInvalid = (data) => console.log(data, "onInvalid");

    const onSubmit = (data) => {
        console.log('data', data)
        data.exerciseContent.description = data.exerciseContent.description.replaceAll("<br>", "\r\n");
        axios.post(`http://${ip}:8080/exercise`, {...data}, {headers : headers}
        ).then(function(response) {
            alert(response.data.data);
            navigate(-1);
        })
    }

    const addTestcase = () => {
        setTestcaseNums( arr => [...arr, `${arr.length + 1}`]);
    };

    const testcases = testcaseNums.map(function (testcasesNum, index){
        return (
            <Row key={index} className="mb-3">
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Test Case 입력 {testcasesNum}번 </Form.Label>
                        <Form.Control as="textarea" placeholder="테스트 케이스 input을 입력하세요" {...register("exerciseTestcases["+ index+ "].input")} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Test Case 출력 {testcasesNum}번 </Form.Label>
                        <Form.Control as="textarea" placeholder="테스트 케이스 output을 입력하세요" {...register("exerciseTestcases["+ index+ "].output")} />
                    </Form.Group>
                </Col>
            </Row>
        )
    })


    return (
        <>
            <Container>
                <h3 className="text-black mt-5 p-3 text-center rounded">문제 추가하기</h3>
                <Row className="mt-7">
                    <Col lg={7} md={10} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <Form onSubmit={handleSubmit(onSubmit)} onReset={reset} >
                            <Form.Group className="mb-3" controlId="exerciseTitle">
                                <Form.Label>제목</Form.Label>
                                <Form.Control type="title" placeholder="제목을 입력하세요" {...register("name")} />
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="exerciseLevel">
                                    <Form.Label>문제 난이도</Form.Label>
                                    <Form.Select aria-label="exercise level" {...register("difficulty")} >
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
                                    <Form.Select aria-label="exercise kind" {...register("tag")}>
                                        <option>문제 분류를 선택해주세요</option>
                                        //TODO 문제 분류 확정되면 추가하기
                                        <option value="STACK">STACK</option>
                                        <option value="QUEUE">QUEUE</option>
                                        <option value="LIST">LIST</option>
                                        <option value="BASIC">BASIC</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="exerciseExplanation">
                                <Form.Label>문제 설명</Form.Label>
                                <Form.Control as="textarea" placeholder="문제 내용을 입력하세요" {...register("exerciseContent.description")} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exerciseInputExplanation">
                                <Form.Label>1번 입력에 대한 설명</Form.Label>
                                <Form.Control as="textarea" placeholder="1번 입력에 대한 설명을 입력하세요" {...register("exerciseContent.input_description")} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exerciseInputExample">
                                <Form.Label>1번 입력값 예시</Form.Label>
                                <Form.Control as="textarea" placeholder="1번 입력값 예시를 입력하세요" {...register("exerciseContent.input_value")} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exerciseOutputExplanation">
                                <Form.Label>1번 출력에 대한 설명</Form.Label>
                                <Form.Control as="textarea" placeholder="1번 출력에 대한 설명을 입력하세요" {...register("exerciseContent.output_description")} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exerciseOutputExample">
                                <Form.Label>1번 출력값 예시</Form.Label>
                                <Form.Control as="textarea" placeholder="1번 출력값 예시을 입력하세요" {...register("exerciseContent.output_value")} />
                            </Form.Group>

                            {testcases}
                            <input type="button" onClick={ addTestcase } value="Test Case 추가하기" />
                            <br/>
                            <br/>
                           <Button variant="info" type="submit" onSubmit={handleSubmit(onValid, onInvalid)}>
                                문제 추가
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ExerciseCreate;