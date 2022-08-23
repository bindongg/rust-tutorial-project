import {Button, Col, Row} from "react-bootstrap";
import {useContext, useState} from "react";
import {login, logout, logout_} from "../../../Common/Modules/Common";
import axios from "axios";
import {Token} from "../../../Context/Token/Token";
import {useNavigate} from "react-router-dom";
import {decodeToken} from "react-jwt";
import { IP } from "../../../Context/IP";
import {Refresh} from "../../../Context/Token/Refresh";

function Reply(props)
{
    const replyStyle = {
        fontSize: "1rem"
    }
    const replyAuthorStyle = {
        fontSize: "0.9rem"
    }

    const {token,setToken} = useContext(Token);
    const {setRefresh} = useContext(Refresh);
    const ip = useContext(IP);
    const navigate = useNavigate();
    const username = token === null || token === undefined ? "" : decodeToken(token).username;
    const [subReplyAreaState,setSubReplyAreaState] = useState(false);
    const [subReplyContent,setSubReplyContent] = useState("");

    const config = {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "authorization": token
        },
    };

    function changeState()
    {
        setSubReplyAreaState(true);
    }

    function delReply()
    {
        axios.delete(`http://${ip}:8080/user/reply/delete`, {
            data: {
                author: props.reply.user.id,
                id: props.reply.id,
            }, headers: {
                "Content-Type": "application/json; charset=utf-8",
                "authorization": token
            }
        })
            .then((response)=>{
                if(response.data.code === 200)
                {
                    login(setToken,setRefresh,response);
                    props.setRefresh_(!(props.refresh_));
                }
                else
                {
                    alert("failed");
                }
            })
            .catch((error)=>{
                if(error.response.status === 401 || error.response.status === 403)
                {
                    logout_(token,setToken,setRefresh,navigate,axios);
                }
            })
    }

    function delSubReply(e)
    {
        axios.delete(`http://${ip}:8080/user/subReply/delete`,{
            data: {
                id: e.target.id,
                author: e.target.value
            }, headers: {
                "Content-Type": "application/json; charset=utf-8",
                "authorization": token
            }
        })
            .then((response)=>{
                if(response.data.code === 200)
                {
                    login(setToken,setRefresh,response);
                    props.setRefresh_(!(props.refresh_));
                }
                else
                {
                    alert("failed");
                }
            })
            .catch((error)=>{
                if(error.response.status === 401 || error.response.status === 403)
                {
                    logout_(token,setToken,setRefresh,navigate,axios);
                }
            })
    }


    function addSubReply()
    {
        if(subReplyContent !== "") {
            axios.post(`http://${ip}:8080/user/subReply/add`, {
                content: subReplyContent,
                userId: username,
                parent: props.reply.id
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
                .finally(()=>{
                    setSubReplyAreaState(false);
                })
        }
    }

    return(
        <Row className="mt-7">
            <Col lg={12} md={10} sm={12} className="p-3 m-auto shadow-sm rounded-lg">
                <h6 className="ps-3 pt-2 text-lg-start" style={replyAuthorStyle}>{props.reply.user.id}</h6>
                <div>
                    <span className="ps-3" style={replyStyle}>{props.reply.content}</span>
                </div>
                <Button type="button" className="btn btn-primary btn-sm" onClick={changeState}>대댓글</Button>
                &nbsp;&nbsp;
                {
                    props.reply.user.id === username
                        ? (<Button type="button" className="btn btn-primary btn-sm" onClick={delReply}>삭제</Button>)
                        : (<></>)
                }
                {
                    subReplyAreaState === false
                        ? (<></>)
                        :
                        (<div className="ps-3 pe-3 pt-2 form-group">
                            <textarea className="form-control h-25" rows="1" placeholder="댓글 입력" onChange={(e)=>{setSubReplyContent(e.target.value)}}/>
                            <Button type="button" className="btn btn-secondary btn-sm" onClick={addSubReply}>댓글 쓰기</Button>
                        </div>)
                }
                {
                    props.reply.subReply === null
                        ? (<></>)
                        :
                        props.reply.subReply.map((subReply,index)=>(
                            <div className="ps-5" key={index}>
                                <h6 className="pt-2 text-lg-start" style={replyAuthorStyle}>{subReply.user.id}</h6>
                                <div>
                                    <span style={replyStyle}>{subReply.content}</span>
                                </div>
                                {
                                    subReply.user.id === username
                                        ? (<Button value={(subReply.user.id).toString()} id={subReply.id} type="button" className="btn btn-primary btn-sm"
                                                   onClick={delSubReply}>삭제</Button>)
                                        : (<></>)
                                }
                            </div>
                        ))
                }
            </Col>
        </Row>);
}

export default Reply;