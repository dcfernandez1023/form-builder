import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Spinner,
  Card,
  Form,
  Button,
  Modal
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
const SubmissionHandlerModal = (props) => {
  const[form, setForm] = useState();
  const[show, setShow] = useState(false);
  const[isLoading, setIsLoading] = useState(false);
  const[handlers, setHandlers] = useState({});
  const[isSaved, setIsSaved] = useState(true);

  const EMAIL = "Email";
  const REST = "REST";
  const GSHEET = "Gsheet";

  const HANDLERS = [
    {
      name: "Email Handler",
      type: EMAIL,
      inputs: [
        {name: "receivers", display: "Email Address"}
      ],
      notes: "The email address you provide here will receive this form's submissions"
    },
    {
      name: "REST Handler",
      type: REST,
      inputs: [
        {name: "endpoint", display: "REST Endpoint"}
      ],
      notes: "The REST API endpoint you provide here will receive this form's submissions"
    },
    {
      name: "Google Sheet Handler",
      type: GSHEET,
      inputs: [
        {name: "gsheetId", display: "Google Sheet ID"}
      ],
      notes: <span> Paste your Google Sheet ID in the input and share your Google Sheet with <strong>formtosheets-gsheet-access@formtosheets-9a6d7.iam.gserviceaccount.com</strong> with edit access </span>
    }
  ];

  useEffect(() => {
    setForm(props.form);
    flattenHandlers(props.form.submissionHandlers);
    setShow(props.show);
    setIsLoading(props.isLoading);
  }, [props.form, props.show, props.isLoading]);

  const onSubmit = () => {
    props.onSubmit(props.onClose);
  }

  const flattenHandlers = (formHandlers) => {
    let flattenedHandlers = {};
    for(var i = 0; i < formHandlers.length; i++) {
      flattenedHandlers[formHandlers[i].type] = Object.assign({}, formHandlers[i]);
    }
    setHandlers(flattenedHandlers);
  }

  const isHandlerEnabled = (type) => {
    return handlers[type] !== undefined && handlers[type].isEnabled;
  }

  const onClose = () => {
    setIsSaved(true);
    props.onClose();
  }

  const editHandler = (type, isEnabled, value) => {
    let handlersCopy = Object.assign({}, handlers);
    let handler = handlersCopy[type];
    if(isEnabled !== undefined) {
      handler.isEnabled = isEnabled;
    }
    if(value !== undefined) {
      if(type === EMAIL) {
        handler.receivers = value;
      }
      else if(type === REST) {
        handler.endpoint = value;
      }
      else if(type === GSHEET) {
        handler.gsheetId = value;
      }
    }
    setIsSaved(false);
    setHandlers(handlersCopy);
  }

  const onSave = (e) => {
    let newHandlers = [];
    for(var key in handlers) {
      newHandlers.push(Object.assign({}, handlers[key]));
    }
    let formCopy = JSON.parse(JSON.stringify(form));
    formCopy.submissionHandlers = newHandlers;
    props.onChangeForm(formCopy);
    props.onSubmit(e, onClose, formCopy);
  }

  if(form === null || form === undefined) {
    return <div></div>;
  }
  return (
    <Modal show={show} onHide={onClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title> Submission Handlers </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          {HANDLERS.map((handler) => {
            let isChecked = isHandlerEnabled(handler.type);
            return (
              <Col md={6} key={handler.type} className="form-col-spacing">
                <Card
                  bg="light"
                  text="dark"
                  style={{height: "100%"}}
                >
                  <Card.Header>
                    <Row>
                      <Col sm={8}>
                        {handler.name}
                      </Col>
                      <Col sm={4}>
                        <Form.Check
                          type="switch"
                          id={handler.type + "-switch"}
                          label={isChecked ? "Enabled" : "Disabled"}
                          style={{float: "right"}}
                          checked={isChecked}
                          onChange={(e) => {editHandler(handler.type, e.target.checked, undefined)}}
                        />
                      </Col>
                    </Row>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col>
                        ℹ️ {handler.notes}
                      </Col>
                    </Row>
                    {handler.inputs.map((input) => {
                      return (
                        <Row key={input.name + "-row"} style={{marginTop: "8px"}}>
                          <Col>
                            <Form.Control
                              id={handler.type + "-handler-input"}
                              value={handlers[handler.type] === undefined ? "" : handlers[handler.type][input.name]}
                              placeholder={input.display}
                              onChange={(e) => {editHandler(handler.type, handler.isEnabled, e.target.value)}}
                            />
                          </Col>
                        </Row>
                      );
                    })}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
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

export default SubmissionHandlerModal;
