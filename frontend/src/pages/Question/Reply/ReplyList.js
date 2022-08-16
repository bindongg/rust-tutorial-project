import {Col, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import axios from "axios";
import {useContext} from "react";
import {Token} from "../../../Context/Token/Token";
import {useNavigate} from "react-router-dom";
import {decodeToken} from "react-jwt";
import {login, logout, logout_} from "../../../Common/Modules/Common";
import Reply from "./Reply";
import { IP } from "../../../Context/IP";
import {Refresh} from "../../../Context/Token/Refresh";

function ReplyList(props)
{
    const {token,setToken} = useContext(Token);
    const {setRefresh} = useContext(Refresh);
    const ip = useContext(IP);
    const navigate = useNavigate();
    const config = {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "authorization": token
        },
    };

    const username = token === null || token === undefined ? "" : decodeToken(token).username;

    const [replyState,setReplyState] = useState("");

    function onChangeReply(e)
    {
        setReplyState(e.target.value);
    }

    function add()
    {
        if(replyState === "")
        {
            alert("댓글을 입력하세요");
        }
        else {
            axios.post(`http://${ip}:8080/user/reply/add`, {
                content: replyState,
                parent: props.id,
                userId: username
            }, config)
                .then((response) => {
                    if (response.data.code === 200) {
                        login(setToken,setRefresh,response);
                        props.setRefresh_(!(props.refresh_));
                    } else {
                        alert("failed");
                    }
                })
                .catch((error) => {
                    if (error.response.status === 401 || error.response.status === 403) {
                        logout_(token,setToken,setRefresh,navigate,axios);
                    }
                })
                .finally(() => {

                })
        }
    }

    return (
        <>
            <Row className="mt-7">
                <Col lg={12} md={10} sm={12} className="p-3 m-auto shadow-sm rounded-lg">
                    <div className="ps-3 pe-3 pt-2 form-group">
                        <textarea className="form-control h-25" rows="2" placeholder="댓글 입력" onChange={onChangeReply}/>
                        <Button type="button" className="btn btn-secondary btn-sm" onClick={add}>댓글 쓰기</Button>
                    </div>
                </Col>
            </Row>
            {
                props.reply === null
                    ? (<></>)
                    : props.reply.map((reply,index)=>(<Reply key={index} reply={reply} refresh_={props.refresh_} setRefresh_={props.setRefresh_}/>))
            }
        </>
    );
}

export default ReplyList;