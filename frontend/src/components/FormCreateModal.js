import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Modal,
  Button,
  Form,
  Spinner
} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


/**
  Props:
    * show
    * isLoading
    * onClose
    * onSubmit - gets called as onSubmit(title)
*/
const FormCreateModal = (props) => {
  const[show, setShow] = useState(false);
  const[isLoading, setIsLoading] = useState(false);
  const[title, setTitle] = useState("");

  useEffect(() => {
    setShow(props.show);
    setIsLoading(props.isLoading);
  }, [props.show, props.isLoading]);

  return (
    <Modal show={show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title> New Form </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={3}></Col>
          <Col xs={6}>
            <Form.Label> Title </Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {setTitle(e.target.value)}}
            />
          </Col>
          <Col xs={3}></Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="info" disabled={isLoading} onClick={() => {props.onSubmit(title)}}>
          {isLoading ?
            <Spinner as="span" size="sm" animation="border" style={{marginRight: "8px"}}/>
          :
            <span></span>
          }
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FormCreateModal;
