import axios from "axios";
import { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Token } from "../../Context/Token/Token";
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToMarkdown from 'draftjs-to-markdown';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function TutorialSubCreateForm() {
    const {tutorial} = useLocation().state;
    const {token,setToken} = useContext(Token);
    const headers = {
        'Content-Type' : 'application/json; charset=utf-8',
        'Authorization' : token
      };
    const { register, handleSubmit, formState: {errors} } = useForm();
    const navigate = useNavigate();

        
    const onSubmit = (data) => {
        data.number = data.number * 1;
        data = {...data, content: draftToHtml(convertToRaw(editorState.getCurrentContent()))};
        axios.post(`http://localhost:8080/tutorial/${tutorial.id}/sub`, {...data}, {headers : headers}
        ).then(function(response) {
            alert(response.data.data);
            navigate(-1);
        })
        
    }
    // editor 설정
    const [state, setState] = useState({editorState: EditorState.createEmpty(),  })
    const { editorState } = state;
    const onEditorStateChange = (editorState) => {
        setState({
        editorState,
        });
    };

    return (
        <>
            <Container>
                <h3 className="text-black mt-5 p-3 text-center rounded">소주제 추가하기</h3>
                <Row className="mt-7">
                    <Col lg={7} md={10} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <Form onSubmit={handleSubmit(onSubmit)} >
                            <Form.Group className="mb-3" controlId="tutorialNumber">
                                <Form.Label>번호</Form.Label>
                                <Form.Control placeholder="번호를 입력하세요" {...register("number",  {required: {value:true, message:"*번호를 입력하세요"} , pattern: {value: /^[0-9]+$/, message:"*번호는 숫자만 가능합니다"}})} />
                                {errors.number && <p style={{color:'red', fontSize:"13px"}}>{errors.number.message}</p>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="tutorialTitle">
                                <Form.Label>제목</Form.Label>
                                <Form.Control type="title" placeholder="제목을 입력하세요" {...register("name",  {required: {value:true, message:"*제목를 입력하세요"}})} />
                                {errors.name && <p style={{color:'red', fontSize:"13px"}}>{errors.name.message}</p>}
                            </Form.Group>
                            <Editor
                                editorState={editorState}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={onEditorStateChange}
                                localization={{
                                locale: 'ko',
                                }}
                            />
                            {/* <textarea
                                disabled
                                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                                />
                            <textarea
                            disabled
                            value={editorState && draftToMarkdown(convertToRaw(editorState.getCurrentContent()))}
                            /> */}
                            <br/>
                           <Button type="submit">제출하기</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default TutorialSubCreateForm;