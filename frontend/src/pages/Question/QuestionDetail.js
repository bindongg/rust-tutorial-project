import {useEffect, useState} from "react";
import { useNavigate, useParams} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {Col, Container, Row} from "react-bootstrap";
import {decodeToken} from "react-jwt";
import ReplyList from "./Reply/ReplyList";
import {customAxios} from "../../Common/Modules/CustomAxios";


function QuestionDetail()
{
    const navigate = useNavigate();

    const {id} = useParams();
    const [author,setAuthor] = useState(null);
    const [title,setTitle] = useState(null);
    const [content,setContent] = useState(null);
    const [reply,setReply] = useState(null);

    const [refresh_,setRefresh_] = useState(false);

    const username = (localStorage.getItem("refresh") === null ? null : (decodeToken(localStorage.getItem("refresh")).username));

    const cursorStyle = {
        cursor: "pointer"
    }

    useEffect(()=>{
        customAxios.get(`/question/${id}`).then((response)=>{
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
    },[refresh_]);

    function delQuestion()
    {
        if(window.confirm("삭제하시겠어요?")) {
            customAxios.delete(`/user/question/delete/${id}`).then((response) => {
                if (response.data.code === 200) {
                    navigate("/question");
                } else {
                    alert("failed");
                }
            })
        }
    }

    function doneQuestion()
    {
        if(window.confirm("완료처리 하시겠어요?")) {
            customAxios.put(`user/question/done`, {author: author, id: id}).then((response) => {
                if (response.data.code === 200) {
                    alert("완료");
                } else {
                    alert("failed");
                }
            })
        }
    }

    return(
        <>
            <Container>
                <h1 className="text-black mt-5 p-3 rounded">{title}</h1>
                <div className="justify-content-between" style={{display: "flex"}}>
                    {
                        username === author
                            ?
                            (<div style={{display: "inline-block"}}>
                                <span className="p-lg-2 text-muted" style={cursorStyle} onClick={()=>{navigate(`/question/update/${id}`,{state: {author: author, title: title, content: content}})}}>수정</span>
                                <span className="p-lg-2 text-muted" style={cursorStyle} onClick={delQuestion}>삭제</span>
                                <span className="p-lg-2 text-muted" style={cursorStyle} onClick={doneQuestion}>완료</span>
                            </div>)
                            : (<></>)
                    }
                    <h6 style={{display: "inline-block"}} className="ps-3">작성자: {author}</h6>
                </div>
                <Row className="mt-7">
                    <Col lg={12} md={10} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <div dangerouslySetInnerHTML={{__html: content}}/>
                    </Col>
                </Row>
                <ReplyList id={id} reply={reply} refresh_={refresh_} setRefresh_={setRefresh_}/>
            </Container>
        </>
    );
}
export default QuestionDetail;