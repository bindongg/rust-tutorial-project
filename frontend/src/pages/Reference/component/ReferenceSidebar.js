import {NavLink} from "react-router-dom";
import React from "react";

function ReferenceSidebar({titles}){
    if(titles){
        const list = titles.map(title => (<li key = {title.id} ><NavLink className="nav-link" to={"/reference/" + title.id} state={titles} >{title.name}</NavLink></li>))
        return(
            <div id="sidebar-wrapper">
                <ul className="sidebar-nav">
                    {list}
                </ul>
            </div>
        );
    }

}

export default ReferenceSidebar;