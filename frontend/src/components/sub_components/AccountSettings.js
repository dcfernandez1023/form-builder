import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Spinner,
  Modal,
  Button,
  Form,
  Tabs,
  Tab,
  Alert
} from 'react-bootstrap';


/**
  Props:
    * user
    * show
    * isLoading
    * updateUser
    * updatePassword
    * afterSubmit
    * onClose
    * setError
*/
const AccountSettings = (props) => {
  const[user, setUser] = useState();
  const[newPassword, setNewPassword] = useState("");
  const[confirm, setConfirm] = useState("");
  const[showAlert, setShowAlert] = useState(false);
  const[alertVariant, setAlertVariant] = useState("");
  const[alertMsg, setAlertMsg] = useState("");
  const[deletePassword, setDeletePassword] = useState("");

  useEffect(() => {
    setUser(props.user);
  }, [props.show, props.isLoading]);

  const onChangeUser = (key, value) => {
    let copy = Object.assign({}, user);
    copy[key] = value;
    setUser(copy);
  }

  const notifySuccess = (msg) => {
    setAlertVariant("success");
    setAlertMsg(msg);
    setShowAlert(true);
    props.afterSubmit();
  }

  const onClose = () => {
    setNewPassword("");
    setConfirm("");
    setAlertVariant("");
    setAlertMsg("");
    setShowAlert(false);
    props.onClose();
  }

  const onError = (error) => {
    props.afterSubmit();
    if(error.isAxiosError) {
      if(error.statusCode == 401) {
        props.setError(error);
      }
      else {
        setAlertVariant("danger");
        setAlertMsg(error.response.data.message);
        setShowAlert(true);
      }
    }
    else {
      props.setError(error);
    }
  }

  const updateUser = () => {
    if(user.email.trim().length == 0 || user.firstName.trim().length == 0 || user.lastName.trim().length == 0) {
      alert("Email, first name, and last name cannot be blank");
      return;
    }
    const onSuccess = () => {
      notifySuccess("Successfully updated user info");
    }
    let updatedUser = Object.assign({}, user);
    if(updatedUser.email.trim() === props.user.email.trim()) {
      delete updatedUser.email;
    }
    props.updateUser(updatedUser, onSuccess, onError);
  }

  const updatePassword = () => {
    if(newPassword.trim().length == 0) {
      alert("Password cannot be empty");
      return;
    }
    if(newPassword !== confirm) {
      alert("Passwords don't match");
      return;
    }
    const onSuccess = () => {
      setNewPassword("");
      setConfirm("");
      notifySuccess("Successfully changed password");
    }
    props.updatePassword(user.email, newPassword, onSuccess, onClose);
  }

  const deleteUser = () => {
    props.deleteUser(deletePassword, onError);
  }

  if(user === null || user === undefined) {
    return <div></div>;
  }
  return (
    <Modal show={props.show} onHide={onClose}>
      <Modal.Header>
        <Modal.Title> Account Settings </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showAlert ?
          <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
            {alertMsg}
          </Alert>
        :
          <span></span>
        }
        <Tabs defaultActiveKey="profile">
          <Tab eventKey="profile" title="Profile">
            <br/>
            <Row>
              {/*
              <Col md={6} style={{marginBottom: "8px"}}>
                <Form.Label> Email </Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={(e) => {onChangeUser(e.target.name, e.target.value)}}
                />
              </Col>
              */}
              <Col md={6} style={{marginBottom: "8px"}}>
                <Form.Label> First Name </Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={user.firstName}
                  onChange={(e) => {onChangeUser(e.target.name, e.target.value)}}
                />
              </Col>
              <Col md={6} style={{marginBottom: "8px"}}>
                <Form.Label> Last Name </Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={user.lastName}
                  onChange={(e) => {onChangeUser(e.target.name, e.target.value)}}
                />
              </Col>
            </Row>
            <br/>
            <Row>
              <Col style={{textAlign: "center"}}>
                <Button variant="success" disabled={props.isLoading} onClick={updateUser}>
                  {props.isLoading ?
                    <Spinner as="span" size="sm" animation="border" style={{marginRight: "8px"}}/>
                  :
                    <span></span>
                  }
                  Update
                </Button>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="password" title="Change Password">
            <br/>
            <Row>
              <Col md={6} style={{marginBottom: "8px"}}>
                <Form.Label> New Password </Form.Label>
                <Form.Control
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => {setNewPassword(e.target.value)}}
                />
              </Col>
              <Col md={6} style={{marginBottom: "8px"}}>
                <Form.Label> Confirm New Password </Form.Label>
                <Form.Control
                  type="password"
                  name="confirm"
                  value={confirm}
                  onChange={(e) => {setConfirm(e.target.value)}}
                />
              </Col>
            </Row>
            <br/>
            <Row>
              <Col style={{textAlign: "center"}}>
                <Button variant="success" disabled={props.isLoading} onClick={updatePassword}>
                  {props.isLoading ?
                    <Spinner as="span" size="sm" animation="border" style={{marginRight: "8px"}}/>
                  :
                    <span></span>
                  }
                  Update
                </Button>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="delete" title="Delete Account">
            <br/>
            <Row>
              <Col style={{textAlign: "center"}}>
                <h5> Are you sure you want to delete your account? </h5>
                <br/>
                <Form.Control
                  type="password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  placeholder="Password"
                />
                <br/>
                <Button variant="danger" onClick={deleteUser} disabled={deletePassword.trim().length == 0 || props.isLoading}>
                  {props.isLoading ?
                    <Spinner as="span" size="sm" animation="border" style={{marginRight: "8px"}}/>
                  :
                    <span></span>
                  }
                  Yes, Delete
                </Button>
              </Col>
            </Row>
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}> Close </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AccountSettings;
