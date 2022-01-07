import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Spinner,
  Form,
  Button
} from 'react-bootstrap';
const AUTH = require("../controllers/auth");


/**
  Props:
    * registrationData
*/
const VerifyEmail = (props) => {
  const[token, setToken] = useState("");
  const[isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    if(token.trim().length == 0) {
      alert("Please enter the verification code");
      return;
    }
    setIsLoading(true);
    const callback = () => {
      window.location.href = "/";
    }
    const onError = (error) => {
      setIsLoading(false);
      if(error.isAxiosError) {
        alert(error.response.data.message);
      }
      else {
        alert(error.message);
      }
    }
    AUTH.register(
      props.registrationData.email,
      props.registrationData.password,
      props.registrationData.firstName,
      props.registrationData.lastName,
      token,
      callback,
      onError
    );
  }

  return (
    <Container>
      <br/>
      <Row>
        <Col style={{textAlign: "center"}}>
          A verification code was sent to <strong>{props.registrationData.email}</strong>
        </Col>
      </Row>
      <br/>
      <Row>
        <Col sm={3}>
        </Col>
        <Col sm={6} style={{textAlign: "center"}}>
          <Form.Control
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter code"
          />
        </Col>
        <Col sm={3}>
        </Col>
      </Row>
      <br/>
      <Row>
        <Col style={{textAlign: "center"}}>
          <Button variant="info" onClick={onSubmit} disabled={isLoading}>
            {isLoading ?
              <Spinner as="span" size="sm" animation="border" style={{marginRight: "8px"}}/>
            :
              <span></span>
            }
            Enter
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default VerifyEmail;
