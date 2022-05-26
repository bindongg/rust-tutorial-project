import React from "react";
import { Table, NavLink } from "react-bootstrap";
import {Link} from "react-router-dom";

function Exercise() {
  return (
    <>
      <div className="col-10 mx-auto pt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>번호</th>
              <th>문제명</th>
              <th>출처</th>
              <th>AC</th>
              <th>제출</th>
              <th>성공률</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1001</td>
              <td><Link to="#">[기초-출력] 출력하기01(설명)</Link></td>
              <td>기초100제</td>
              <td>238467</td>
              <td>438634</td>
              <td>54.4%</td>
            </tr>
            <tr>
              <td>1002</td>
              <td><Link to="#">[기초-출력] 출력하기01(설명)</Link></td>              
              <td>기초100제</td>
              <td>238467</td>
              <td>438634</td>
              <td>54.4%</td>
            </tr>
            <tr>
              <td>1003</td>
              <td><Link to="#">[기초-출력] 출력하기01(설명)</Link></td>              
              <td>기초100제</td>
              <td>238467</td>
              <td>438634</td>
              <td>54.4%</td>
            </tr>
            <tr>
              <td>1004</td>
              <td><Link to="#">[기초-출력] 출력하기01(설명)</Link></td>              
              <td>기초100제</td>
              <td>238467</td>
              <td>438634</td>
              <td>54.4%</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Exercise;