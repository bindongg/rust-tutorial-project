import {Container, Nav, Navbar, NavLink, Tab, Tabs} from "react-bootstrap";
import {Link} from "react-router-dom";

function RustPerformance(){
    return(
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
                        Rust의 성능은
                    </h2>
                    <div></div>
                </Container>
            </Navbar>

            <div className="col-10 mx-auto pt-5">
                <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="home" title="Rust">
                        rust
                    </Tab>
                    <Tab eventKey="profile" title="java">
                        java
                    </Tab>
                    <Tab eventKey="contact" title="C++">
                        c++
                    </Tab>
                </Tabs>
            </div>

        </>
    );
}
export default RustPerformance;