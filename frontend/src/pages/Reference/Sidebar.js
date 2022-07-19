import React from "react";
import "./sidebar.css";
import {NavLink} from "react-bootstrap";

function Sidebar() {
    return (
        <>
            <div className="d-flex min-vh-100">
                <div id="sidebar" className="d-none d-sm-none d-md-none d-lg-block d-xl-block d-xxl-block">
                    <div id="sidebar-wrapper" className="min-vh-100">
                        <ul className="list-unstyled components">
                            <li className="navbar-item">
                                <NavLink href="#" className="nav-link">Home</NavLink>
                            </li>
                            <li className="navbar-item">
                                <NavLink href="#" className="nav-link">About</NavLink>
                            </li>
                            <li className="navbar-item">
                                <NavLink href="#" className="nav-link">Terms</NavLink>
                            </li>
                            <li className="navbar-item">
                                <NavLink href="#" className="nav-link">Terms</NavLink>
                            </li>
                            <li className="navbar-item">
                                <NavLink href="#" className="nav-link">Terms</NavLink>
                            </li>
                            <li className="navbar-item">
                                <NavLink href="#" className="nav-link">Terms</NavLink>
                            </li>
                            <li className="navbar-item">
                                <NavLink href="#" className="nav-link">Terms</NavLink>
                            </li>
                            <li className="navbar-item">
                                <NavLink href="#" className="nav-link">Terms</NavLink>
                            </li>
                            <li className="navbar-item">
                                <NavLink href="#" className="nav-link">Terms</NavLink>
                            </li>
                            <li className="navbar-item">
                                <NavLink href="#" className="nav-link">Terms</NavLink>
                            </li>
                            <li className="navbar-item">
                                <NavLink href="#" className="nav-link">Terms</NavLink>
                            </li>
                            <li className="navbar-item">
                                <NavLink href="#" className="nav-link">Terms</NavLink>
                            </li>
                            <li className="navbar-item">
                                <NavLink href="#" className="nav-link">Terms</NavLink>
                            </li>
                            <li className="navbar-item">
                                <NavLink href="#" className="nav-link">Terms</NavLink>
                            </li>
                            <li className="navbar-item">
                                <NavLink href="#" className="nav-link">Terms</NavLink>
                            </li>
                            <li className="navbar-item">
                                <NavLink href="#" className="nav-link">Terms</NavLink>
                            </li>
                            <li className="navbar-item">
                                <NavLink href="#" className="nav-link">Terms</NavLink>
                            </li>
                            <li className="navbar-item">
                                <NavLink href="#" className="nav-link">Terms</NavLink>
                            </li>
                            <li className="navbar-item">
                                <NavLink href="#" className="nav-link">Terms</NavLink>
                            </li>
                            <li className="navbar-item">
                                <NavLink href="#" className="nav-link">Terms</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <br/>
            </div>
        </>
    );
}

export default Sidebar;