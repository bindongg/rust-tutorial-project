import React, {useState, useEffect} from "react";
import "./sidebar.css";
import {NavLink} from "react-bootstrap";
import axios from "axios";
import ReferenceSidebar from "./component/ReferenceSidebar";

function Reference() {
    const [titles, setTitles] = useState([]);

    useEffect( () => {
        const getTitles = async () => {
            const titles = await axios.get("https://c70c860f-2bc4-4f61-b0d4-ad3bd5305543.mock.pstmn.io/reference");
            setTitles(titles.data.data);
        }
        // 실행함으로써 데이타를 fetching합니다.
        getTitles();
    }, []);

    return (
        <>
            <div id="page-wrapper">
                <ReferenceSidebar titles={titles} />

                <div id="page-content-wrapper">
                    <div className="container-fluid">
                        <div id="page-content-wrapper">
                            <h1>간단한 사이드바</h1>
                            <p>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                                hello<br/>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Reference;