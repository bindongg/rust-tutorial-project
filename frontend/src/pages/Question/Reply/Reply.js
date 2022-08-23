import {Button, Col, Row} from "react-bootstrap";
import { useState} from "react";
import {decodeToken} from "react-jwt";
import {customAxios} from "../../../Common/Modules/CustomAxios";

function Reply(props)
{
    const replyStyle = {
        fontSize: "1rem"
    }
    const replyAuthorStyle = {
        fontSize: "0.9rem"
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
        customAxios.delete("/user/reply/delete",{
            data: {
                author: props.reply.user.id,
                id: props.reply.id
            }
        }).then((response)=>{
            if(response.data.code === 200)
            {
                props.setRefresh_(!(props.refresh_));
            }
            else
            {
                alert("failed");
            }
        })
    }


    function delSubReply(e)
    {
        customAxios.delete("/user/subReply/delete",{
            data: {
                id: e.target.id,
                author: e.target.value
            }
        }).then((response)=>{
            if(response.data.code === 200)
            {
                props.setRefresh_(!(props.refresh_));
            }
            else
            {
                alert("failed");
            }
        })
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