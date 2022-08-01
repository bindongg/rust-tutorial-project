import React, {Component, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import CodeEditor from '@uiw/react-textarea-code-editor';
import {Button} from "react-bootstrap";
import axios from "axios";

function ExerciseDetailInfo({index, title,tag, Content, Testcases}){
    let problemURL = window.location.pathname;
    let problemNum = problemURL[problemURL.length-1];
    const exerciseDetail = {
        title: title,
        tag: tag,
        Content: Content,
        Testcases: Testcases
    }
    const [rustCode, setRustCode] = useState(`fn main() {
  println!("Hello World!");
}
`);

    const compileCode = (data) => {
        console.log('code: ', {rustCode})
        return  axios.post("https://ec33a7bf-9e16-4092-8ca5-aeeaf2a1072c.mock.pstmn.io/exercise/compile/"+ problemNum,
            {code: rustCode},
            {withCredentials: true}).then(result => { //TODO backend에서도 마찬가지로 Credential 설정을 true 로 해줘야함
            console.log('register result', result)
        }).catch()
    }


    return (
        <>
            <div className="col-8 mx-auto m-3 p-2">
                <h1>{title}</h1>
            </div>
            <div className="col-8 mx-auto">
                <NavLink className="nav-link" to={`/exercise/${problemNum}/update`} state={{exerciseDetail: exerciseDetail}}>Update Exercise</NavLink>
            </div>
            <div className="col-8 mx-auto mt-5">
                <h3 style={{display:"inline-flex"}}>문제 &nbsp;</h3>
                <span><img src="../abc.png"></img>&nbsp;&nbsp;</span>
            </div>
            <div className="col-8 mx-auto border-top border-bottom m-3 p-2">
                {Content?.description}
            </div>
            <div className="col-8 mx-auto mt-5">
                <h3>입력</h3>
                {Content?.input_description}
            </div>
            <div className="col-8 mx-auto border-top border-bottom m-3 p-2">
                {Content?.input_value}
            </div>
            <div className="col-8 mx-auto mt-5">
                <h3>출력</h3>
                {Content?.output_description}
            </div>
            <div className="col-8 mx-auto border-top border-bottom m-3 p-2">
                {Content?.output_value}
            </div>
            <div className="col-8 mx-auto mt-5">
                <h3>컴파일</h3>
            </div>
            <div className="col-8 mx-auto border-top border-bottom m-3 p-2">
                <CodeEditor
                    value={rustCode}
                    language="rust"
                    placeholder="Please enter RUST code."
                    onChange={(event) => setRustCode(event.target.value)}
                    padding={15}
                    style={{
                        fontSize: 15,
                        backgroundColor: "#f5f5f5",
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                        fontWeight: "bold"
                    }}
                />
                <Button variant="secondary" type="submit" onClick={compileCode} >
                    Compile
                </Button>
            </div>
            <div className="col-8 mx-auto mt-5">
                <h3>유형</h3>
            </div>
            <div className="col-8 mx-auto border-top border-bottom m-3 p-2">
                <li>
                    <Link to="#">{tag}</Link>
                </li>
            </div>
        </>
    );
}

export default ExerciseDetailInfo;