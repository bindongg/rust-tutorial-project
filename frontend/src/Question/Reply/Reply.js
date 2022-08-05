import {Button, Col, Row} from "react-bootstrap";
import {useEffect, useState} from "react";

function Reply(props)
{
    const [subReplyArea,setSubReplyArea] = useState(false);

    function changeState()
    {
        setSubReplyArea(true);
    }

    return(
        <Row className="mt-7">
            <Col lg={12} md={10} sm={12} className="p-3 m-auto shadow-sm rounded-lg">
                <h6 className="ps-3 pt-2 text-lg-start">{props.reply.user.id}</h6>
                <div>
                    <span className="ps-3">{props.reply.content}</span>
                </div>
                <Button type="button" className="btn btn-primary btn-sm" onClick={changeState}>대댓글</Button>
            </Col>
            {
                subReplyArea === false
                    ? (<></>)
                    :
                    (<div className="ps-3 pe-3 pt-2 form-group">
                        <textarea className="form-control h-25" rows="1" placeholder="댓글 입력"/>
                        <Button type="button" className="btn btn-secondary btn-sm" >댓글 쓰기</Button>
                    </div>)
            }
        </Row>);
}

export default Reply;