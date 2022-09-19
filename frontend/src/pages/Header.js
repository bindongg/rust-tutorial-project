import React, { useEffect, useState} from 'react';
import {Navbar, NavDropdown, Nav, Container} from "react-bootstrap";
import {decodeToken, isExpired} from "react-jwt";
import { NavLink, useNavigate} from "react-router-dom";
import {customAxios} from "../Common/Modules/CustomAxios";
import './Header.css'


function Header(){
    const [username,setUsername] = useState("");
    const role = (localStorage.getItem("refresh") === null ? null : (decodeToken(localStorage.getItem("refresh")).role));

    useEffect(()=>{
        if(isExpired(localStorage.getItem("refresh")) === false)
        {
            setUsername(decodeToken(localStorage.getItem("refresh")).username);
        }
        else
        {
            localStorage.clear();
        }
    },[localStorage.getItem("refresh"),isExpired(localStorage.getItem("refresh"))])

    const navigate = useNavigate();

    function Logout()
    {
        customAxios.post("/logout")
            .then((response)=>{
                if(response.status === 200)
                {
                    localStorage.clear();
                    navigate("/login");
                }
                else
                {
                    alert("failed");
                }
            })
    }

    return (
            <Navbar className="fixed-top" bg="light">                
                <Container>
                    <NavLink className="navbar-brand" to="/">
                        <img
                            src={"/rust-logo-64blk.png"}
                            width="40"
                            height="40"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </NavLink>
                    <Nav className="me-auto">

                        <NavLink className={"nav-link"} to="/tutorial">Tutorial</NavLink>
                        <NavLink className={"nav-link"} to="/reference">Reference</NavLink>
                        <NavDropdown title="Exercise" id="basic-nav-dropdown">
                            <NavLink className={"nav-link"} to="/exercise">전체 문제</NavLink>
                            <NavLink className={"nav-link"} to="/exercise/tag">분류별 문제</NavLink>
                            <NavLink className={"nav-link"} to="/exercise/level">난이도별 문제</NavLink>
                        </NavDropdown>
                        <NavLink className={"nav-link"} to="/question">QnA</NavLink>
                        <NavLink className={"nav-link"} to="/compile">Online Compiler</NavLink>
                    </Nav>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {
                                isExpired(localStorage.getItem("refresh")) === true
                                    ? (<NavLink className="nav-link" to="/login">Login</NavLink>)
                                    : (<></>)
                            }
                            {
                                isExpired(localStorage.getItem("refresh")) === true
                                    ? (<NavLink className="nav-link" to="/register">Register</NavLink>)
                                    : (<></>)
                            }
                            {
                                isExpired(localStorage.getItem("refresh")) === true
                                    ? (<></>)
                                    : (<NavDropdown title={username}>
                                        <NavLink className={"nav-link"} to="/info">사용자 정보</NavLink> 
                                        <NavLink className={"nav-link"} to="/info/solved">시도한 문제</NavLink>
                                        {
                                            role === "ROLE_MANAGER" || role === "ROLE_ADMIN"
                                                ? (<NavLink className={"nav-link"} to="/admin/search">진도 및 문제 체크</NavLink>)
                                                : (<></>)
                                        }
                                        {
                                            role === "ROLE_ADMIN"
                                                ? (<NavLink className={"nav-link"} to="/admin/auth">권한 부여</NavLink>)
                                                : (<></>)
                                        }
                                        <NavDropdown.Divider />                                        
                                        <NavLink className={"nav-link"} to="#" onClick={e => Logout(e)}>logout</NavLink>
                                    </NavDropdown>)
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    );
}

export default Header;