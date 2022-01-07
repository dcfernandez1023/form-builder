import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  ListGroup,
  Navbar,
  Nav,
  Dropdown,
  Button
} from 'react-bootstrap';
import AccountSettings from "./sub_components/AccountSettings";


/**
  Props:
    * user
    * showSettings
    * logout
*/
const AppNavbar = (props) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">
          Form Builder
        </Navbar.Brand>
        <Nav className = "mr-auto">
        </Nav>
        {props.user !== undefined && props.user !== null ?
          <Nav>
            <Dropdown>
              <Dropdown.Toggle
                variant="light"
                style={{margin: "1%", float: "right"}}
              >
                👤
              </Dropdown.Toggle>
              <Dropdown.Menu align="end" style={{border: "1px solid gray"}}>
                <Row>
                  <Col>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col xs ={12} style = {{textAlign: "center"}}>
                            Signed in as:
                          </Col>
                        </Row>
                        <Row>
                          <Col style = {{textAlign: "center"}}>
                            <strong> {props.user === undefined || props.user === null ? "" : props.user.email} </strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item action onClick={() => {props.setShowSettings(true)}}>
                        Account Settings
                      </ListGroup.Item>
                      <ListGroup.Item action onClick={props.logout}>
                        Signout
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
          :
          <Nav>

          </Nav>
        }
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
