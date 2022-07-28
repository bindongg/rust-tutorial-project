import { NavLink } from "react-router-dom";



function TutorialSubList({tutorialSubs}) {    
    let key = 0;
    const list = tutorialSubs.map(
        tutorialSub => {
            ++key;
            const url = `/tutorial/sub/${tutorialSub.id}`;
            return ( <NavLink key={key} className="nav-link" to={url} state={{id : tutorialSub.id}} >{tutorialSub.name}</NavLink> )
        }
    )

    return (
        <>{list}</>
    )
}

export default TutorialSubList;