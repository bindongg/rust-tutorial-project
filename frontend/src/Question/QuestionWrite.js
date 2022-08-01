import axios from "axios";
import { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { EditorState, convertToRaw } from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import {Token} from "../Context/Token/Token";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {logout} from "../Common/Modules/Common";


function QuestionWrite()
{
    const {token,setToken} = useContext(Token);
    const navigate = useNavigate();
    const config = {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "authorization": token
        },
    };
    const { register, handleSubmit, formState: {errors} } = useForm();

    const [state, setState] = useState({editorState: EditorState.createEmpty()})
    const { editorState } = state;
    const onEditorStateChange = (editorState) => {
        setState({
            editorState,
        });
    };

    function onSubmit(data)
    {
        data = {...data, content: draftToHtml(convertToRaw(editorState.getCurrentContent()))};
        axios.post("http://localhost:8080/user/question/add",{...data},config)
            .then((response)=>{
                if(response.data.code === 200)
                {
                    navigate("/question");
                }
                else
                {
                    alert("failed");
                }
            })
            .catch((error)=>{
                if(error.response.status === 401 || error.response.status === 403)
                {
                    logout(token,setToken,navigate);
                }
            })
    }
    return (
        <>
            <Container>
                <h3 className="text-black mt-5 p-3 text-center rounded">질문 작성</h3>
                <Row className="mt-7">
                    <Col lg={12} md={10} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <Form onSubmit={handleSubmit(onSubmit)} >
                            <Form.Group className="mb-3">
                                <Form.Label>제목</Form.Label>
                                <input className="form-control" {...register("title",  {required: {value: true, message: "제목을 입력하세요"}})}/>
                                {errors.title && <p style={{color:'red', fontSize:"13px"}}>{errors.title.message}</p>}
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