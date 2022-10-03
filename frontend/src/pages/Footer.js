import React from 'react';
import { Container, Row, Col} from "react-bootstrap";

function Footer(){
    return (
        <footer>
            <Container className='border-top'>
                    <Col className='text-center py-3'>
                        <p>Rust Education Service</p> 
                        <p>copyright &copy; PUSAN NATIONAL UNIVERSITY. All Rights Reserved.</p> 
                        <img
                            src={"/pnu-logo.jpg"}
                            width="200"
                            height="60"
                            className="d-inline-block"
                            alt="PNU logo"
                        />
                    </Col>
            </Container>
        </footer>
    );
}

export default Footer;