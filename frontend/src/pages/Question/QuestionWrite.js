import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {EditorState, convertToRaw} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Loading from "../Loading";
import {customAxios} from "../../Common/Modules/CustomAxios";
import React from "react";
import {QUESTION_TYPE} from "../../Common/Modules/Common";
import {decodeToken} from "react-jwt";

function QuestionWrite()
{
    const navigate = useNavigate();
    const role = (localStorage.getItem("refresh") === null ? null : (decodeToken(localStorage.getItem("refresh")).role));

    const [loadingState,setLoadingState] = useState(false);
    const { register, handleSubmit, formState: {errors} } = useForm();

    const [state, setState] = useState({editorState: EditorState.createEmpty()})
    const { editorState } = state;
    const onEditorStateChange = (editorState) => {
        setState({
            editorState,
        });
    };

    const [exerciseReqState,setExerciseReqState] = useState(false);

    function onSubmit(data)
    {
        if(window.confirm("작성하시겠어요?")) {
            setLoadingState(true);
            data = {...data, content: draftToHtml(convertToRaw(editorState.getCurrentContent()))};
            customAxios.post("user/question/add", {...data})
                .then((response) => {
                    if (response.data.code === 200) {
                        navigate("/question");
                    } else {
                        alert("잘못된 입력입니다");
                    }
                })
                .finally(() => {
                    setLoadingState(false);
                })
        }
    }

    return (
        <>
            {
                loadingState === true
                    ? (<Loading/>)
                    : (<></>)
            }
            <Container>
                <h3 className="text-black mt-5 p-3 text-center rounded">질문 작성</h3>
                <Row className="mt-7">
                    <Col lg={12} md={10} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <Form onSubmit={handleSubmit(onSubmit)} >
                            <Form.Group className="mb-3">
                                <Form.Label>제목</Form.Label>
                                <input className="form-control" style={{width:"50%"}} {...register("title",  {required: {value: true, message: "제목을 입력하세요"}})}/>
                                {errors.title && <p style={{color:'red', fontSize:"13px"}}>{errors.title.message}</p>}
                                <Form.Label>종류</Form.Label>
                                <Form.Select size="sm" defaultValue={QUESTION_TYPE[2]} style={{width:"10%"}}
                                             {...register("type",  {required: {value: true}})}>
                                    {
                                        role !== "ROLE_USER" ? (<option>{QUESTION_TYPE[0]}</option>) : (<></>)
                                    }
                                    <option>{QUESTION_TYPE[1]}</option>
                                    <option>{QUESTION_TYPE[2]}</option>
                                </Form.Select>
                                <Form.Label>문제 번호</Form.Label>
                                <input className="form-control" style={{width:"10%"}}  {...register("exerciseId",  {required: {value: false}, pattern: {value: /^[0-9]+$/}})}/>
                                {errors.exerciseId && <p style={{color:'red', fontSize:"13px"}}>"숫자를 입력해주세요"</p>}
                            </Form.Group>
                            <Editor
                                editorState={editorState}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                toolbarClassName="demo-toolbar"
                                wrapperStyle=
                                    {{
                                        border: '1px solid #ced4da',
                                        borderRadius: '.25rem'
                                    }}
                                onEditorStateChange={onEditorStateChange}
                                localization={{
                                    locale: 'ko'
                                }}
                            />
                            <br/>
                            <Button type="submit">제출하기</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default QuestionWrite;