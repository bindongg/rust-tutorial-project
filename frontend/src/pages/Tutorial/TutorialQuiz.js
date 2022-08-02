import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import TutorialQuizQuestionList from "./components/TutorialQuestionList";
import { Token } from "../../Context/Token/Token";

function TutorialQuiz() {
    const {id} = useParams();    
    const {token,setToken} = useContext(Token);
    const [tutorialQuiz, setTutorialQuiz] = useState({
        id: "",
        name: "",
        tutorialQuizQuestions: []
    });
    const headers = {
        'Content-Type' : 'application/json',
        'Authorization' : token
      }
    const [answers, setAnswers] = useState([]);
    const [correctList, setCorrectList] = useState([]);
    const navigate = useNavigate();
    const buttonStyle = { marginLeft:"5px", fontSize:"14px"}

    useEffect( () => {
    const getTutorialQuiz = async () => {
        const tutorialQuiz = await axios.get(`http://localhost:8080/tutorial/quiz/${id}`, {headers : headers});        
        setTutorialQuiz({...tutorialQuiz.data.data});
    }    
    getTutorialQuiz();
    }, []);

    
    const setAnswer = (e) => {        
        const number = e.target.name * 1 - 1;
        const choice = e.target.id * 1;        
        setAnswers([...answers.slice(0, number), choice, ...answers.slice(number + 1, 3)]);
    }
    const submitQuiz = (e) => {
        e.preventDefault();
        if (answers.length === tutorialQuiz.tutorialQuizQuestions.length) {
            axios.post(`http://localhost:8080/tutorial/quiz/${id}`, {answers:answers},{headers : headers})
            .then(function (response) {                 
                setCorrectList([...response.data.data.correctList]);
                alert(response.data.data.message);
            });
        }
        else {
            alert("정답을 모두 체크해주세요");
        }
    }
    const updateSub = () => {      
        navigate("/tutorial/quiz/updateForm", {state: {tutorialQuiz : tutorialQuiz}});
    }
    const deleteSub = () => {
        axios.delete(`http://localhost:8080/tutorial/quiz/${tutorialQuiz.id}`, {headers : headers}
        ).then(function(response) {
            alert(response.data.data);
            navigate(-1);
        })
    }

    return (
        <>
            <div className="col-8 mx-auto m-3 p-2">
                <br/>
                <h1>{tutorialQuiz.name}</h1>
                <div>
                    <Button variant="warning" style={buttonStyle} onClick={updateSub}>수정</Button>
                    <Button variant="danger" style={buttonStyle} onClick={deleteSub}>삭제</Button>
                </div>
            </div>
            <div className="col-8 mx-auto border-top border-bottom m-3 p-2">
                <TutorialQuizQuestionList questions={tutorialQuiz.tutorialQuizQuestions} setAnswer={setAnswer} correctList={correctList}></TutorialQuizQuestionList>
            </div>
           <br/>
            <div className="col-8 mx-auto">
                    <Button onClick={submitQuiz}>제출하기</Button>
            </div>
        </>
    );
}

export default TutorialQuiz;