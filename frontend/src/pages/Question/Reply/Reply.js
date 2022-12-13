import { Col, Row} from "react-bootstrap";
import { useState} from "react";
import {decodeToken} from "react-jwt";
import {customAxios} from "../../../Common/Modules/CustomAxios";

function Reply(props)
{
    const replyStyle = {
        fontSize: "1rem",
    }
    const replyAuthorStyle = {
        fontSize: "1rem",
        display: "inline-block"
    }

    const username = localStorage.getItem("refresh") === null  ? "" : decodeToken(localStorage.getItem("refresh")).username;
    const [subReplyAreaState,setSubReplyAreaState] = useState(false);
    const [subReplyContent,setSubReplyContent] = useState("");



    function changeState()
    {
        setSubReplyAreaState(true);
    }

    function delReply()
    {
        if(window.confirm("삭제하시겠어요?"))
        {
            customAxios.delete("/user/reply/delete", {
                data: {
                    author: props.reply.user.id,
                    id: props.reply.id
                }
            }).then((response) => {
                if (response.data.code === 200) {
                    props.setRefresh_(!(props.refresh_));
                } else {
                    alert("failed");
                }
            })
        }
    }


    function delSubReply(e)
    {
        if(window.confirm("삭제하시겠어요?"))
        {
            let words = e.target.id.split(",");
            customAxios.delete("/user/subReply/delete", {
                data: {
                    id: words[0],
                    author: words[1]
                }
            }).then((response) => {
                if (response.data.code === 200) {
                    props.setRefresh_(!(props.refresh_));
                } else {
                    alert("failed");
                }
            })
        }
    }


    function addSubReply()
    {
        if(subReplyContent !== "") {
            customAxios.post("/user/subReply/add",{
                content: subReplyContent,
                userId: username,
                parent: props.reply.id})
                .then((response) => {
                    if (response.data.code === 200) {
                        props.setRefresh_(!(props.refresh_));
                    } else {
                        alert("failed");
                    }
                }).finally(()=>{
                    setSubReplyContent("");
                    setSubReplyAreaState(false);
            })
        }
    }

    function enterKeyHandler(e)
    {
        if(e.key === "Enter")
        {
            addSubReply();
        }
    }

    return(
        <Row className="mt-7">
            <Col lg={12} md={10} sm={12} className="p-3 m-auto shadow-sm rounded-lg">
                <div className="justify-content-between" style={{display: "flex"}}>
                    <h6 className="ps-3 pt-2 text-lg-start" style={replyAuthorStyle}>{props.reply.user.id}</h6>
                    <span>
                        <span className="p-lg-2 text-muted" style={{cursor: "pointer", fontSize: "0.7rem"}} onClick={changeState}>대댓글</span>
                        {
                            props.reply.user.id === username
                                ? (<span className="p-lg-2 text-muted" style={{cursor: "pointer", fontSize: "0.7rem"}} onClick={delReply}>&nbsp;&nbsp;삭제</span>)
                                : (<></>)
                        }
                    </span>
                </div>
                <div>
                    <span className="ps-3" style={replyStyle}>{props.reply.content}</span>
                </div>
                {
                    subReplyAreaState === false
                        ? (<></>)
                        :
                        (<div className="ps-3 pe-3 pt-2 form-group" style={{display: "flex"}}>
                            <input className="form-control h-25"  placeholder="댓글 입력" onKeyUp={enterKeyHandler} onChange={(e)=>{setSubReplyContent(e.target.value)}}/>
                            <button style={{display: "inline-block", fontSize: "11px", border: "none"}} onClick={addSubReply}>댓글</button>
                        </div>)
                }
                {
                    props.reply.subReply === null
                        ? (<></>)
                        :
                        props.reply.subReply.map((subReply,index)=>(
                            <div className="ps-5" key={index}>
                                <div className="justify-content-between" style={{display: "flex"}}>
                                    <h6 className="pt-1 text-lg-start" style={replyAuthorStyle}>{subReply.user.id}</h6>
                                    {
                                        subReply.user.id === username
                                            ? (<span id={[subReply.id,subReply.user.id]} className="pt-1 p-lg-2" style={{cursor: "pointer", fontSize: "0.7rem", color: "gray"}}
                                                       onClick={delSubReply}>삭제</span>)
                                            : (<></>)
                                    }
                                </div>
                                <div>
                                    <span style={replyStyle}>{subReply.content}</span>
                                </div>
                            </div>
                        ))
                }
            </Col>
        </Row>);
}

export default Reply;