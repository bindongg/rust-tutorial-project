import React, {useState} from "react";
import {Row, Container, Col, Form, Button, InputGroup, FormControl, FormGroup} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from 'react-router-dom';


function RegisterForm() {
    const [userId, setUserId] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [userPasswordCheck, setUserPasswordCheck] = useState("")
    const [userEmail, setUserEmail] = useState("")

    const [checkIdState, setCheckIdState] = useState(false)

    const [btnState, setBtnState] = useState(false);

    const navigate = useNavigate();

    function onChangeId(e){
        setUserId(e.target.value);
    }

    function onChangePwd(e)
    {
        setUserPassword(e.target.value);
    }

    function onChangePwdCheck(e)
    {
        setUserPasswordCheck(e.target.value);
    }

    function onChangeEmail(e)
    {
        setUserEmail(e.target.value);
    }

    function checkIdDuplicate(){ //id 길이, 특수문자 check 하기
        let idWordEx = new RegExp(/^(?=.*?[A-Za-z]).{3,15}$/);
        let idSpecialEx = new RegExp(/[`~!@#$%^&*|\\\'\";:\/?]/gi);
        if(idWordEx.test(userId) && !(idSpecialEx.test(userId)))
        {
            axios.post("http://localhost:8080/user/duplicateId", {id: userId}).then((Response) => {
                if (Response.data === true) {
                    setCheckIdState(false);
                    alert("이미 존재하는 아이디입니다");
                } else {
                    setCheckIdState(true);
                    alert("사용 가능한 아이디입니다");
                }
            }).catch((Error) => {
                console.log(Error);
            })
        }
        else
        {
            alert("5~15의 길이에 영어와 숫자만 포함 가능합니다");
        }
    }

    function checkInput() //아이디에 특수문자가 포함되어 지지 않고 + 비밀번호가 8~15길이의 영어, 숫자, @!#$
    {
        if(checkIdState === true)
        {
            let pwdEx = new RegExp(/^(?=.*?[A-Za-z#?!@$%^&*-]).{8,20}$/);

            if(pwdEx.test(userPassword))
            {
                if(userPasswordCheck.toString() === userPassword.toString())
                {
                    let mailEx = new RegExp(/^(?=.*?[A-Za-z]).{3,50}$/);
                    let mailSpecialEx = new RegExp(/[`~!@#$%^&*|\\\'\";:\/?]/gi);

                    if(mailEx.test(userEmail) && !(mailSpecialEx.test(userEmail)))
                    {
                        return 1;
                    }
                    else
                    {
                        alert("이메일이 올바른 형식이 아닙니다");
                        return -1;
                    }
                }
                else
                {
                    alert("비밀번호를 다시 확인해주세요");
                    return -1;
                }
            }
            else
            {
                alert("비밀번호가 올바른 형식이 아닙니다");
                return -1;
            }
        }
        else
        {
            alert("아이디 중복 체크를 해주세요");
            return -1;
        }
    }

    function register() //수정할것
    {
        let checkEmail = 1;
        axios.post("http://localhost:8080/user/duplicateEmail",{email: userEmail}).then((Response)=>{
            if(Response.data === true)
            {
                checkEmail = 0;
                alert("이미 사용하고 있는 메일 주소입니다");
            }
            else
            {}
        }).catch((Error)=>{
            alert("failed");
        })

        if(checkEmail === 1)
        {
            let check = checkInput();
            if(check === 1)
            {
                setBtnState(true);
                axios.post("http://localhost:8080/user/register",{id: userId, password: userPassword, email: userEmail}).then((Response)=>{
                    alert("입력하신 메일 주소로 인증 메일을 전송했습니다. 인증을 위해 메일로 전송한 링크를 클릭해주세요");
                }).catch((Error)=>{
                    alert("failed");
                })/*.finally(()=>{navigate("/register/certification", {state: {id: userId, pwd: userPassword, email: userEmail}});})*/
            }
            else
            {}
        }
    }

    return (
        <>
            <Container>
                <h3 className="text-black mt-5 p-3 text-center rounded">회원가입</h3>
                <Row className="mt-5">
                    <Col lg={7} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>아이디</Form.Label>
                                <Form.Control type="id" placeholder="5~15길이의 영어와 숫자의 조합" onChange={onChangeId}/>
                                <Button variant="info" type="button" size="sm" onClick={checkIdDuplicate}>
                                    중복확인
                                </Button>
                                <Form.Text>&nbsp;&nbsp; 중복 여부</Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>비밀번호</Form.Label>
                                <Form.Control type="password" placeholder="8~20길이의 영어, 숫자, 특수문자의 조합" onChange={onChangePwd}/>
                                <Form.Text>적합 여부</Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>비밀번호 확인</Form.Label>
                                <Form.Control type="password" placeholder="비밀번호 확인" onChange={onChangePwdCheck}/>
                                <Form.Text>일치 여부</Form.Text>
                            </Form.Group>
                            <FormGroup className="mb-3">
                                <Form.Label>이메일</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="Recipient's username"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                        onChange={onChangeEmail}
                                    />
                                    <InputGroup.Text id="basic-addon2">@pusan.ac.kr</InputGroup.Text>
                                </InputGroup>
                            </FormGroup>
                            <Button disabled={btnState} variant="info" type="button" onClick={register}>
                                회원가입
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default RegisterForm;