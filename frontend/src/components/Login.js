import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  FloatingLabel,
  Tabs,
  Tab,
  Figure,
  Button,
  Spinner
} from 'react-bootstrap';
import VerifyEmail from "./VerifyEmail";
import ResetPassword from "./ResetPassword";
const AUTH = require("../controllers/auth");


const Login = (props) => {
  const[loginEmail, setLoginEmail] = useState("");
  const[loginPassword, setLoginPassword] = useState("");

  const[registerEmail, setRegisterEmail] = useState("");
  const[registerPassword, setRegisterPassword] = useState("");
  const[registerFirstName, setRegisterFirstName] = useState("");
  const[registerLastName, setRegisterLastName] = useState("");

  const[isLoading, setIsLoading] = useState(false);
  const[isVerifying, setIsVerifying] = useState(false);
  const[resetPassword, setResetPassword] = useState(false);

  const onRegister = () => {
    if(registerEmail.trim().length == 0) {
      alert("Please enter your registration email");
      return;
    }
    if(registerPassword.trim().length == 0) {
      alert("Please enter your registration password");
      return;
    }
    if(registerFirstName.trim().length == 0) {
      alert("Please enter your first name");
      return;
    }
    if(registerLastName.trim().length == 0) {
      alert("Please enter your last name");
      return;
    }
    setIsLoading(true);
    const callback = () => {
      setIsVerifying(true);
      setIsLoading(false);
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
    AUTH.verifyRegistrationEmail(registerEmail, callback, onError);
  }

  const onLogin = () => {
    if(loginEmail.trim().length == 0) {
      alert("Please enter your login email");
      return;
    }
    if(loginPassword.trim().length == 0) {
      alert("Please enter your login password");
      return;
    }
    setIsLoading(true);
    AUTH.login(
      loginEmail,
      loginPassword,
     (isSuccess, errorMsg) => {
        if(errorMsg) {
          alert(errorMsg);
          setIsLoading(false);
        } else {
          window.location.href = "/";
        }
      },
      (error) => {
        alert(error.message);
        setIsLoading(false);
      }
    );
  }

  if(isVerifying) {
    return (
      <VerifyEmail
        registrationData={{email: registerEmail, password: registerPassword, firstName: registerFirstName, lastName: registerLastName}}
      />
    );
  }
  if(resetPassword) {
    return (
      <ResetPassword />
    );
  }
  return (
    <Container>
      <div style={{height: "100px"}}></div>
      <Row>
        {/* Login inputs */}
        <Col sm={6} className="my-auto">
          <h1> Build and Host Online Forms </h1>
          <br/>
          <Tabs defaultActiveKey="login" id="login-tabs">
            {/* Login tab */}
            <Tab eventKey="login" title="Login">
              <br/>
              <Row>
                <Col md={6} style={{marginBottom: "12px"}}>
                  <FloatingLabel controlId="login-email" label="Email">
                    <Form.Control
                      type="text"
                      onChange={(e) => {
                        setLoginEmail(e.target.value);
                      }}
                    />
                  </FloatingLabel>
                </Col>
                <Col md={6} style={{marginBottom: "12px"}}>
                  <FloatingLabel controlId="login-password" label="Password">
                    <Form.Control
                      type="password"
                      onChange={(e) => {
                        setLoginPassword(e.target.value);
                      }}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <Row style={{marginTop: "8px"}}>
                <Col style={{textAlign: "center"}}>
                  <Button variant="info" disabled={isLoading} onClick={onLogin}>
                    {isLoading ?
                      <Spinner as="span" size="sm" animation="border" style={{marginRight: "8px"}}/>
                    :
                      <span></span>
                    }
                    Login
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col style={{textAlign: "center"}}>
                  <Button variant="link" onClick={() => setResetPassword(true)}>
                    Forgot Password?
                  </Button>
                </Col>
              </Row>
            </Tab>
            {/* Register tab */}
            <Tab eventKey="register" title="Register">
              <br/>
              {/* Register email and password Row */}
              <Row>
                <Col md={6} style={{marginBottom: "12px"}}>
                  <FloatingLabel controlId="register-email" label="Email">
                    <Form.Control
                      type="text"
                      onChange={(e) => {
                        setRegisterEmail(e.target.value);
                      }}
                    />
                  </FloatingLabel>
                </Col>
                <Col md={6} style={{marginBottom: "12px"}}>
                  <FloatingLabel controlId="register-password" label="Password">
                    <Form.Control
                      type="password"
                      onChange={(e) => {
                        setRegisterPassword(e.target.value);
                      }}
                    />
                  </FloatingLabel>
                </Col>
                {/* Register first name and last name Row */}
                <Col md={6} style={{marginBottom: "12px"}}>
                  <FloatingLabel controlId="register-first" label="First Name">
                    <Form.Control
                      type="text"
                      onChange={(e) => {
                        setRegisterFirstName(e.target.value);
                      }}
                    />
                  </FloatingLabel>
                </Col>
                <Col md={6} style={{marginBottom: "12px"}}>
                  <FloatingLabel controlId="register-last" label="Last Name">
                    <Form.Control
                      type="text"
                      onChange={(e) => {
                        setRegisterLastName(e.target.value);
                      }}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <Row style={{marginTop: "8px"}}>
                <Col style={{textAlign: "center"}}>
                  <Button variant="info" disabled={isLoading} onClick={onRegister}>
                    {isLoading ?
                      <Spinner as="span" size="sm" animation="border" style={{marginRight: "8px"}}/>
                    :
                      <span></span>
                    }
                    Register
                  </Button>
                </Col>
              </Row>
              <br/>
            </Tab>
          </Tabs>
        </Col>
        {/* Landing page image */}
        <Col sm={6} style={{textAlign: "center"}}>
          <Figure>
            <Figure.Image
              width={575}
              src="/landing_image.jpg"
            />
          </Figure>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
