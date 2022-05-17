import React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import LoginForm from "./Login/LoginForm";
import {Container} from "react-bootstrap";

//container -> 중앙으로 모아줌
function App() {
    return (
        <>
            <Header/>
            <main>
                <Container>
                <LoginForm/>
                </Container>
            </main>
            <Footer/>
        </>
    );
}

export default App;