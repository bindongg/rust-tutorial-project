import React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import {Container} from "react-bootstrap";
import EmailCertification from "./Components/Register/EmailCertification";
import {Route,Routes} from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import RegisterPage from "./RegisterPage/RegisterPage";
import IdForgotPage from "./IdPwdForgotPage/IdForgotPage";
import IdForgotGetIdPage from "./IdPwdForgotPage/IdForgotGetIdPage";
import PwdForgotPage from "./IdPwdForgotPage/PwdForgotPage";
import PwdForgotEmailSentPage from "./IdPwdForgotPage/PwdForgotEmailSentPage";
import InfoMainPage from "./UserInfoPage/InfoMainPage";
import PwdUpdatePage from "./UserInfoPage/PwdUpdatePage";
import SolvedExerPage from "./UserInfoPage/SolvedExerPage";

//container -> 중앙으로 모아줌
function App() {
    return (
        <>
            <Header/>
            <main>
                <Container>
                    <Routes id="home">

                    </Routes>
                    <Routes id="login">
                        <Route path="/login" exact={true} element={<LoginPage/>}/>
                    </Routes>
                    <Routes id="register">
                        <Route path="/register" exact={true} element={<RegisterPage/>}/>
                        <Route path="/register/certification" exact={true} element={<EmailCertification/>}/>
                    </Routes>
                    <Routes id="idPwdForgot">
                        <Route path="/idForgot" exact={true} element={<IdForgotPage/>}/>
                        <Route path="/idForgot/getId" exact={true} element={<IdForgotGetIdPage/>}/>
                        <Route path="/pwdForgot" exact={true} element={<PwdForgotPage/>}/>
                        <Route path="/pwdForgot/getPwd" exact={true} element={<PwdForgotEmailSentPage/>}/>
                    </Routes>
                    <Routes id="userInfo">
                        <Route path="/info" exact={true} element={<InfoMainPage/>}/>
                        <Route path="/info/updatePwd" exact={true} element={<PwdUpdatePage/>}/>
                        <Route path="/info/solved" exact={true} element={<SolvedExerPage/>}/>
                    </Routes>
                </Container>
            </main>
            <Footer/>
        </>
    );
}

export default App;