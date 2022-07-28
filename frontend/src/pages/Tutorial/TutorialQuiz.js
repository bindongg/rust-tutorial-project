import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import TutorialQuizQuestionList from "./components/TutorialQuestionList";

function TutorialQuiz() {
    const {id} = useLocation().state;
    const [tutorialQuiz, setTutorialQuiz] = useState({
        id: "",
        name: "",
        tutorialQuizQuestions: []
    });
    const headers = {
        'Content-Type' : 'application/json',
        'Authorization' : localStorage.getItem("jwt")
      }
    const [answers, setAnswers] = useState([]);
    const [correctList, setCorrectList] = useState([]);

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
            axios.post(`http://localhost:8080/tutorial/quiz/${id}/hdm`, {answers:answers},{headers : headers})
            .then(function (response) { 
                console.log(response);
                setCorrectList([...response.data.data.correctList]);
                alert(response.data.data.message);
            });
        }
        else {
            alert("정답을 모두 체크해주세요");
        }
    }

    return (
        <>
            <div className="col-8 mx-auto m-3 p-2">
                <br/>
                <h1>{tutorialQuiz.name}</h1>
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