import React, {useContext, useEffect, useState} from 'react';
import {Navbar, NavDropdown, Nav, Container} from "react-bootstrap";
import {Token} from "../Context/Token/Token";
import {decodeToken,isExpired} from "react-jwt";
import axios from "axios";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {logout, logout_} from "../Common/Modules/Common";
import './Header.css';
import { IP } from '../Context/IP';
import {Refresh} from "../Context/Token/Refresh";

const config = {
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    },
};

function Header(){
    const {token,setToken} = useContext(Token);
    const {refresh,setRefresh} = useContext(Refresh);
    const ip = useContext(IP);
    const username = (token === null ? null : (decodeToken(token).username));
    const role = (token === null ? null : (decodeToken(token).role));

    const navigate = useNavigate();

    function Logout()
    {
        logout_(token,setToken,setRefresh,navigate,axios);
        /*axios.post(`http://${ip}:8080/logout`,null, {headers: {authorization: token}})
            .then(
                (response)=>{
                    if(response.status === 200)
                    {
                        logout(token,setToken,setRefresh,navigate);
                    }
                }
            )
            .catch(
                (Error)=> {
                    alert(Error.response.status+" error");
                }
            )*/
    }

    return (
            <Navbar className="fixed-top" bg="light">                
                <Container>
                    <NavLink className="navbar-brand" to="/">
                        <img
                            src="rust-logo-64blk.png"
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
                            <NavLink className={"nav-link"} to="/exercise/level">QnA</NavLink>
                        </NavDropdown>
                        <NavLink className={"nav-link"} to="/question">QnA</NavLink>
                        <NavLink className={"nav-link"} to="/compile">Online Compiler</NavLink>
                    </Nav>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {
                                token === null
                                    ? (<NavLink className="nav-link" to="/login">Login</NavLink>)
                                    : (<></>)
                            }
                            {
                                token === null
                                    ? (<NavLink className="nav-link" to="/register">Register</NavLink>)
                                    : (<></>)
                            }
                            {
                                token === null
                                    ? (<></>)
                                    : (<NavDropdown title={username}>
                                        <NavLink className={"nav-link"} to="/info">사용자 정보</NavLink> 
                                        <NavLink className={"nav-link"} to="/info/solved">시도한 문제</NavLink>
                                        {
                                            role === "ROLE_MANAGER" || role === "ROLE_ADMIN"
                                                ? (<NavLink className={"nav-link"} to="#">manager</NavLink>)
                                                : (<></>)
                                        }
                                        {
                                            role === "ROLE_ADMIN"
                                                ? (<NavLink className={"nav-link"} to="/admin/auth">admin</NavLink>)
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