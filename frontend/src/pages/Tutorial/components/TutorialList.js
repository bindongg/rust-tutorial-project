import Accordion from "react-bootstrap/Accordion";
import { NavLink } from "react-router-dom";
import TutorialSubList from "./TutorialSubList";


function TutorialList({tutorials}) {
    let key = tutorials.length;
    console.log(tutorials);
    const list = tutorials.map(
        tutorial => {
            key--;            
            return (
            <Accordion.Item eventKey={key} key={key}>
                <Accordion.Header>{tutorial.name}</Accordion.Header> 
                <Accordion.Body>
                    <TutorialSubList tutorialSubs={tutorial.tutorialSubs}/>
                    {tutorial.tutorialQuiz &&                    
                    <NavLink className="nav-link" to={`/tutorial/quiz/${tutorial.number}`} state={{id:tutorial.id}}>{tutorial.tutorialQuiz.name}</NavLink>
                    }
                </Accordion.Body>
            </Accordion.Item>        
        )} 
    )
    
    
    return (<>
        {list}
        </>
    )
}

export default TutorialList;