import {Token} from "../../Context/Token/Token";
import {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {Col, Container, Form, Row} from "react-bootstrap";
import {decodeToken} from "react-jwt";
import ReplyList from "./Reply/ReplyList";
import axios from "axios";
import {logout} from "../../Common/Modules/Common";


function QuestionDetail()
{
    const {token,setToken} = useContext(Token);

    const navigate = useNavigate();

    const config = {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "authorization": token
        },
    };

    const {id} = useParams();
    const [author,setAuthor] = useState(null);
    const [title,setTitle] = useState(null);
    const [content,setContent] = useState(null);
    const [reply,setReply] = useState(null);

    const username = (token === null ? null : (decodeToken(token).username));

    useEffect(()=>{
        axios.get(`http://localhost:8080/question/${id}`)
            .then((response)=>{
                if(response.data.code === 200)
                {
                    setAuthor(response.data.data.user.id);
                    setContent(response.data.data.content);
                    setTitle(response.data.data.title);
                    setReply(response.data.data.reply);
                }
                else
                {
                    alert("failed");
                }
            })
            .catch((error)=>{
                alert("error");
            })
    },[]);

    function delQuestion()
    {
        axios.delete(`http://localhost:8080/user/question/delete/${id}`,config)
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

    return(
        <>
            <Container>
                <h1 className="text-black mt-5 p-3 rounded">{title}</h1>
                {
                    username === author
                        ?
                        (<span>
                            <Button className="btn btn-secondary btn-sm" type="button" onClick={()=>{navigate(`/question/update/${id}`,{state: {author: author, title: title, content: content}})}}>수정하기</Button>
                            <Button className="btn btn-secondary btn-sm" type="button" onClick={delQuestion}>삭제하기</Button>
                        </span>)
                        : (<></>)
                }
                <h6 className="text-lg-end">작성자: {author}</h6>
                <Row className="mt-7">
                    <Col lg={12} md={10} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <div dangerouslySetInnerHTML={{__html: content}}/>
                    </Col>
                </Row>
                <ReplyList id={id} reply={reply}/>
            </Container>
                }
        </>
    );
}
export default QuestionDetail;