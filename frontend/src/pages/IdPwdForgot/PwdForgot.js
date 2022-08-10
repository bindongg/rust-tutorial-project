import React, {useContext, useState} from "react";
import {Row, Container, Col, Form, Button, FormGroup, InputGroup, FormControl} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Loading from "../Loading";
import { IP } from "../../Context/IP";

function PwdForgot() {
    const ip = useContext(IP);
    const navigate = useNavigate();

    const [id,setId] = useState("");
    const [email,setEmail] = useState("");

    const [loadingState, setLoadingState] = useState(false);

    function onChangeId(e)
    {
        setId(e.target.value);
    }

    function onChangeEmail(e)
    {
        setEmail(e.target.value);
    }

    function send()
    {
        setLoadingState(true);
        axios.post(`http://${ip}:8080/password`,{id: id, email: email})
            .then((response)=>
            {
                if(response.data.code === 200)
                {
                    alert("입력하신 메일 주소로 임시 비밀번호를 전송했습니다.");
                    navigate("/login");
                }
                else
                {
                    alert("fail");
                }
            })
            .catch((Error)=>
            {
                alert(Error.response.status+"error");
            })
            .finally(()=>
            {
                setLoadingState(false);
            })
    }

    return (
        <>
            {
                loadingState === true
                    ? (<Loading/>)
                    : (<></>)
            }
            <Container style={loadingState ? {pointerEvents: "none", opacity: "0.4"} : {}}>
                <h3 className="text-black mt-5 p-3 text-center rounded">비밀번호 찾기</h3>
                <Row className="mt-5">
                    <Col lg={7} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <Form>
                            <FormGroup className="mb-3">
                                <Form.Label>아이디</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="Recipient's username"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                        onChange={onChangeId}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <Form.Label>이메일</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="Recipient's username"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                        onChange={onChangeEmail}
                                    />
                                    <InputGroup.Text>@pusan.ac.kr</InputGroup.Text>
                                </InputGroup>
                            </FormGroup>
                            <Button variant="info" type="button" onClick={send}>
                                이메일 전송
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default PwdForgot;