import {Token} from "../Context/Token/Token";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {logout} from "../Common/Modules/Common";
import Button from "react-bootstrap/Button";
import {Col, Container, Form, Row} from "react-bootstrap";
import {Editor} from "react-draft-wysiwyg";


function QuestionDetail()
{
    const {token,setToken} = useContext(Token);

    const {navigate} = useNavigate();

    const config = {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "authorization": token
        },
    };

    const location = useLocation();

    const [title] = useState(location.state.title);
    const [content] = useState(location.state.content);



    return(
        <>
            <Container>
                <h3 className="text-black mt-5 p-3 rounded">{title}</h3>
                <Row className="mt-7">
                    <Col lg={12} md={10} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <div>
                            {content}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
export default QuestionDetail;