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
              <th>문제 수</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><Link to="#">우선순위 큐</Link></td>
              <td>10</td>
            </tr>
            <tr>
              <td><Link to="#">그래프</Link></td>
              <td>10</td>
            </tr>
            <tr>
              <td><Link to="#">스택</Link></td>
              <td>10</td>
            </tr>
            <tr>
              <td><Link to="#">기타</Link></td>
              <td>10</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default ExerciseByTag;