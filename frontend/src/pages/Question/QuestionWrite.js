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

function QuestionWrite()
{
    const navigate = useNavigate();


    const [loadingState,setLoadingState] = useState(false);
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
        setLoadingState(true);
        data = {...data, content: draftToHtml(convertToRaw(editorState.getCurrentContent()))};
        customAxios.post("user/question/add",{...data})
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
            .finally(()=>{
                setLoadingState(false);
            })
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