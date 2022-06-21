import React from 'react';
import {Navbar, NavDropdown, Nav, Container} from "react-bootstrap";

function Header(){
    return (
            <Navbar className="fixed-top" bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src="/logo192.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                </Container>
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
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/register">Register</Nav.Link>
                        <NavDropdown title="information" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/info">사용자 정보</NavDropdown.Item>
                            <NavDropdown.Item href="/info/solved">시도한 문제</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
    );
}

export default Header;