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
    * email
*/
const ResetPassword = (props) => {
  const[step, setStep] = useState("email");
  const[isLoading, setIsLoading] = useState(false);
  const[token, setToken] = useState("");
  const[email, setEmail] = useState("");

  const[newPassword, setNewPassword] = useState("");
  const[confirm, setConfirm] = useState("");

  const onSubmitEmail = () => {
    if(email.trim().length == 0) {
      alert("Please enter your email");
      return;
    }
    setIsLoading(true);
    const callback = () => {
      setIsLoading(false);
      setStep("token");
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
    AUTH.sendForgotPasswordEmail(email, callback, onError);
  }

  const onSubmitToken = () => {
    if(token.trim().length == 0) {
      alert("Please enter the verification code");
      return;
    }
    setIsLoading(true);
    const callback = (isValid) => {
      setIsLoading(false);
      if(isValid) {
        setStep("password");
      }
      else {
        alert("Token invalid");
      }
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
    AUTH.validateAccessToken(token, callback, onError);
  }

  const onSubmitPassword = () => {
    if(newPassword.trim().length == 0) {
      alert("Password cannot be blank");
      return;
    }
    if(newPassword !== confirm) {
      alert("Passwords don't match");
      return;
    }
    setIsLoading(true);
    const callback = () => {
      AUTH.logout();
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
    AUTH.resetPassword(email, newPassword, callback, onError, token);
  }

  if(step === "email") {
    return (
      <Container>
        <br/>
        <Row>
          <Col style={{textAlign: "center"}}>
            Enter your email
          </Col>
        </Row>
        <br/>
        <Row>
          <Col sm={3}>
          </Col>
          <Col sm={6} style={{textAlign: "center"}}>
            <Form.Control
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
          <Col sm={3}>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col style={{textAlign: "center"}}>
            <Button variant="info" onClick={onSubmitEmail} disabled={isLoading}>
              {isLoading ?
                <Spinner as="span" size="sm" animation="border" style={{marginRight: "8px"}}/>
              :
                <span></span>
              }
              Submit
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
  if(step === "token") {
    return (
      <Container>
        <br/>
        <Row>
          <Col style={{textAlign: "center"}}>
            A verification code was sent to <strong>{email}</strong>
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
            <Button variant="info" onClick={onSubmitToken} disabled={isLoading}>
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
  return (
    <Container>
      <br/>
      <Row>
        <Col sm={3}>
        </Col>
        <Col sm={6} style={{textAlign: "center"}}>
          <Row>
            <Col md={6}>
              <Form.Label> New Password </Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Col>
            <Col md={6}>
              <Form.Label> Confirm Password </Form.Label>
              <Form.Control
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </Col>
          </Row>
        </Col>
        <Col sm={3}>
        </Col>
      </Row>
      <br/>
      <Row>
        <Col style={{textAlign: "center"}}>
          <Button variant="info" onClick={onSubmitPassword} disabled={isLoading}>
            {isLoading ?
              <Spinner as="span" size="sm" animation="border" style={{marginRight: "8px"}}/>
            :
              <span></span>
            }
            Change Password
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ResetPassword;
