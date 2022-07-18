import React from "react";
import Header from "./Components/Header";

import Footer from "./Components/Footer";
import AfterAuthEmailSent from "./Components/Register/AfterAuthEmailSent";

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
import ExerciseAddForm from "./Components/Exercise/ExerciseAddForm";



//container -> 중앙으로 모아줌
function App() {
    return (
        <>
            <Header/>
            <main className="pt-5">
                    <Routes>
                        {/*home*/}
                        <Route index element={<HomePage />} />
                        <Route path="home" exact={true} element={<HomePage/>}/>
                        {/*tutorial*/}
                        <Route path="tutorial" exact={true} element={<TutorialPage/>}/>
                        <Route path="tutorial/detail" exact={true} element={<TutorialDetailPage/>}/>
                        {/*reference*/}
                        <Route path="reference" exact={true} element={<ReferencePage/>}/>
                        {/*exercise*/}
                        <Route path="exercise" exact={true} element={<ExercisePage/>}/>
                        <Route path="exercise/tag" exact={true} element={<ExerciseByTagPage/>}/>
                        <Route path="exercise/level" exact={true} element={<ExerciseByLevelPage/>}/>
                        <Route path="exercise/:no" exact={true}  element={<ExerciseDetailPage/>}/>
                        <Route path="exercise/add" exact={true}  element={<ExerciseAddForm/>}/>
                        {/*login*/}
                        <Route path="login" exact={true} element={<LoginPage/>}/>
                        <Route path="register" exact={true} element={<RegisterPage/>}/>
                        <Route path="register/certification" exact={true} element={<AfterAuthEmailSent/>}/>
                        {/*idPwdForgot*/}
                        <Route path="idForgot" exact={true} element={<IdForgotPage/>}/>
                        <Route path="idForgot/getId" exact={true} element={<IdForgotGetIdPage/>}/>
                        <Route path="pwdForgot" exact={true} element={<PwdForgotPage/>}/>
                        <Route path="pwdForgot/getPwd" exact={true} element={<PwdForgotEmailSentPage/>}/>
                        <Route path="info" exact={true} element={<InfoMainPage/>}/>
                        <Route path="info/updatePwd" exact={true} element={<PwdUpdatePage/>}/>
                        <Route path="info/solved" exact={true} element={<SolvedExercisePage/>}/>
                    </Routes>
            </main>
        </>
    );
}

export default App;