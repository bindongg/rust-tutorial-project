import { NavLink } from "react-router-dom";



function TutorialSubList({tutorialSubs, id}) {    
    let key = 0;
    const list = tutorialSubs.map(
        tutorialSub => {
            ++key;
            const url = `/tutorial/${id}/sub/${tutorialSub.id}`;
            return ( <NavLink key={key} className="nav-link" to={url} >{tutorialSub.number}. {tutorialSub.name}</NavLink> )
        }
    )

    return (
        <>{list}</>
    )
}

export default TutorialSubList;