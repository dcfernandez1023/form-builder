import React, { useState, useEffect } from 'react';
import {
  Spinner,
  Button,
  Modal
} from 'react-bootstrap';


/**
  Props:
    * isLoading
    * show
    * onClose
    * onSubmit
*/
const DeleteFormModal = (props) => {
  const[show, setShow] = useState(false);
  const[isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setShow(props.show);
    setIsLoading(props.isLoading);
  }, [props.show, props.isLoading]);

  return (
    <Modal show={show} onHide={props.onClose}>
      <Modal.Header closeButton> <Modal.Title> Delete Form </Modal.Title> </Modal.Header>
      <Modal.Body> Are you sure you want to delete this form? </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onSubmit}> Yes </Button>
        <Button variant="secondary" onClick={props.onClose}> No </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteFormModal;
