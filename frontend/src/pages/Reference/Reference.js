import React, {useState, useEffect} from "react";
import "./sidebar.css";
import {Button, NavLink} from "react-bootstrap";
import axios from "axios";
import ReferenceSidebar from "./component/ReferenceSidebar";
import MarkdownContents from "./MarkdownContents";
import {useContext} from "react";
import {Token} from "../../Context/Token/Token";
import {useNavigate} from "react-router";

function Reference() {
    const [titles, setTitles] = useState([]);
    const {token,setToken} = useContext(Token);
    const headers = {
        'Content-Type' : 'application/json; charset=utf-8',
        'Authorization' : token
    };

    useEffect( () => {
        const getTitles = async () => {
            // const titles = await axios.get("https://ec33a7bf-9e16-4092-8ca5-aeeaf2a1072c.mock.pstmn.io/reference");
            const titles = await axios.get("http://localhost:8080/reference", {headers : headers});
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