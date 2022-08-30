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
              <td><Link to="/exercise">입출력</Link></td>
              <td>10</td>
            </tr>
            <tr>
              <td><Link to="#">제어문</Link></td>
              <td>10</td>
            </tr>
            <tr>
              <td><Link to="#">반복문</Link></td>
              <td>10</td>
            </tr>
            <tr>
              <td><Link to="#">자료구조</Link></td>
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