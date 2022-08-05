import {Token} from "../Context/Token/Token";
import {useContext, useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {Col, Container, Form, Row} from "react-bootstrap";
import htmlToDraft from "html-to-draftjs";
import {ContentState, convertFromHTML} from "draft-js";
import {decodeToken} from "react-jwt";
import ReplyList from "./Reply/ReplyList";
import axios from "axios";


function QuestionDetail()
{
    const {token,setToken} = useContext(Token);

    const {navigate} = useNavigate();

    const config = {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "authorization": token
        },
    };

    const location = useLocation();

    const {id} = useParams();
    const [author] = useState(location.state.author);
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [reply,setReply] = useState(null);

    const username = (token === null ? null : (decodeToken(token).username));

    useEffect(()=>{
        axios.get(`http://localhost:8080/question/${id}`)
            .then((response)=>{
                setContent(response.data.data.content);
                setTitle(response.data.data.title);
                setReply([...response.data.data.reply]);
            })
            .catch((error)=>{

            })
    },[]);

    return(
        <>
            <Container>
                <h1 className="text-black mt-5 p-3 rounded">{title}</h1>
                {username === author ? <span><Button>수정하기</Button>&nbsp;&nbsp;&nbsp;<Button>삭제하기</Button></span> : <></>}<h6 className="text-lg-end">작성자: {author}</h6>
                <Row className="mt-7">
                    <Col lg={12} md={10} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <div dangerouslySetInnerHTML={{__html: content}}/>
                    </Col>
                </Row>
                <ReplyList id={id} reply={reply}/>
            </Container>
        </>
    );
}
export default QuestionDetail;