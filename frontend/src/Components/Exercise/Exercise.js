import React from "react";
import { Table } from "react-bootstrap";
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
              <th>종류</th>
              <th>난이도</th>
              <th>정보</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><Link to="">1001</Link></td>
              <td><Link to="/exercise/1">[기초-출력] 출력하기01(설명)</Link></td>
              <td>종류</td>
              <td>난이도</td>
              <td>성공</td>
            </tr>
            <tr>
              <td><Link to="">1001</Link></td>
              <td><Link to="#">[기초-출력] 출력하기01(설명)</Link></td>
              <td>종류</td>
              <td>난이도</td>
              <td>실패</td>
            </tr>
            <tr>
              <td><Link to="">1001</Link></td>
              <td><Link to="#">[기초-출력] 출력하기01(설명)</Link></td>
              <td>종류</td>
              <td>난이도</td>
              <td>성공</td>
            </tr>
            <tr>
              <td><Link to="">1001</Link></td>
              <td><Link to="#">[기초-출력] 출력하기01(설명)</Link></td>
              <td>종류</td>
              <td>난이도</td>
              <td>성공</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Exercise;