import axios from "axios";
import { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {EditorState, convertToRaw, ContentState, convertFromHTML} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import {Token} from "../../Context/Token/Token";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {login, logout, logout_} from "../../Common/Modules/Common";
import Loading from "../Loading";
import { IP } from "../../Context/IP";
import {Refresh} from "../../Context/Token/Refresh";

function QuestionUpdate()
{
    const {id} = useParams();

    const {token,setToken} = useContext(Token);
    const {setRefresh} = useContext(Refresh);
    const ip = useContext(IP);
    const navigate = useNavigate();
    const config = {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "authorization": token
        },
    };
    const location = useLocation();

    const author = location.state.author;
    const content = location.state.content;
    const title = location.state.title;

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
        setLoadingState(true);
        data = {...data, content: draftToHtml(convertToRaw(editorState.getCurrentContent()))};
        axios.put(`http://${ip}:8080/user/question/update`,{author: author,id: id,title: data.title,content: data.content},config)
            .then((response)=>{
                if(response.data.code === 200)
                {
                    login(setToken,setRefresh,response);
                    navigate(`/question/${id}`);
                }
                else
                {
                    alert("failed");
                }
            })
            .catch((error)=>{
                if(error.response.status === 401 || error.response.status === 403)
                {
                    logout_(token,setToken,setRefresh,navigate,axios);
                }
            })
            .finally(()=>{
                setLoadingState(false);
            })
    }

    return(
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
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3">
                                <Form.Label>제목</Form.Label>
                                <input className="form-control" defaultValue={title} {...register("title", {
                                    required: {
                                        value: true,
                                        message: "제목을 입력하세요"
                                    }
                                })}/>
                                {errors.title && <p style={{color: 'red', fontSize: "13px"}}>{errors.title.message}</p>}
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