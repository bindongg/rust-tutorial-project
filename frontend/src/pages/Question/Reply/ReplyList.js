import {Col, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useState} from "react";
import {decodeToken} from "react-jwt";
import Reply from "./Reply";
import {customAxios} from "../../../Common/Modules/CustomAxios";


function ReplyList(props) {

    const username = localStorage.getItem("refresh") === null ? "" : decodeToken(localStorage.getItem("refresh")).username;

    const [replyState, setReplyState] = useState("");

    function onChangeReply(e) {
        setReplyState(e.target.value);
    }

    function add() {
        if (replyState === "") {
            alert("댓글을 입력하세요");
        } else {
            customAxios.post("/user/reply/add", {
                content: replyState,
                parent: props.id,
                userId: username
            }).then((response) => {
                if (response.data.code === 200) {
                    props.setRefresh_(!(props.refresh_));
                } else {
                    alert("failed");
                }
            }).finally(()=>{
                setReplyState("")
            })
        }
    }

        return (
            <>
                <Row className="mt-7">
                    <Col lg={12} md={10} sm={12} className="p-3 m-auto shadow-sm rounded-lg">
                        <div className="ps-3 pe-3 pt-2 form-group">
                            <input className="form-control h-25" placeholder="댓글 입력" value={replyState}
                                      onKeyUp={(e)=>{if(e.key==="Enter"){add()}}} onChange={onChangeReply}/>
                            <Button type="button" className="btn btn-secondary btn-sm" onClick={add}>댓글 쓰기</Button>
                        </div>
                    </Col>
                </Row>
                {
                    props.reply === null
                        ? (<></>)
                        : props.reply.map((reply, index) => (
                            <Reply key={index} reply={reply} refresh_={props.refresh_} setRefresh_={props.setRefresh_}/>))
                }
            </>
        );
}

export default ReplyList;