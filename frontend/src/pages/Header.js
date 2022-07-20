import React, {useContext, useState} from 'react';
import {Navbar, NavDropdown, Nav, Container, Button} from "react-bootstrap";
import {Token} from "../Context/Token/Token";

const config = {
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    },
};

function Header(){
    const {token} = useContext(Token)
    console.log(token);
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

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/tutorial">Tutorial</Nav.Link>
                        <Nav.Link href="/reference">Reference</Nav.Link>
                        <NavDropdown title="Exercise" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/exercise">전체 문제</NavDropdown.Item>
                            <NavDropdown.Item href="/exercise/tag">분류별 문제</NavDropdown.Item>
                            <NavDropdown.Item href="/exercise/level">난이도별 문제</NavDropdown.Item>
                        </NavDropdown>
                        {
                            token === null
                                ? (<Nav.Link href="/login">Login</Nav.Link>)
                                : (<></>)
                        }
                        {
                            token === null
                                ? (<Nav.Link href="/register">register</Nav.Link>)
                                : (<></>)
                        }
                        <NavDropdown title="information" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/info">사용자 정보</NavDropdown.Item>
                            <NavDropdown.Item href="/info/solved">시도한 문제</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
    );
}

export default Header;