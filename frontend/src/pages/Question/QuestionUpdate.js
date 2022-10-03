import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {EditorState, convertToRaw, ContentState, convertFromHTML} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Loading from "../Loading";
import {customAxios} from "../../Common/Modules/CustomAxios";
import {QUESTION_TYPE} from "../../Common/Modules/Common";
import React from "react";

function QuestionUpdate()
{
    const {id} = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const author = location.state.author;
    const content = location.state.content;
    const title = location.state.title;
    const questionType = location.state.questionType;
    const exerciseId = location.state.exerciseId;

    const [loadingState,setLoadingState] = useState(false);
    const { register, handleSubmit, formState: {errors} } = useForm();
    const [tempState, setTempState] = useState({editorState: EditorState.createWithContent(
            ContentState.createFromBlockArray(convertFromHTML(content)
            )),  })
    const { editorState } = tempState;

    const onEditorStateChange = (editorState) => {
        setTempState({
            editorState,
        });
    };

    function onSubmit(data)
    {
        if(window.confirm("수정하시겠어요?")) {
            setLoadingState(true);
            data = {...data, content: draftToHtml(convertToRaw(editorState.getCurrentContent()))};
            customAxios.put("/user/question/update", {author: author, id: id, title: data.title, content: data.content, exerciseId: data.exerciseId, questionType: questionType})
                .then((response) => {
                    if (response.data.code === 200) {
                        navigate(`/question/${id}`);
                    } else {
                        alert("잘못된 입력입니다");
                    }
                })
                .finally(() => {
                    setLoadingState(false);
                })
        }
    }

    return(
        <>
        {
            loadingState === true
            ? (<Loading/>)
            : (<></>)
        }
            <Container>
                <h3 className="text-black mt-5 p-3 text-center rounded">질문 수정</h3>
                <Row className="mt-7">
                    <Col lg={12} md={10} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3">
                                <Form.Label>제목</Form.Label>
                                <input className="form-control" style={{width:"50%"}} defaultValue={title} {...register("title", {
                                    required: {
                                        value: true,
                                        message: "제목을 입력하세요"
                                    }
                                })}/>
                                {errors.title && <p style={{color: 'red', fontSize: "13px"}}>{errors.title.message}</p>}
                                <Form.Label>종류</Form.Label>
                                <Form.Select size="sm" defaultValue={questionType} disabled={true} style={{width:"10%"}}
                                             {...register("type",  {required: {value: false}})}>
                                    <option>{QUESTION_TYPE[0]}</option>
                                    <option>{QUESTION_TYPE[1]}</option>
                                    <option>{QUESTION_TYPE[2]}</option>
                                </Form.Select>
                                <Form.Label>문제 번호</Form.Label>
                                <input className="form-control" style={{width:"10%"}} disabled={questionType !== QUESTION_TYPE[1]} defaultValue={exerciseId}
                                       {...register("exerciseId",  {required: {value: questionType === QUESTION_TYPE[1]}, pattern: {value: /^[0-9]+$/}})}/>
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

export default QuestionUpdate;