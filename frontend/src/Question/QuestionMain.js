import Button from "react-bootstrap/Button";
import {NavLink, Table} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {Token} from "../Context/Token/Token";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {logout} from "../Common/Modules/Common";
import Page from "../Common/Page/Page";

function QuestionMain()
{
    const {token,setToken} = useContext(Token);
    const navigate = useNavigate();

    const [questions,setQuestions] = useState(null);

    const [total,setTotal] = useState(0);

    const [recPerPage] = useState(15);

    const [page,setPage] = useState(0);

    useEffect(()=>{
        axios.get("http://localhost:8080/question",{params: {page: page, size: recPerPage}})
            .then((response)=>{
                if(response.data.code === 200)
                {
                    setTotal(response.data.total);
                    setQuestions([...response.data.data]);
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
    },[page]);

    function write()
    {
        navigate("/question/add");
    }


    return(
        <>
            <div className="col-10 mx-auto pt-5">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className="col-1">번호</th>
                            <th className="col-5">제목</th>
                            <th className="col-2">작성자</th>
                            <th className="col-1">완료</th>
                        </tr>
                    </thead>
                    {
                        questions === null
                            ?    (<tbody><tr><td colSpan={11}>질문이 없습니다</td></tr></tbody>)
                            :    (<tbody>
                                    {
                                        questions.map((question,index)=>
                                            (<tr key={index}>
                                                <td>{question.id}</td>
                                                <td onClick={()=>{
                                                    navigate("/question/"+question.id, {state: {title: question.title, content: question.content}})
                                                }}>{question.title}</td>
                                                <td>{question.user.id}</td>
                                                <td>{question.done}</td>
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