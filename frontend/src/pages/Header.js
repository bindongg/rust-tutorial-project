import React, {useContext} from 'react';
import {Navbar, NavDropdown, Nav, Container} from "react-bootstrap";
import {Token} from "../Context/Token/Token";
import {decodeToken} from "react-jwt";
import axios from "axios";
import {NavLink, useNavigate} from "react-router-dom";
import {logout} from "../Common/Modules/Common";
import './Header.css';

const config = {
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    },
};

function Header(){
    const {token,setToken} = useContext(Token);
    const username = (token === null ? null : (decodeToken(token).username));
    const role = (token === null ? null : (decodeToken(token).role));

    const navigate = useNavigate();

    function Logout()
    {
        axios.post("http://localhost:8080/logout",null, {headers: {authorization: token}})
            .then(
                (response)=>{
                    if(response.status === 200)
                    {
                        logout(token,setToken,navigate);
                    }
                }
            )
            .catch(
                (Error)=> {
                    alert(Error.response.status+" error");
                }
            )
    }

    return (
            <Navbar className="fixed-top" bg="light">                
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src="rust-logo-64blk.png"
                            width="40"
                            height="40"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <NavLink className="nav-link" to="/tutorial">Tutorial</NavLink>
                        <NavLink className="nav-link" to="/reference">Reference</NavLink>
                        <NavDropdown title="Exercise" id="basic-nav-dropdown">
                            <NavDropdown.Item><NavLink className="nav-link" to="/exercise">전체 문제</NavLink></NavDropdown.Item>
                            <NavDropdown.Item><NavLink className="nav-link" to="/exercise/tag">분류별 문제</NavLink></NavDropdown.Item>
                            <NavDropdown.Item><NavLink className="nav-link" to="/exercise/level">난이도별 문제</NavLink></NavDropdown.Item>
                        </NavDropdown>
                        <NavLink className="nav-link" to="/question">QnA</NavLink>
                        <NavLink className="nav-link" to="/compile">Online Compiler</NavLink>
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
                                        <NavDropdown.Item href="/info">사용자 정보</NavDropdown.Item>
                                        <NavDropdown.Item href="/info/solved">시도한 문제</NavDropdown.Item>
                                        { //여기는 일부러 냅둠
                                            role === "ROLE_MANAGER" || role === "ROLE_ADMIN"
                                                ? (<NavDropdown.Item href="#">manager</NavDropdown.Item>)
                                                : (<></>)
                                        }
                                        {
                                            role === "ROLE_ADMIN"
                                                ? (<NavDropdown.Item href="/admin/auth">admin</NavDropdown.Item>)
                                                : (<></>)
                                        }
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={Logout}>logout</NavDropdown.Item>
                                    </NavDropdown>)
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    );
}

export default Header;