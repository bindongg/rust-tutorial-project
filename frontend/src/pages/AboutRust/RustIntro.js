import {Container, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

function RustIntro(){
    return (
        <>
            <Navbar style={{ backgroundColor: "rgb(190, 195, 200)" }}>
                <Container>
                    <Link to="/aboutRust">
                        <img
                            src="/ferris/rustacean-orig-noshadow.png"
                            width="130"
                            height="90"
                            className="d-inline-block align-top mt-3"
                            alt="Ferris"
                        />
                    </Link>
                    <h2>
                        Rust에 대해서 조금 더 알아봅시다!
                    </h2>
                    <div></div>
                </Container>
            </Navbar>
        </>
    );
}

export default RustIntro;