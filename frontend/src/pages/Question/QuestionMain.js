import Button from "react-bootstrap/Button";
import {Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Page from "../../Common/Page/Page";
import {customAxios} from "../../Common/Modules/CustomAxios";
import {QUESTION_TYPE} from "../../Common/Modules/Common";

function QuestionMain()
{
    const navigate = useNavigate();

    const [questions,setQuestions] = useState([]);

    const [total,setTotal] = useState(0);

    const [recPerPage] = useState(15);

    const [page,setPage] = useState(0);

    useEffect(()=>{
        customAxios.get("/question",{params: {page: page, size: recPerPage}}).then((response)=>{
            if(response.data.code === 200)
            {
                setTotal(response.data.total);
                setQuestions(response.data.data);
            }
            else
            {
                alert("failed");
            }
        })
    },[page]);

    function write()
    {
        navigate("/question/add");
    }

    function getCnt(reply)
    {
        let cnt = 0;
        reply.map((reply)=>{cnt = cnt + parseInt(reply.subReply.length)})
        return cnt;
    }


    return(
        <>
            <div className="col-10 mx-auto pt-5">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className="col-1">번호</th>
                            <th className="col-5">제목</th>
                            <th className="col-1">카테고리</th>
                            <th className="col-1">날짜</th>
                            <th className="col-1">작성자</th>
                            <th className="col-1">완료</th>
                        </tr>
                    </thead>
                    {
                        questions.length === 0
                            ?    (<tbody><tr><td colSpan={11}>질문이 없습니다</td></tr></tbody>)
                            :    (<tbody>
                                    {
                                        questions.map((question,index)=>(<tr key={index}>
                                                <td>{question.id}</td>
                                                <td><Link to={`/question/${question.id}`} style={{color: "black", textDecorationLine: "none"}}>{question.title}&nbsp;[{question.reply.length + getCnt(question.reply)}]</Link></td>
                                                <td>{question.questionType}{question.questionType === QUESTION_TYPE[1] ? (<Link to={`/exercise/${question.exerciseId}`} >{'/' + question.exerciseId + '번 문제'}</Link>) : ""}</td>
                                                <td>{question.createDate.substring(0,10) + " " + question.createDate.substring(11,16)}</td>
                                                <td>{question.user.id}</td>
                                                <td>{question.done === true ? "✔" : ""}</td>
                                            </tr>)
                                        )
                                    }
                                </tbody>)
                    }
                </Table>
                <Page page={page} setPage={setPage} total={total} recPerPage={recPerPage}/>
                <Button variant="secondary" onClick={write}>쓰기</Button>
            </div>
        </>
    );
}

export default QuestionMain;