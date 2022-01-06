import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Spinner,
  Modal,
  Button,
  Form
} from 'react-bootstrap';
import {
  useParams
} from "react-router-dom";
import FormRenderer from "./FormRenderer";
import NotFound from "../NotFound";
const FORMS = require("../../controllers/forms");


/**
  Props:
    * setError
*/
const PublishedForm = (props) => {
  let { formId } = useParams();

  const[form, setForm] = useState();
  const[isLoading, setIsLoading] = useState(false);
  const[show, setShow] = useState(false);
  const[hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    getForm();
  }, []);

  const getForm = () => {
    const callback = (data, message) => {
      if(data === null) {
        props.setError(new Error(message));
      }
      else {
        if(Object.keys(data).length == 0) {
          setForm(null);
        }
        else {
          setForm(data);
        }
      }
    }
    FORMS.getPublishedForm(formId, callback, props.setError);
  }

  const onSubmit = (e, formSubmission) => {
    setIsLoading(true);
    const callback = (data, message) => {
      if(data === null) {
        props.setError(new Error(message));
      }
      else {
        setForm(data);
        setShow(true);
      }
      setIsLoading(false);
    }
    FORMS.handleSubmit(formId, formSubmission, callback, props.setError);
  }

  if(form === undefined) {
    return (
      <div style={{marginTop: "30px", textAlign: "center"}}>
        <Spinner animation="grow" />
      </div>
    );
  }
  if(form === null || !form.isPublished) {
    return (
      <NotFound />
    );
  }
  if(form.accessKey.trim().length > 0 && !hasAccess) {
    return (
      <Container>
        <br/>
        <br/>
        <Row style={{marginBottom: "8px", textAlign: "center"}}>
          <Col> <h2> Access Key Required </h2> </Col>
        </Row>
        <Row style={{marginBottom: "8px", textAlign: "center"}}>
          <Col sm={3}>
          </Col>
          <Col sm={6}>
            <Form.Control
              id="access-key-input"
              type="password"
            />
          </Col>
          <Col sm={3}>
          </Col>
        </Row>
        <Row style={{marginBottom: "8px", textAlign: "center"}}>
          <Col>
            <Button
              variant="info"
              onClick={() => {
                if(document.getElementById("access-key-input").value === form.accessKey) {
                  setHasAccess(true);
                }
                else {
                  alert("Invalid access key");
                }
              }}
            >
              Enter
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
  return (
    <Container>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title> Submission Successful ✔️ </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {form.submitMessage.trim().length > 0 ?
            <p> {form.submitMessage} </p>
          :
            <p> Thanks for submitting this form! </p>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => {window.location.href="/"}}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
      <br/>
      <br/>
      <Row>
        <Col>
          <FormRenderer form={form} mode="viewing" isLoading={isLoading} onSubmit={onSubmit} />
        </Col>
      </Row>
    </Container>
  );
}

export default PublishedForm;
