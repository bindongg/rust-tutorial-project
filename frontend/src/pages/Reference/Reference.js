import React, {useState, useEffect} from "react";
import "./sidebar.css";
import {Button, CloseButton, Col, Container, Navbar, Row} from "react-bootstrap";
import ReferenceSidebar from "./component/ReferenceSidebar";
import {useNavigate} from "react-router";
import {customAxios} from "../../Common/Modules/CustomAxios";

function Reference() {
    const [titles, setTitles] = useState([]);

    useEffect( () => {
        const getTitles = async () => {
            const titles = await customAxios.get(`/reference`);
            setTitles(titles.data.data);
        }
        // 실행함으로써 데이타를 fetching합니다.
        getTitles();
    }, []);

    const navigate = useNavigate();
    return (
            <div id="page-wrapper" >
                <ReferenceSidebar titles={titles} />
                <Navbar style={{ backgroundColor: "rgb(190, 195, 200)" }}>
                    <Container>
                        <h1> <b> Rust 문법 참고자료 </b> </h1>
                        <div></div>
                    </Container>
                </Navbar>
                <div id="page-content-wrapper">
                    <div className="container-fluid">
                        <div id="page-content-wrapper">
                            <div>
                                <h3> <b> 다양한 곳에서 Rust를 배워보세요 </b> </h3>
                                <div className={"my-4"}>
                                    <h7> <b> Rust를 배울 수 있는 여러가지 참고 사이트를 추가로 덧붙입니다. </b> </h7> <div></div>
                                    <h7> <b>우리가 제공하는 Rust Tutorial을 끝낸 다음,더 공부하고 싶다면 참고하면 좋은 자료들입니다. </b></h7>
                                </div>
                                <Container>
                                    <Row>
                                        <Col className={"mx-4"}>
                                            <h5> <b> 영문 사이트</b></h5>
                                            <hr style={{
                                                background: 'rgb(0, 0, 0)',
                                                height: '5px',
                                            }}/>
                                            <div className="d-grid gap-2">
                                                <Button variant="secondary" onClick={() => window.open('https://rust-lang-nursery.github.io/rust-cookbook/intro.html', '_blank')} >
                                                    Rust Cookbook
                                                </Button>
                                                <Button variant="secondary" onClick={() => window.open('https://www.rust-lang.org/learn', '_blank')}  >
                                                    Rust By Example
                                                </Button>
                                                <Button variant="secondary" onClick={() => window.open('https://www.tutorialspoint.com/rust/index.htm', '_blank')} >
                                                    tutorialspoint - Rust
                                                </Button>
                                                <Button variant="secondary" onClick={() => window.open('https://learning-rust.github.io/docs/a1.why_rust.html', '_blank')} >
                                                    Document 형식의 Rust 공식 학습 페이지
                                                </Button>
                                                <Button variant="secondary"onClick={() => window.open('https://dhghomon.github.io/easy_rust/Chapter_2.html', '_blank')}  >
                                                    Easy Rust
                                                </Button>
                                                <Button variant="secondary" onClick={() => window.open('https://www.freecodecamp.org/news/rust-in-replit/', '_blank')} >
                                                    freeCodeCamp
                                                </Button>
                                                <Button variant="secondary" onClick={() => window.open('https://www.educative.io/courses/learn-rust-from-scratch?affiliate_id=5073518643380224', '_blank')} >
                                                    Learn Rust from Scratch
                                                </Button>
                                            </div>
                                        </Col>
                                        <Col className={"mx-4"}>
                                            <h5> <b> 국문 사이트</b></h5>
                                            <hr style={{
                                                background: 'rgb(0, 0, 0)',
                                                height: '5px',
                                            }}/>
                                            <div className="d-grid gap-2">
                                                <Button variant="secondary" onClick={() => window.open('https://rinthel.github.io/rust-lang-book-ko/foreword.html', '_blank')} >
                                                    Learn Rust 번역본
                                                </Button>
                                                <Button variant="secondary" onClick={() => window.open('https://docs.microsoft.com/ko-kr/learn/paths/rust-first-steps/', '_blank')}  >
                                                    Microsoft Learn - Rust
                                                </Button>
                                                <Button variant="secondary" onClick={() => window.open('http://rust-lang.xyz/', '_blank')} >
                                                    예제로 배우는 Rust 프로그래밍
                                                </Button>
                                            </div>

                                        </Col>
                                        <Col className={"mx-4"}>
                                            <h5> <b> 기타 사이트</b></h5>
                                            <hr style={{
                                                background: 'rgb(0, 0, 0)',
                                                height: '5px',
                                            }}/>
                                            <h7> <b> 동영상</b></h7>
                                            <div className="d-grid gap-2">
                                                <Button variant="secondary" onClick={() => window.open('https://youtu.be/MsocPEZBd-M', '_blank')} >
                                                    Rust Programming Course for Beginners
                                                </Button>
                                                <Button variant="secondary" onClick={() => window.open('https://youtu.be/W9DO6m8JSSs', '_blank')}  >
                                                    한글 동영상 강의(개인)
                                                </Button>
                                            </div>
                                            <h7> <b> 책</b></h7>
                                            <div className="d-grid gap-2">
                                                <Button variant="secondary" onClick={() => window.open('https://lise-henry.github.io/books/trpl2.pdf', '_blank')} >
                                                    The Rust Programming Language
                                                </Button>
                                            </div>
                                            <h7> <b> 인터뷰</b></h7>
                                            <div className="d-grid gap-2">
                                                <Button variant="secondary" onClick={() => window.open('https://stackoverflow.blog/2020/06/05/why-the-developers-who-use-rust-love-it-so-much/', '_blank')} >
                                                    Rust를 사용하는 이유
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Reference;