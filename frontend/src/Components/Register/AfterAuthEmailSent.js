import React from "react";
import {Row, Container, Col, Button} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import axios from "axios";

function AfterAuthEmailSent() {
    const location = useLocation();
    const id = location.state.id;
    const password = location.state.password;
    const email = location.state.email;

    function register()
    {   //재전송 시 문제 처리하기, 그냥 추가된 record delete by 하면 되나??
        axios.post("http://localhost:8080/user/register",{id: id, password: password, email: email}).then((Response)=>{
            alert("재전송 완료");
        }).catch((Error)=>{
            alert("failed");
        })
    }

    return (
        <>
            <Container>
                <h3 className="text-black mt-5 p-3 text-center rounded">이메일 인증</h3>
                <Row className="mt-5">
                    <Col lg={7} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        {email}@pusan.ac.kr로 인증을 위한 링크를 전송했습니다.
                        <br/>
                        <br/>
                        메일이 5분 이상 오지 않을 때 눌러주세요 &nbsp;
                        <Button variant="info" type="button" onClick={register}>
                            다시 보내기
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default AfterAuthEmailSent;