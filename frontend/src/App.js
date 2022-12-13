import React from "react";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import AfterAuthEmailSent from "./pages/Register/AfterAuthEmailSent";
import {Route, Routes} from "react-router-dom";
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
import AdminAuth from "./pages/Admin/AdminAuth";
import UserSearchPage from "./pages/Admin/UserSearchPage";
import UserInfoPage from "./pages/Admin/UserInfoPage";
import QuestionMain from "./pages/Question/QuestionMain";
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
import QuestionUpdate from "./pages/Question/QuestionUpdate";
import AboutRust from "./pages/AboutRust/AboutRust";
import AboutRustUpdate from "./pages/AboutRust/AboutRustUpdate";
import AboutRustDetail from "./pages/AboutRust/AboutRustDetail";
import Performance from "./pages/AboutRust/Performance";
import AuthConfirm from "./pages/Register/AuthConfirm";
import QuestionNotice from "./pages/Question/QuestionNotice";
import QuestionExercise from "./pages/Question/QuestionExercise";
import QuestionFree from "./pages/Question/QuestionFree";
import PerformanceUpdate from "./pages/AboutRust/PerformanceUpdate";

function App() {
    return (
        <div>
            <Header/>
            <main>
                    <Routes>
                        {/*home*/}
                        <Route index element={<Home />} />
                        <Route path="home" exact={true} element={<Home />}/>
                        {/* compile */}
                        <Route path="compile" exact={true} element={<Compile/>}/>
                        {/*AboutRust*/}
                        <Route path="aboutRust" exact={true} element={<AboutRust/>}/>
                        <Route path="aboutRust/performance" exact={true} element={<Performance/>}/>
                        <Route path="aboutRust/performance/updateForm" exact={true} element={<PerformanceUpdate/>}/>
                        <Route path="aboutRust/:aboutType" exact={true} element={<AboutRustDetail/>}/>
                        <Route path="aboutRust/:aboutType/updateForm" exact={true} element={<AboutRustUpdate/>}/>
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
                        {/*reference*/}
                        <Route path="reference" exact={true} element={<Reference/>}/>
                        <Route path="reference/create" exact={true} element={<ReferenceCreate/>}/>
                        <Route path="reference/:id" exact={true} element={<ReferenceDetail/>}/>
                        <Route path="reference/:id/update" exact={true} element={<ReferenceUpdate/>}/>
                        {/*exercise*/}
                        <Route path="exercise" exact={true} element={<Exercise/>}/>
                        <Route path="exercise/tag" exact={true} element={<ExerciseByTag/>}/>
                        <Route path="exercise/tag/:tag" exact={true} element={<Exercise/>}/>
                        <Route path="exercise/level" exact={true} element={<ExerciseByLevel/>}/>
                        <Route path="exercise/level/:difficulty" exact={true} element={<Exercise/>}/>
                        <Route path="exercise/:id" exact={true}  element={<ExerciseDetail/>}/>
                        <Route path="exercise/add" exact={true}  element={<ExerciseCreate/>}/>
                        <Route path="exercise/:id/update" exact={true}  element={<ExerciseUpdate/>}/>
                        {/*question*/}
                        <Route path="/question/:id" exact={true} element={<QuestionDetail/>}/>
                        <Route path="/question/add" exact={true} element={<QuestionWrite/>}/>
                        <Route path="/question/update/:id" exact={true} element={<QuestionUpdate/>}/>
                        <Route path="/question/notice" exact={true} element={<QuestionNotice/>}/>
                        <Route path="/question/exercise" exact={true} element={<QuestionExercise/>}/>
                        <Route path="/question/free" exact={true} element={<QuestionFree/>}/>
                        {/*login*/}
                        <Route path="login" exact={true} element={<LoginForm/>}/>
                        <Route path="logout" exact={true}/>
                        <Route path="register" exact={true} element={<RegisterForm/>}/>
                        <Route path="register/certification" exact={true} element={<AfterAuthEmailSent/>}/>
                        <Route path="authConfirm/:authId" exact={true} element={<AuthConfirm/>}/>
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
                        <Route path="admin/search" exact={true} element={<UserSearchPage/>}/>
                        <Route path="admin/user/:id" exact={true} element={<UserInfoPage/>}/>
                    </Routes>
            </main>
            <Footer/>
        </div>
    );
}

export default App;