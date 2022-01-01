import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Spinner,
  ListGroup,
  Badge,
  Button
} from 'react-bootstrap';
import Forms from "./sub_components/Forms";
import FormCreateModal from "./FormCreateModal";
const FORMS = require("../controllers/forms");


/**
  Props:
    * setError
*/
const Home = (props) => {
  const[forms, setForms] = useState();
  const[showCreateModal, setShowCreateModal] = useState(false);
  const[isCreating, setIsCreating] = useState(false);

  const onGetFormsResponse = (data, message) => {
    if(data === null) {
      props.setError(new Error(message));
    }
    else {
      setForms(data);
    }
  }

  const onCreateForm = (title) => {
    if(title.trim().length == 0) {
      alert("Please enter a title for your form");
      return;
    }
    setIsCreating(true);
    const callback = (data, message) => {
      if(data === null) {
        alert(message);
      }
      else {
        // TODO: navigate to newly created form page
        let formsCopy = forms.slice();
        formsCopy.push(data);
        setForms(formsCopy);
      }
      setShowCreateModal(false);
      setIsCreating(false);
    }
    FORMS.createForm(title, callback, props.setError);
  }

  useEffect(() => {
    FORMS.getForms(onGetFormsResponse, props.setError);
  }, []);

  console.log("in home");
  if(forms === undefined) {
    return (
      <div style={{marginTop: "30px", textAlign: "center"}}>
        <Spinner animation="border" />
      </div>
    );
  }
  return (
    <Container>
      <FormCreateModal
        show={showCreateModal}
        isLoading={isCreating}
        onClose={() => {
          setShowCreateModal(false);
          setIsCreating(false);
        }}
        onSubmit={onCreateForm}
      />
      <br/>
      <br/>
      <Row>
        <Col sm={1}></Col>
        <Col sm={10}>
          <Row>
            <Col xs={8}>
              <h2> Your Forms </h2>
            </Col>
            <Col xs={4} style={{textAlign: "right"}}>
              <Button variant="info" onClick={() => setShowCreateModal(true)}> + </Button>
            </Col>
          </Row>
          <div style={{marginTop: "10px"}}>
            <Forms forms={forms} />
          </div>
        </Col>
        <Col sm={1}></Col>
      </Row>
    </Container>
  );
}

export default Home;
