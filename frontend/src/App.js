import React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
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
import SolvedExercisePage from "./UserInfoPage/SolvedExercisePage";
import HomePage from "./HomePage/HomePage";
import TutorialPage from "./TutorialPage/TutorialPage";
import TutorialDetailPage from "./TutorialPage/TutorialDetailPage";
import ReferencePage from "./ReferencePage/ReferencePage";
import ExercisePage from "./ExercisePage/ExercisePage";
import ExerciseByTagPage from "./ExercisePage/ExerciseByTagPage";
import ExerciseDetailPage from "./ExercisePage/ExerciseDetailPage";
import ExerciseByLevelPage from "./ExercisePage/ExerciseByLevelPage";



//container -> 중앙으로 모아줌
function App() {
    return (
        <>
            <Header/>
            <main className="pt-5">
                    <Routes id="home">
                        <Route path="home" exact={true} element={<HomePage/>}/>
                    </Routes>
                    <Routes id="tutorial">
                        <Route path="tutorial" exact={true} element={<TutorialPage/>}/>
                        <Route path="tutorial/detail" exact={true} element={<TutorialDetailPage/>}/>
                    </Routes>
                    <Routes id="reference">
                        <Route path="reference" exact={true} element={<ReferencePage/>}/>
                    </Routes>
                    <Routes id="exercise">
                        <Route path="exercise" exact={true} element={<ExercisePage/>}/>
                        <Route path="exercise/tag" exact={true} element={<ExerciseByTagPage/>}/>
                        <Route path="exercise/level" exact={true} element={<ExerciseByLevelPage/>}/>
                        <Route path="exercise/1" exact={true} element={<ExerciseDetailPage/>}/>
                    </Routes>
                    <Routes id="login">
                        <Route path="login" exact={true} element={<LoginPage/>}/>
                    </Routes>
                    <Routes id="register">
                        <Route path="register" exact={true} element={<RegisterPage/>}/>
                        <Route path="register/certification" exact={true} element={<EmailCertification/>}/>
                    </Routes>
                    <Routes id="idPwdForgot">
                        <Route path="idForgot" exact={true} element={<IdForgotPage/>}/>
                        <Route path="idForgot/getId" exact={true} element={<IdForgotGetIdPage/>}/>
                        <Route path="pwdForgot" exact={true} element={<PwdForgotPage/>}/>
                        <Route path="pwdForgot/getPwd" exact={true} element={<PwdForgotEmailSentPage/>}/>
                    </Routes>
                    <Routes id="userInfo">
                        <Route path="info" exact={true} element={<InfoMainPage/>}/>
                        <Route path="info/updatePwd" exact={true} element={<PwdUpdatePage/>}/>
                        <Route path="info/solved" exact={true} element={<SolvedExercisePage/>}/>
                    </Routes>
            </main>
        </>
    );
}

export default App;