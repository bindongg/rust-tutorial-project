import React, {useContext} from 'react';
import {Navbar, NavDropdown, Nav, Container, NavLink} from "react-bootstrap";
import {Token} from "../Context/Token/Token";
import {decodeToken} from "react-jwt";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {logout} from "../Common/Modules/Common";

const config = {
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    },
};

function Header(){
    const {token,setToken} = useContext(Token)
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
            <Navbar className="fixed-top" bg="light" expand="lg">
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
                        <Nav.Link href="/tutorial">Tutorial</Nav.Link>
                        <Nav.Link href="/reference">Reference</Nav.Link>
                        <NavDropdown title="Exercise" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/exercise">전체 문제</NavDropdown.Item>
                            <NavDropdown.Item href="/exercise/tag">분류별 문제</NavDropdown.Item>
                            <NavDropdown.Item href="/exercise/level">난이도별 문제</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/#">Question</Nav.Link>
                    </Nav>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {
                                token === null
                                    ? (<Nav.Link href="/login">Login</Nav.Link>)
                                    : (<></>)
                            }
                            {
                                token === null
                                    ? (<Nav.Link href="/register">Register</Nav.Link>)
                                    : (<></>)
                            }
                            {
                                token === null
                                    ? (<></>)
                                    : (<NavDropdown title={username}>
                                        <NavDropdown.Item href="/info">사용자 정보</NavDropdown.Item>
                                        <NavDropdown.Item href="/info/solved">시도한 문제</NavDropdown.Item>
                                        {
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