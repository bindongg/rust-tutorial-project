import {Button, Col, Container, Navbar, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

function AboutRust() {
    const navigate = useNavigate();

    const moveTo = (href) => {
        navigate(href);
    }

    function RustInfoButton({rustInfo}){
        return(
            <Button className="mx-md-4" variant="secondary" onClick={ () => moveTo(rustInfo.move) } >
                <img src={rustInfo.icon} style={{ width: "20%", height: "70%" }}/>
                <div className={"mt-2"}>
                    {rustInfo.title}
                </div>
            </Button>
        );
    }

    const rustInfos = [
        {
            title: "Rust 소개",
            icon: "/icons/rust-logo-512-blk.png",
            move: "./Intro"
        },
        {
            title: "Rust 장점 및 특징",
            icon: "/icons/like.png",
            move: "./advantages"
        },
        {
            title: "Rust 역사",
            icon: "/icons/history.png",
            move: "./history"
        },
        {
            title: "Rust 평판조사",
            icon: "/icons/surveyor.png",
            move: "./survey"
        },
        {
            title: "기업 이용 현황",
            icon: "/icons/enterprise.png",
            move: "./enterprise"
        },
        {
            title: "언어별 성능 비교",
            icon: "/icons/justice-scale.png",
            move: "./performance"
        }
    ];

    return(
        <>
            <Navbar style={{ backgroundColor: "rgb(190, 195, 200)" }}>
                <Container>
                    <img
                        src="/ferris/rustacean-orig-noshadow.png"
                        width="30%"
                        height="35%"
                        className="d-inline-block align-top mt-5"
                        alt="Ferris"
                    />
                    <div>
                        <h1>
                            Ferris와 함께 Rust를 알아봅시다!
                        </h1>
                        {" "}
                        <h3>
                            Ferris
                        </h3>
                        <h5>
                            러스트의 비공식 마스코트 Ferris입니다.
                        </h5>
                    </div>
                    <div></div>
                </Container>
            </Navbar>
            <div className="col-10 mx-auto pt-5">
                <Row xs={2} md={3} className="g-4">
                    {rustInfos.map(rustInfo => (
                        <Col  key={rustInfo.title} >
                            <RustInfoButton rustInfo={rustInfo}/>
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    )
}

export default AboutRust;