import {Button, Col, Container, Form, Row} from "react-bootstrap";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function UserSearchPage(){
    const [username,setUsername] = useState("");
    const navigate = useNavigate();
    return (
        <>
            <Container>
                <h3 className="text-black mt-5 p-3 text-center rounded">유저 진도 및 문제 조회</h3>
                <Row className="mt-5">
                    <Col lg={7} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>아이디</Form.Label>
                                <Form.Control placeholder="조회할 유저 아이디"
                                              onChange={(e)=>{setUsername(e.target.value)}}
                                              onKeyUp={(e)=>{
                                                  if(e.key==='Enter')
                                                  {
                                                      navigate(`/admin/user/${username}`);
                                                  }}}
                                />
                            </Form.Group>
                            <br/>
                            <Button variant="info" type="button" onClick={()=>{navigate(`/admin/user/${username}`);}}>
                                완료
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default UserSearchPage;