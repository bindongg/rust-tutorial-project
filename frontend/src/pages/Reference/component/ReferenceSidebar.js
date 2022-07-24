import {NavLink} from "react-bootstrap";
import React from "react";

function ReferenceSidebar({titles}){

    const list = titles.map(title => (<li key = {title.number} ><NavLink href={"/reference/" + title.number}>{title.name}</NavLink></li>))
    return(
        <div id="sidebar-wrapper">
            <ul className="sidebar-nav">
                {list}
            </ul>
        </div>
    );
}

export default ReferenceSidebar;