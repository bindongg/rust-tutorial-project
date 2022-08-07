import React, {useState, useEffect} from "react";
import "./sidebar.css";
import {NavLink} from "react-bootstrap";
import axios from "axios";
import ReferenceSidebar from "./component/ReferenceSidebar";
import MarkdownContents from "./MarkdownContents";

function Reference() {
    const [titles, setTitles] = useState([]);

    useEffect( () => {
        const getTitles = async () => {
            const titles = await axios.get("https://ec33a7bf-9e16-4092-8ca5-aeeaf2a1072c.mock.pstmn.io/reference");
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
                            <div>
                                <MarkdownContents/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Reference;