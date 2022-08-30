import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Token } from "../../Context/Token/Token";
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { IP } from "../../Context/IP";
import { stateFromMarkdown } from "draft-js-import-markdown";
import { stateToMarkdown } from "draft-js-export-markdown";
import { customAxios } from "../../Common/Modules/CustomAxios";

function TutorialSubUpdateForm() {
    const {tutorialSub} = useLocation().state;
    //const {token,setToken} = useContext(Token);
    const [loading,setLoading] = useState(false);
    const { register, handleSubmit, formState: {errors} } = useForm();
    const navigate = useNavigate();
    
    const onSubmit = (data) => {
        setLoading(true);
        data.number = data.number * 1;
        data = {...data, content: textState};
        customAxios.patch(`/tutorial/sub/${tutorialSub.id}`, {...data})
        .then((response) => 
        {
            if (response.data.code === 200)
            {
                alert(response.data.data);
            }
            navigate(-1);
        })
        .catch((Error) => 
        {
            alert(Error.response.status + " error");
        })
    }
    // editor 설정
    const [state, setState] = useState({editorState: EditorState.createWithContent(
        stateFromMarkdown(tutorialSub.content)), textState: tutorialSub.content })
    const { editorState, textState } = state;
    const onEditorStateChange = (editorState) => {        
        let state = editorState.getCurrentContent()
        let textState = stateToMarkdown(state);
        setState({editorState, textState});
    };
    const onPlainTextChange = (e) => {
        let textState = e.target.value;
        let content = stateFromMarkdown(textState);
        let editorState = EditorState.createWithContent(content);
        setState({ editorState, textState });
    }

    return (
        <>
            <Container>
                <h3 className="text-black mt-5 p-3 text-center rounded">소주제 수정하기</h3>
                <Row className="mt-7">
                    <Col lg={7} md={10} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <Form onSubmit={handleSubmit(onSubmit)} >
                            <Form.Group className="mb-3" controlId="tutorialNumber">
                                <Form.Label>번호</Form.Label>
                                <Form.Control placeholder="번호를 입력하세요" defaultValue={tutorialSub.number} {...register("number",  {required: {value:true, message:"*번호를 입력하세요"} , pattern: {value: /^[0-9]+$/, message:"*번호는 숫자만 가능합니다"}})} />
                                {errors.number && <p style={{color:'red', fontSize:"13px"}}>{errors.number.message}</p>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="tutorialTitle">
                                <Form.Label>제목</Form.Label>
                                <Form.Control type="title" placeholder="제목을 입력하세요" defaultValue={tutorialSub.name} {...register("name",  {required: {value:true, message:"*제목를 입력하세요"}})} />
                                {errors.name && <p style={{color:'red', fontSize:"13px"}}>{errors.name.message}</p>}
                            </Form.Group>
                            <Editor
                                editorState={editorState}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={onEditorStateChange}
                                localization=
                                {{
                                locale: 'ko',
                                }}
                                wrapperStyle=
                                {{
                                    border: '1px solid #ced4da',
                                    borderRadius: '.25rem'
                                }}
                            />
                            <br/>
                            <Form.Control value={textState} as="textarea" rows="3" onChange={onPlainTextChange} />
                            <br/>
                           <Button type="submit" disabled={loading}>제출하기</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default TutorialSubUpdateForm;