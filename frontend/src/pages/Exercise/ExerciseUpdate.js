import React, { useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams} from "react-router-dom"
import {customAxios} from "../../Common/Modules/CustomAxios";


function ExerciseUpdate() {
    const {id} = useParams();
    const location = useLocation();
    const exerciseDetail = location.state.exerciseDetail;
    const [editedExercise, setEditedExercise] = useState({exerciseDetail});
    const [testcaseNums, setTestcaseNums] = useState([...Array(exerciseDetail.exerciseTestcases.length)].map((v,i) => i+1));
    // const [exerciseTestCases, setExerciseTestCases ] = useState(exerciseDetail.exerciseTestcases);
    const testCaseForm = {id: "", number: "", input: "", output: ""}
    const [loading,setLoading] = useState(false);

    const [testCodeExists, setTestCodeExists] = useState(!(exerciseDetail.exerciseContent.testCode === null
        || exerciseDetail.exerciseContent.testCode === ""
        || exerciseDetail.exerciseContent.testCode === undefined));

    const [testCode,setTestCode] = useState(testCodeExists === true ? exerciseDetail.exerciseContent.testCode : null);

    const { register, setValue, reset,handleSubmit } = useForm();
    const navigate = useNavigate();

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
        setLoading(true);
        data.exerciseTestcases = data.exerciseTestcases.slice(0, testcaseNums.length);
        data.exerciseContent.testCode = testCode;
        customAxios.patch(`/exercise/${id}`, {...data}
        ).then(function(response) {
            if(response.data.code === 200)
            {
                alert(response.data.data);
                navigate(-1);
            }
            else
            {
                alert("잘못된 입력입니다");
            }
        }).catch((error)=>{
            alert("잘못된 입력입니다");
        })
        .finally(()=>{
            setLoading(false);
          })
    }

    

    // const exerciseTestCases = exerciseDetail.Testcases;
    const addTestcase = () => {
        setTestcaseNums( arr => [...arr, `${arr.length + 1}`]);
    };
    const removeTestcase = () => {
        setTestcaseNums(testcaseNums.slice(0, testcaseNums.length - 1));
    }

    const changeTestCode = (e) => {
        setTestCode(e.target.value);
    }

    const addTestCode = () => {
        setTestCodeExists(true);
        setTestCode("fn main() {\n\n}");
    }

    const delTestCode = () => {
        setTestCodeExists(false);
        setTestCode(null);
    }

    const testcases = testcaseNums.map(function (testcasesNum, index){
        if (exerciseDetail.exerciseTestcases[index]) 
            return (
                <Row key={index} className="mb-3">
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Test Case 입력 {testcasesNum}번</Form.Label>
                            <Form.Control as="textarea" placeholder="테스트 케이스 input을 입력하세요" defaultValue={exerciseDetail.exerciseTestcases[index].input} {...register("exerciseTestcases["+ index+ "].input")} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Test Case 출력 {testcasesNum}번 </Form.Label>
                            <Form.Control as="textarea" placeholder="테스트 케이스 output을 입력하세요" defaultValue={exerciseDetail.exerciseTestcases[index].output} {...register("exerciseTestcases["+ index+ "].output")} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control as="textarea" value={exerciseDetail.exerciseTestcases[index].number} hidden {...register("exerciseTestcases["+ index+ "].number")} />
                        </Form.Group>
                    </Col>
                </Row>
            )
        else
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
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control as="textarea" value={testcasesNum} hidden {...register("exerciseTestcases["+ index+ "].number")} />
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
                                <Form.Control type="title" defaultValue={exerciseDetail.name}  onChange={onEditChange} {...register("name")} />
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="exerciseLevel">
                                    <Form.Label>문제 난이도</Form.Label>
                                    <Form.Select aria-label="exercise level"  defaultValue={exerciseDetail.difficulty}  onChange={onEditChange} {...register("difficulty")} >
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
                                        <option value="입출력">입출력</option>
                                        <option value="제어문">제어문</option>
                                        <option value="반복문">반복문</option>
                                        <option value="자료구조">자료구조</option>
                                        <option value="기타">기타</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>문제 설명</Form.Label>
                                <Form.Control as="textarea" defaultValue={exerciseDetail.exerciseContent.description}   onChange={onEditChange} {...register("exerciseContent.description")} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>1번 입력에 대한 설명</Form.Label>
                                <Form.Control as="textarea" defaultValue={exerciseDetail.exerciseContent.input_description}   onChange={onEditChange}{...register("exerciseContent.input_description")} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>1번 입력값 예시</Form.Label>
                                <Form.Control as="textarea" defaultValue={exerciseDetail.exerciseContent.input_value}   onChange={onEditChange}{...register("exerciseContent.input_value")} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>1번 출력에 대한 설명</Form.Label>
                                <Form.Control as="textarea" defaultValue={exerciseDetail.exerciseContent.output_description}  onChange={onEditChange} {...register("exerciseContent.output_description")} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>1번 출력값 예시</Form.Label>
                                <Form.Control as="textarea" defaultValue={exerciseDetail.exerciseContent.output_value}  onChange={onEditChange} {...register("exerciseContent.output_value")} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exerciseOutputExample">
                                <Form.Label>초기 코드</Form.Label>
                                <Form.Control as="textarea" defaultValue={exerciseDetail.exerciseContent.code} {...register("exerciseContent.code")} />
                            </Form.Group>

                            {testcases}
                            <input type="button" onClick={ addTestcase } value="Test Case 추가하기" />
                            <input type="button" onClick={ removeTestcase } value="Test Case 삭제하기" />
                            <br/>
                            <br/>
                            {/*
                                (exerciseDetail.exerciseContent.testCode === null || exerciseDetail.exerciseContent.testCode === "" || exerciseDetail.exerciseContent.testCode === undefined)
                                    ? (<></>)
                                    : (
                                        <Form.Group className="mb-3" controlId="exerciseExampleCode">
                                            <Form.Label>테스트 코드</Form.Label>
                                            <Form.Control as="textarea" placeholder="테스트 코드를 입력하세요" defaultValue={exerciseDetail.exerciseContent.testCode} {...register("exerciseContent.testCode")} />
                                        </Form.Group>)*/
                            }
                            {
                                testCodeExists === false
                                    ? (<></>)
                                    : (
                                        <Form.Group className="mb-3" controlId="exerciseExampleCode">
                                            <Form.Label>테스트 코드</Form.Label>
                                            <Form.Control as="textarea" placeholder="테스트 코드를 입력하세요" onChange={changeTestCode} defaultValue={testCode} /*{...register("exerciseContent.testCode")}*/ />
                                        </Form.Group>)
                            }
                            {
                                testCodeExists === false
                                    ? (<input type="button" onClick={ addTestCode } value="Test Code 추가하기" />)
                                    : (<input type="button" onClick={ delTestCode } value="Test Code 삭제하기" />)
                            }
                            <br/>
                            <br/>
                           <Button variant="info" type="submit" disabled={loading}>
                                문제 수정
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ExerciseUpdate;