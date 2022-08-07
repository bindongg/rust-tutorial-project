import {NavLink} from "react-router-dom";
import React from "react";

function ReferenceSidebar({titles}){

    const list = titles.map(title => (<li key = {title.number} ><NavLink className="nav-link" to={"/reference/" + title.number}>{title.name}</NavLink></li>))
    return(
        <div id="sidebar-wrapper">
            <ul className="sidebar-nav">
                {list}
            </ul>
        </div>
    );
}

export default ReferenceSidebar;