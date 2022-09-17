import {Button, Col, Row} from "react-bootstrap";

function AboutRust() {

    function RustInfoButton({rustInfo}){
        return(
            <Button className="mx-md-4" variant="secondary">
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
            icon: "/icons/rust-logo-512-blk.png"
        },
        {
            title: "Rust 장점 및 특징",
            icon: "/icons/like.png"
        },
        {
            title: "Rust 역사",
            icon: "/icons/history.png"
        },
        {
            title: "Rust 평판조사",
            icon: "/icons/surveyor.png"
        },
        {
            title: "기업 이용 현황",
            icon: "/icons/enterprise.png"
        },
        {
            title: "언어별 성능 비교",
            icon: "/icons/justice-scale.png"
        }
    ];

    return(
        <>
            <div className="col-10 mx-auto pt-5">
                <Row xs={2} md={3} className="g-4">
                    {rustInfos.map(rustInfo => (
                        <Col>
                            <RustInfoButton rustInfo={rustInfo}/>
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    )
}

export default AboutRust;