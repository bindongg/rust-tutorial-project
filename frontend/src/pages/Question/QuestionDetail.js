import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
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
        customAxios.delete(`/user/question/delete/${id}`).then((response)=>{
            if(response.data.code === 200)
            {
                navigate("/question");
            }
            else
            {
                alert("failed");
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
                <ReplyList id={id} reply={reply} refresh_={refresh_} setRefresh_={setRefresh_}/>
            </Container>
        </>
    );
}
export default QuestionDetail;