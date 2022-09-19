import { useEffect, useState } from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import { Button } from "react-bootstrap";
import TutorialQuizQuestionList from "./components/TutorialQuestionList";
import { decodeToken } from "react-jwt";
import { customAxios } from "../../Common/Modules/CustomAxios";

function TutorialQuiz() {
    const {id} = useParams();
    const location = useLocation();
    const role = (localStorage.getItem("refresh") === null ? null : (decodeToken(localStorage.getItem("refresh")).role));
    const [tutorialQuiz, setTutorialQuiz] = useState({
        id: "",
        name: "",
        tutorialQuizQuestions: []
    });
    const [loading,setLoading] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [correctList, setCorrectList] = useState([]);
    const navigate = useNavigate();
    const buttonStyle = { marginLeft:"5px", fontSize:"14px"}

    useEffect( () => {
        customAxios.get(`/tutorial/quiz/${id}`)
        .then((response) =>
        {
            if (response.data.code === 200)
            {
                setTutorialQuiz({...response.data.data});
            }
        })
        .catch((Error) =>
        {
            alert(Error.response.status + " error");
        })
    }, []);


    const checkIfPassedQuiz = (answerList) => {
        let check = false;
        answerList.forEach((elem)=>{
            check = elem;
        })
        return check;
    }
    
    const setAnswer = (e) => {        
        const number = e.target.name * 1 - 1;
        const choice = e.target.id * 1;        
        setAnswers([...answers.slice(0, number), choice, ...answers.slice(number + 1, 3)]);
    }
    const submitQuiz = (e) => {
        setLoading(true);
        e.preventDefault();
        if (answers.length === tutorialQuiz.tutorialQuizQuestions.length) {
            customAxios.post(`/tutorial/quiz/${id}`, {answers:answers})
            .then((response) =>
            {
                if (response.data.code === 200)
                {
                    setCorrectList([...response.data.data.correctList]);
                    alert(response.data.data.message);
                    if(checkIfPassedQuiz(response.data.data.correctList) === true)
                    {
                        let relationString = "";
                        location.state.relation.forEach((elem)=>{
                            relationString += elem.exerciseTag;
                            relationString += "_";
                        })
                        customAxios.get("/exercise/recommend",{params:{relations:relationString}}).then()
                    }
                }
            })
            .catch((Error) =>
            {
                alert(Error.response.status + " error");
            })
            .finally(() =>
            {
                setLoading(false);
            }
            )
        }
        else {
            alert("정답을 모두 체크해주세요");
            setLoading(false);
        }
    }
    const updateSub = () => {      
        navigate("/tutorial/quiz/updateForm", {state: {tutorialQuiz : tutorialQuiz}});
    }
    const deleteSub = () => {
        if(window.confirm("삭제하시겠어요?")) {
            customAxios.delete(`/tutorial/quiz/${tutorialQuiz.id}`)
            .then((response) =>
            {
                if (response.data.code === 200)
                {
                    alert(response.data.data);
                    navigate(-1);
                }
            })
            .catch((Error) =>
            {
                alert(Error.response.status + " error");
            })
        }
    }

    return (
        <>
            <div className="col-8 mx-auto m-3 p-2">
                <br/>
                <h1>{tutorialQuiz.name}</h1>
                {
                (role === "ROLE_ADMIN" || role === "ROLE_MANAGER") &&
                <div>
                    <Button variant="warning" style={buttonStyle} onClick={updateSub}>수정</Button>
                    <Button variant="danger" style={buttonStyle} onClick={deleteSub}>삭제</Button>
                </div>
                }
            </div>
            <div className="col-8 mx-auto border-top border-bottom m-3 p-2">
                <TutorialQuizQuestionList questions={tutorialQuiz.tutorialQuizQuestions} setAnswer={setAnswer} correctList={correctList}></TutorialQuizQuestionList>
            </div>
           <br/>
            <div className="col-8 mx-auto">
                    <Button disabled={loading} onClick={submitQuiz}>제출하기</Button>
            </div>
        </>
    );
}

export default TutorialQuiz;