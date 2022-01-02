import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Spinner,
  Button
} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams
} from "react-router-dom";
import NotFound from "./NotFound";
import ElementSelector from "./sub_components/ElementSelector";
import FormRenderer from "./sub_components/FormRenderer";
import ElementEditor from "./sub_components/ElementEditor";
const FORMS = require("../controllers/forms");


/**
  Props:
    * setError
*/
const FormBuilder = (props) => {
  let { formId } = useParams();

  const[form, setForm] = useState();
  const[selectedElement, setSelectedElement] = useState();
  const[selectedIndex, setSelectedIndex] = useState(-1);
  const[isSaved, setIsSaved] = useState(true);

  useEffect(() => {
    getForm();
  }, []);

  const getForm = () => {
    /*
      If user could not be retrieved from server, then the user is not logged
      in, so redirect to login page and do not attempt to get form from server
    */
    if(props.user === null || props.user === undefined) {
      window.location.href = "/";
      return;
    }
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
    FORMS.getForm(formId, callback, props.setError);
  }

  const onChangeForm = (updatedForm) => {
    setForm(updatedForm);
    setIsSaved(false);
  }

  if(form === undefined) {
    return (
      <div style={{marginTop: "30px", textAlign: "center"}}>
        <Spinner animation="border" />
      </div>
    );
  }
  if(form === null) {
    return (
      <NotFound />
    );
  }
  return (
    <Container fluid>
      <br/>
      {/* Action bar */}
      <Row>
        <Col style={{textAlign: "right"}}>
          <Button variant="info" style={{marginRight: "10px"}}> Actions </Button>
          <Button variant="info" disabled={isSaved}> Save </Button>
        </Col>
      </Row>
      <br/>
      {/* Form editor */}
      <Row style={{minHeight: "50vh"}}>
        {/* Element selector */}
        <Col xs={2} style={{borderRight: "1px solid lightGray"}}>
          <ElementSelector form={form} selectedElement={selectedElement} onSelectElement={setSelectedElement} onChangeForm={onChangeForm} setSelectedIndex={setSelectedIndex} />
        </Col>
        {/* Form renderer */}
        <Col xs={8}>
          <FormRenderer form={form} selectedElement={selectedElement} />
        </Col>
        {/* Element editor */}
        <Col xs={2} style={{borderLeft: "1px solid lightGray"}}>
          <ElementEditor form={form} onChangeForm={onChangeForm} selectedElement={selectedElement} onChangeSelectedElement={setSelectedElement} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
        </Col>
      </Row>
    </Container>
  );
}

export default FormBuilder;
