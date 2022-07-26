import Form from 'react-bootstrap/Form';

function TutorialQuizQuestionList({questions, setAnswer, correctList}) {  
    let key = 0;
    console.log(correctList);
    const questionList = questions.map(
        question => {
            key++;
            let color = "";
            if (correctList[key-1] === true) { color = "green"; }
            else if (correctList[key-1] === false) { color = "red"; }
            
            return (
            <Form key={key}>
                <h3 style={{color:color}}>{question.title}</h3>
                <div key={key} className="mb-3">
                <Form.Check
                    label={question.choice1}
                    name={key}
                    type="radio"
                    id={1}
                    onChange={(e)=>setAnswer(e)}
                />
                <Form.Check
                    label={question.choice2}
                    name={key}
                    type="radio"
                    id={2}
                    onChange={(e)=>setAnswer(e)}
                />
                <Form.Check
                    label={question.choice3}
                    name={key}
                    type="radio"
                    id={3}
                    onChange={(e)=>setAnswer(e)}
                />
                <Form.Check
                    label={question.choice4}
                    name={key}
                    type="radio"
                    id={4}
                    onChange={(e)=>setAnswer(e)}
                />
                </div>
            </Form>
        )}
    )
        return (
            <>{questionList}</>
        )
}

export default TutorialQuizQuestionList;