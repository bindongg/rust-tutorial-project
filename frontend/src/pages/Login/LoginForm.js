import React, {useState} from "react";
import {Row, Container, Col, Form, Button, NavLink} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {customAxios} from "../../Common/Modules/CustomAxios";

function LoginForm() {
    const [userId,setUserId] = useState("");
    const [userPwd,setUserPwd] = useState("");
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    function onChangeId(e)
    {
        setUserId(e.target.value);
    }

    function onChangePwd(e)
    {
        setUserPwd(e.target.value);
    }

    function logIn()
    {
        setLoading(true);
        customAxios.post("/login",{userId: userId, userPassword: userPwd}).then((res)=>{
            if(res.status === 200) {
                navigate(-1)
            }
        }).catch((error)=>{
            if(error.response.status === 400)
            {
                alert("아이디 또는 비밀번호가 틀렸습니다")
            }
        }).finally(()=>{
            setLoading(false);
        })
    }

    return (
        <>
            <Container>
                <h3 className="text-black mt-5 p-3 text-center rounded">로그인</h3>
                <Row className="mt-5">
                    <Col lg={7} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>아이디</Form.Label>
                                <Form.Control type="id" placeholder="아이디를 입력하세요" onChange={onChangeId}/>
                                <Form.Text className="text-muted">
                                    <Link className={"nav-link"} to="/idForgot">아이디 찾기</Link>
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>비밀번호</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={onChangePwd} onKeyUp={(e)=>{if(e.key==='Enter'){logIn()}}}/>
                                <Form.Text className="text-muted">
                                    <Link className={"nav-link"} to="/pwdForgot">비밀번호 찾기</Link>
                                </Form.Text>
                            </Form.Group>
                            <Button variant="info" type="button" disabled={loading} onClick={logIn}>
                                로그인
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default LoginForm;