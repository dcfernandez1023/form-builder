import FormRenderer from "./FormRenderer";
import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Modal
} from 'react-bootstrap';


/**
  Props:
    * form
    * onBack
*/
const Preview = (props) => {
  const[show, setShow] = useState(false);

  const openModal = () => {
    setShow(true);
  }

  const closeModal = () => {
    setShow(false);
  }

  return (
    <Container>
      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title> Form Submission Successful </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Since you are only previewing your form,
          nothing happened by submitting this form, but you can configure your form
          to send its submission data to a variety of places and publish it so that
          it can be accessible by others on the web.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={closeModal}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
      <Row>
        <Col style={{textAlign: "left"}}>
          <Button variant="secondary" onClick={props.onBack}> Back </Button>
        </Col>
      </Row>
      <br/>
      <Row>
        <Col>
          <FormRenderer form={props.form} mode="viewing" onSubmit={openModal} />
        </Col>
      </Row>
    </Container>
  );
}

export default Preview;
