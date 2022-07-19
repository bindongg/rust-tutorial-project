import React from "react";
import { Table } from "react-bootstrap";
import {Link} from "react-router-dom";

function ExerciseByLevel() {
    return (
        <>
            <div className="col-10 mx-auto pt-5">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>난이도</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><Link to="/exercise">별 하나(이미지로 대체)</Link></td>
                        </tr>
                        <tr>
                            <td><Link to="#">별 둘(이미지로 대체)</Link></td>
                        </tr>
                        <tr>
                            <td><Link to="#">별 셋(이미지로 대체)</Link></td>
                        </tr>
                        <tr>
                            <td><Link to="#">별 넷(이미지로 대체)</Link></td>
                        </tr>
                        <tr>
                            <td><Link to="#">별 다섯(이미지로 대체)</Link></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default ExerciseByLevel;