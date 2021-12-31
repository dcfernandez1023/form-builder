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
const AUTH = require("../controllers/auth");


const Login = (props) => {
  const[loginEmail, setLoginEmail] = useState("");
  const[loginPassword, setLoginPassword] = useState("");

  const[registerEmail, setRegisterEmail] = useState("");
  const[registerPassword, setRegisterPassword] = useState("");
  const[registerFirstName, setRegisterFirstName] = useState("");
  const[registerLastName, setRegisterLastName] = useState("");

  const[isLoading, setIsLoading] = useState(false);

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
                <Col md={6}>
                  <FloatingLabel controlId="login-email" label="Email">
                    <Form.Control
                      type="text"
                      onChange={(e) => {
                        setLoginEmail(e.target.value);
                      }}
                    />
                  </FloatingLabel>
                </Col>
                <Col md={6}>
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
              <br/>
              <Row>
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
              <br/>
            </Tab>
            {/* Register tab */}
            <Tab eventKey="register" title="Register">
              <br/>
              {/* Register email and password Row */}
              <Row>
                <Col md={6}>
                  <FloatingLabel controlId="register-email" label="Email">
                    <Form.Control
                      type="text"
                      onChange={(e) => {
                        setRegisterEmail(e.target.value);
                      }}
                    />
                  </FloatingLabel>
                </Col>
                <Col md={6}>
                  <FloatingLabel controlId="register-password" label="Password">
                    <Form.Control
                      type="password"
                      onChange={(e) => {
                        setRegisterPassword(e.target.value);
                      }}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <br/>
              {/* Register first name and last name Row */}
              <Row>
                <Col md={6}>
                  <FloatingLabel controlId="register-first" label="First Name">
                    <Form.Control
                      type="text"
                      onChange={(e) => {
                        setRegisterFirstName(e.target.value);
                      }}
                    />
                  </FloatingLabel>
                </Col>
                <Col md={6}>
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
              <br/>
              <Row>
                <Col style={{textAlign: "center"}}>
                  <Button variant="info" disabled={isLoading}>
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
              width={500}
              src="form_landing.jpg"
            />
          </Figure>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
