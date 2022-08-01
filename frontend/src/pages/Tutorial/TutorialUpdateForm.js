import axios from "axios";
import { useContext } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Token } from "../../Context/Token/Token";



function TutorialUpdateForm() {
    const {tutorial} = useLocation().state;
    const {token,setToken} = useContext(Token);
    const headers = {
        'Content-Type' : 'application/json; charset=utf-8',
        'Authorization' : token
    };
    const { register, handleSubmit, formState: {errors} } = useForm();
    const navigate = useNavigate();

        
    const onSubmit = (data) => {
        data.number = data.number * 1;
        console.log('data', data);
        axios.patch(`http://localhost:8080/tutorial/${tutorial.id}`, {...data}, {headers : headers}
        ).then(function(response) {
            alert(response.data.data);
            navigate(-1);
        })
    }

    return (
        <>
            <Container>
                <h3 className="text-black mt-5 p-3 text-center rounded">대주제 수정하기</h3>
                <Row className="mt-7">
                    <Col lg={7} md={10} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <Form onSubmit={handleSubmit(onSubmit)} >
                            <Form.Group className="mb-3" controlId="tutorialNumber">
                                <Form.Label>번호</Form.Label>
                                <Form.Control placeholder="번호를 입력하세요" defaultValue={tutorial.number} {...register("number",  {required: {value:true, message:"*번호를 입력하세요"} , pattern: {value: /^[0-9]+$/, message:"*번호는 숫자만 가능합니다"}})} />
                                {errors.number && <p style={{color:'red', fontSize:"13px"}}>{errors.number.message}</p>}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="tutorialTitle">
                                <Form.Label>제목</Form.Label>
                                <Form.Control type="title" placeholder="제목을 입력하세요" defaultValue={tutorial.name} {...register("name",  {required: {value:true, message:"*제목를 입력하세요"}})} />
                                {errors.name && <p style={{color:'red', fontSize:"13px"}}>{errors.name.message}</p>}
                            </Form.Group>

                           <Button type="submit">제출하기</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default TutorialUpdateForm;

