import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Spinner,
  Button,
  Modal,
  Form
} from 'react-bootstrap';


/**
  Props:
    * form
    * show
    * isLoading
    * onChangeForm
    * onClose
    * onSubmit
*/
const CustomModal = (props) => {
  const[form, setForm] = useState();
  const[show, setShow] = useState(false);
  const[isLoading, setIsLoading] = useState(false);
  const[isSaved, setIsSaved] = useState(true);
  const[accessKey, setAccessKey] = useState("");
  const[submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    setForm(props.form);
    setShow(props.show);
    setIsLoading(props.isLoading);
    setAccessKey(props.form.accessKey);
    setSubmitMessage(props.form.submitMessage);
  }, [props.form, props.show, props.isLoading]);

  const onClose = () => {
    setIsSaved(true);
    props.onClose();
  }

  const onSave = (e) => {
    let formCopy = JSON.parse(JSON.stringify(form));
    formCopy.accessKey = accessKey;
    formCopy.submitMessage = submitMessage;
    props.onChangeForm(formCopy);
    props.onSubmit(e, onClose, formCopy);
  }

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title> Customize </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={12} style={{marginBottom: "20px"}}>
            <Form.Label> 🔒 <strong>Access Key</strong> - <small> <i> Users will have to enter this access key before being able to view your form </i> </small> </Form.Label>
            <Form.Control
              type="text"
              value={accessKey}
              onChange={(e) => {
                setIsSaved(false);
                setAccessKey(e.target.value);
              }}
            />
          </Col>
          <Col md={12}>
            <Form.Label> ❤️ <strong>Form Submission Message</strong> - <small> <i> The message you want to display to users after their submission </i> </small> </Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                placeholder="i.e. Thanks for submitting my form!"
                rows={4}
                value={submitMessage}
                onChange={(e) => {
                  setIsSaved(false);
                  setSubmitMessage(e.target.value);
                }}
              />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>
        Close
      </Button>
      <Button variant="success" disabled={isSaved || props.isLoading} onClick={(e) => {onSave(e)}}>
        {props.isLoading ?
          <Spinner as="span" size="sm" animation="border" style={{marginRight: "8px"}}/>
        :
          <span></span>
        }
        Save
      </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CustomModal;
