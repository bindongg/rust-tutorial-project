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
    const createReference = () => {
        navigate("/reference/create");
    }

    return (
        <>
            <div id="page-wrapper">
                <ReferenceSidebar titles={titles} />
                <div id="page-content-wrapper">
                    <div className="container-fluid">
                        <div style={{paddingBottom: "10px"}}><Button onClick={createReference}>레퍼런스 추가</Button></div>
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