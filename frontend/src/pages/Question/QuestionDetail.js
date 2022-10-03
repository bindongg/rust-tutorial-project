import {useEffect, useState} from "react";
import { useNavigate, useParams} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import {decodeToken} from "react-jwt";
import ReplyList from "./Reply/ReplyList";
import {customAxios} from "../../Common/Modules/CustomAxios";
import {QUESTION_TYPE} from "../../Common/Modules/Common";


function QuestionDetail()
{
    const navigate = useNavigate();

    const {id} = useParams();
    const [question,setQuestion] = useState({
        user: "",
        title: "",
        content: "",
        reply: [],
        questionType: "",
        exerciseId: ""
    });

    const [refresh_,setRefresh_] = useState(false);

    const username = (localStorage.getItem("refresh") === null ? null : (decodeToken(localStorage.getItem("refresh")).username));

    const cursorStyle = {
        cursor: "pointer"
    }

    useEffect(()=>{
        customAxios.get(`/question/${id}`).then((response)=>{
            if(response.data.code === 200)
            {
                setQuestion({...response.data.data});
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
            customAxios.put(`user/question/done`, {author: question.user.id, id: id}).then((response) => {
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
                <h1 className="text-black mt-5 p-3 rounded">{question.title}</h1>
                {
                    question.questionType === QUESTION_TYPE[1]
                        ? (<div className="ps-3 pb-3">{question.exerciseId}번 문제</div>)
                        : (<></>)
                }
                <div className="justify-content-between" style={{display: "flex"}}>
                    <h6 style={{display: "inline-block"}} className="ps-3">작성자: {question.user.id}</h6>
                    {
                        username === question.user.id
                            ?
                            (<div style={{display: "inline-block"}}>
                                <span className="p-lg-2 text-muted" style={cursorStyle} onClick={()=>{navigate(`/question/update/${id}`,
                                    {state: {author: question.user.id, title: question.title, content: question.content, questionType: question.questionType, exerciseId: question.exerciseId}}
                                )}}>수정</span>
                                <span className="p-lg-2 text-muted" style={cursorStyle} onClick={delQuestion}>삭제</span>
                                <span className="p-lg-2 text-muted" style={cursorStyle} onClick={doneQuestion}>완료</span>
                            </div>)
                            : (<></>)
                    }
                </div>
                <Row className="mt-7">
                    <Col lg={12} md={10} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <div dangerouslySetInnerHTML={{__html: question.content}}/>
                    </Col>
                </Row>
                <ReplyList id={id} reply={question.reply} refresh_={refresh_} setRefresh_={setRefresh_}/>
            </Container>
        </>
    );
}
export default QuestionDetail;