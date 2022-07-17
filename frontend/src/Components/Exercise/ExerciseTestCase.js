import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

/**
 *
 * @param Testcase
 * {
 *    "id": 1,
 *    "number": 1,
 *    "input": "1",
 *    "output": "1"
 *  }
 */
function ExerciseTestCase({Testcase}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const testcaseNum = Testcase?.number;

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        테스트 케이스 {testcaseNum}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>테스트 케이스 {testcaseNum}</Modal.Title>
        </Modal.Header>
        <Modal.Body>입력: {Testcase?.input}</Modal.Body>
        <Modal.Body>출력: {Testcase?.output}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ExerciseTestCase;