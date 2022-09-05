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
                            <td><Link to="/exercise/level/STAR1">⭐</Link></td>
                        </tr>
                        <tr>
                            <td><Link to="/exercise/level/STAR2">⭐⭐</Link></td>
                        </tr>
                        <tr>
                            <td><Link to="/exercise/level/STAR3">⭐⭐⭐</Link></td>
                        </tr>
                        <tr>
                            <td><Link to="/exercise/level/STAR4">⭐⭐⭐⭐</Link></td>
                        </tr>
                        <tr>
                            <td><Link to="/exercise/level/STAR5">⭐⭐⭐⭐⭐</Link></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default ExerciseByLevel;