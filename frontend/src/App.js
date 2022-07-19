import React from "react";
import Header from "./pages/Header";

import Footer from "./pages/Footer";
import AfterAuthEmailSent from "./pages/Register/AfterAuthEmailSent";

import {Route,Routes} from "react-router-dom";
import LoginForm from "./pages/Login/LoginForm";
import RegisterForm from "./pages/Register/RegisterForm";
import IdForgot from "./pages/IdPwdForgot/IdForgot";
import IdForgotGetId from "./pages/IdPwdForgot/IdForgotGetId";
import PwdForgot from "./pages/IdPwdForgot/PwdForgot";
import PwdForgotEmailSent from "./pages/IdPwdForgot/PwdForgotEmailSent";
import InfoMain from "./pages/UserInfo/InfoMain";
import PwdUpdate from "./pages/UserInfo/PwdUpdate";
import SolvedExercise from "./pages/UserInfo/SolvedExercise";
import Home from "./pages/Home/Home";
import Tutorial from "./pages/Tutorial/Tutorial";
import TutorialDetail from "./pages/Tutorial/TutorialDetail";
import Reference from "./pages/Reference/Reference";
import Exercise from "./pages/Exercise/Exercise";
import ExerciseByTag from "./pages/Exercise/ExerciseByTag";
import ExerciseDetail from "./pages/Exercise/ExerciseDetail";
import ExerciseByLevel from "./pages/Exercise/ExerciseByLevel";
import ExerciseAddForm from "./pages/Exercise/ExerciseAddForm";



//container -> 중앙으로 모아줌
function App() {
    return (
        <>
            <Header/>
            <main className="pt-5">
                    <Routes>
                        {/*home*/}
                        <Route index element={<Home />} />
                        <Route path="home" exact={true} element={<Home />}/>
                        {/*tutorial*/}
                        <Route path="tutorial" exact={true} element={<Tutorial/>}/>
                        <Route path="tutorial/detail" exact={true} element={<TutorialDetail/>}/>
                        {/*reference*/}
                        <Route path="reference" exact={true} element={<Reference/>}/>
                        {/*exercise*/}
                        <Route path="exercise" exact={true} element={<Exercise/>}/>
                        <Route path="exercise/tag" exact={true} element={<ExerciseByTag/>}/>
                        <Route path="exercise/level" exact={true} element={<ExerciseByLevel/>}/>
                        <Route path="exercise/:no" exact={true}  element={<ExerciseDetail/>}/>
                        <Route path="exercise/add" exact={true}  element={<ExerciseAddForm/>}/>
                        {/*login*/}
                        <Route path="login" exact={true} element={<LoginForm/>}/>
                        <Route path="register" exact={true} element={<RegisterForm/>}/>
                        <Route path="register/certification" exact={true} element={<AfterAuthEmailSent/>}/>
                        {/*idPwdForgot*/}
                        <Route path="idForgot" exact={true} element={<IdForgot/>}/>
                        <Route path="idForgot/getId" exact={true} element={<IdForgotGetId/>}/>
                        <Route path="pwdForgot" exact={true} element={<PwdForgot/>}/>
                        <Route path="pwdForgot/getPwd" exact={true} element={<PwdForgotEmailSent/>}/>
                        <Route path="info" exact={true} element={<InfoMain/>}/>
                        <Route path="info/updatePwd" exact={true} element={<PwdUpdate/>}/>
                        <Route path="info/solved" exact={true} element={<SolvedExercise/>}/>
                    </Routes>
            </main>
        </>
    );
}

export default App;