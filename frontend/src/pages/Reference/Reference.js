import React, {useState, useEffect} from "react";
import "./sidebar.css";
import {Button} from "react-bootstrap";
import ReferenceSidebar from "./component/ReferenceSidebar";
import MarkdownContents from "./MarkdownContents";
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
        <>
            <div id="page-wrapper">
                <ReferenceSidebar titles={titles} />
                <div id="page-content-wrapper">
                    <div className="container-fluid">
                        <div id="page-content-wrapper">
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