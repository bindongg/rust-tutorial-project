import React, {useState} from "react";
import Header from "./pages/Header";

import Footer from "./pages/Footer";
import AfterAuthEmailSent from "./pages/Register/AfterAuthEmailSent";

import {Route,Routes} from "react-router-dom";
import LoginForm from "./pages/Login/LoginForm";
import RegisterForm from "./pages/Register/RegisterForm";
import IdForgot from "./pages/IdPwdForgot/IdForgot";
import IdForgotGetId from "./pages/IdPwdForgot/IdForgotGetId";
import PwdForgot from "./pages/IdPwdForgot/PwdForgot";
import InfoMain from "./pages/UserInfo/InfoMain";
import PwdUpdate from "./pages/UserInfo/PwdUpdate";
import SolvedExercise from "./pages/UserInfo/SolvedExercise";
import Home from "./pages/Home/Home";
import Reference from "./pages/Reference/Reference";
import Exercise from "./pages/Exercise/Exercise";
import ExerciseByTag from "./pages/Exercise/ExerciseByTag";
import ExerciseDetail from "./pages/Exercise/ExerciseDetail";
import ExerciseByLevel from "./pages/Exercise/ExerciseByLevel";
import ExerciseCreate from "./pages/Exercise/ExerciseCreate";
import ExerciseUpdate from "./pages/Exercise/ExerciseUpdate";
import Tutorial from "./pages/Tutorial/Tutorial";
import TutorialQuiz from "./pages/Tutorial/TutorialQuiz";
import TutorialSub from "./pages/Tutorial/TutorialSub";
import AddAdmin from "./pages/Tutorial/AddAdmin";
import AdminAuth from "./pages/Admin/AdminAuth";
import QuestionMain from "./pages/Question/QuestionMain";
import {Token} from "./Context/Token/Token";
import QuestionWrite from "./pages/Question/QuestionWrite";
import QuestionDetail from "./pages/Question/QuestionDetail";
import TutorialCreateForm from "./pages/Tutorial/TutorialCreateForm";
import TutorialUpdateForm from "./pages/Tutorial/TutorialUpdateForm";
import TutorialSubCreateForm from "./pages/Tutorial/TutorialSubCreateForm";
import TutorialSubUpdateForm from "./pages/Tutorial/TutorialSubUpdateForm";
import TutorialQuizCreateForm from "./pages/Tutorial/TutorialQuizCreateForm";
import TutorialQuizUpdateForm from "./pages/Tutorial/TutorialQuizUpdateForm";
import Compile from "./pages/Compile/Compile";
import ReferenceCreate from "./pages/Reference/ReferenceCreate";
import ReferenceDetail from "./pages/Reference/ReferenceDetail";
import ReferenceUpdate from "./pages/Reference/ReferenceUpdate";



//container -> 중앙으로 모아줌
function App() {
    const [token,setToken] = useState(localStorage.getItem("jwt"));
    return (
        <div>
            <Token.Provider value={{token,setToken}}>
            <Header/>
            <main className="pt-5">
                    <Routes>
                        {/*home*/}
                        <Route index element={<Home />} />
                        <Route path="home" exact={true} element={<Home />}/>
                        {/* compile */}
                        <Route path="compile" exact={true} element={<Compile/>}/>
                        {/*tutorial*/}
                        <Route path="tutorial" exact={true} element={<Tutorial/>}/>
                        <Route path="tutorial/:id/sub/:subId" exact={true} element={<TutorialSub/>}/>
                        <Route path="tutorial/quiz/:id" exact={true} element={<TutorialQuiz/>}/>
                        <Route path="tutorial/createForm" exact={true} element={<TutorialCreateForm/>}/>
                        <Route path="tutorial/updateForm" exact={true} element={<TutorialUpdateForm/>}/>
                        <Route path="tutorial/sub/createForm" exact={true} element={<TutorialSubCreateForm/>}/>
                        <Route path="tutorial/sub/updateForm" exact={true} element={<TutorialSubUpdateForm/>}/>
                        <Route path="tutorial/quiz/createForm" exact={true} element={<TutorialQuizCreateForm/>}/>
                        <Route path="tutorial/quiz/updateForm" exact={true} element={<TutorialQuizUpdateForm/>}/>
                        <Route path="addAdmin" exact={true} element={<AddAdmin/>}/>
                        {/*reference*/}
                        <Route path="reference" exact={true} element={<Reference/>}/>
                        <Route path="reference/create" exact={true} element={<ReferenceCreate/>}/>
                        <Route path="reference/:id" exact={true} element={<ReferenceDetail/>}/>
                        <Route path="reference/:id/update" exact={true} element={<ReferenceUpdate/>}/>
                        {/*exercise*/}
                        <Route path="exercise" exact={true} element={<Exercise/>}/>
                        <Route path="exercise/tag" exact={true} element={<ExerciseByTag/>}/>
                        <Route path="exercise/level" exact={true} element={<ExerciseByLevel/>}/>
                        <Route path="exercise/:id" exact={true}  element={<ExerciseDetail/>}/>
                        <Route path="exercise/add" exact={true}  element={<ExerciseCreate/>}/>
                        <Route path="exercise/:id/update" exact={true}  element={<ExerciseUpdate/>}/>
                        {/*question*/}
                        <Route path="/question" exact={true} element={<QuestionMain/>}/>
                        <Route path="/question/:id" exact={true} element={<QuestionDetail/>}/>
                        <Route path="/question/add" exact={true} element={<QuestionWrite/>}/>
                        {/*login*/}
                        <Route path="login" exact={true} element={<LoginForm/>}/>
                        <Route path="logout" exact={true}/>
                        <Route path="register" exact={true} element={<RegisterForm/>}/>
                        <Route path="register/certification" exact={true} element={<AfterAuthEmailSent/>}/>
                        {/*idPwdForgot*/}
                        <Route path="idForgot" exact={true} element={<IdForgot/>}/>
                        <Route path="idForgot/getId" exact={true} element={<IdForgotGetId/>}/>
                        <Route path="pwdForgot" exact={true} element={<PwdForgot/>}/>
                        <Route path="pwdForgot/getPwd" exact={true} element={<PwdForgot tEmailSent/>}/>
                        <Route path="info" exact={true} element={<InfoMain/>}/>
                        <Route path="info/updatePwd" exact={true} element={<PwdUpdate/>}/>
                        <Route path="info/solved" exact={true} element={<SolvedExercise/>}/>
                        {/*admin*/}
                        <Route path="admin/auth" exact={true} element={<AdminAuth/>}/>
                    </Routes>
            </main>
            </Token.Provider>
        </div>
    );
}

export default App;