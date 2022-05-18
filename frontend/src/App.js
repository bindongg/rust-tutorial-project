import React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import LoginForm from "./Login/LoginForm";
import {Container} from "react-bootstrap";
import RegisterForm from "./Register/RegisterForm";
import PwdForgot from "./Login/PwdForgot";
import IdForgot from "./Login/IdForgot";

//container -> 중앙으로 모아줌
function App() {
    return (
        <>
            <Header/>
            <main>
                <Container>
                <PwdForgot/>
                </Container>
            </main>
            <Footer/>
        </>
    );
}

export default App;