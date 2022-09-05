import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

function ExerciseByTag() {
  return (
    <>
      <div className="col-10 mx-auto pt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>종류</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><Link to="/exercise/tag/입출력">입출력</Link></td>
            </tr>
            <tr>
              <td><Link to="/exercise/tag/제어문">제어문</Link></td>
            </tr>
            <tr>
              <td><Link to="/exercise/tag/반복문">반복문</Link></td>
            </tr>
            <tr>
              <td><Link to="/exercise/tag/자료구조">자료구조</Link></td>
            </tr>
            <tr>
              <td><Link to="/exercise/tag/기타">기타</Link></td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default ExerciseByTag;