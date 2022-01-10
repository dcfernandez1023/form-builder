import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Spinner
} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from "./components/Login";
import AppNavbar from "./components/AppNavbar";
import ErrorComponent from "./components/ErrorComponent";
import Main from "./Main";
import NotFound from "./components/NotFound";
import FormBuilder from "./components/FormBuilder";
import PublishedForm from "./components/sub_components/PublishedForm";
import AccountSettings from "./components/sub_components/AccountSettings";

const AUTH = require("./controllers/auth");


function App() {
  const[user, setUser] = useState();
  const[componentError, setComponentError] = useState();
  const[showSettings, setShowSettings] = useState(false);
  const[isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    AUTH.getUser(setUser, () => {setUser(null)});
  }, []);

  if(componentError !== undefined) {
    return (
      <ErrorComponent message={componentError.isAxiosError ? componentError.response.data.message : componentError.message}/>
    );
  }

  const updateUser = (updatedUser, childCallback, childOnError) => {
    setIsSaving(true);
    const callback = (data) => {
      if(data.email === undefined) {
        data.email = user.email;
      }
      setUser(data);
      childCallback();
    }
    AUTH.updateUser(updatedUser, callback, childOnError);
  }

  const updatePassword = (email, newPassword, childCallback, childOnError) => {
    setIsSaving(true);
    AUTH.resetPassword(email, newPassword, childCallback, childOnError);
  }

  const afterAccountSettingsSubmit = () => {
    setIsSaving(false);
  }

  const deleteUser = (password, childOnError) => {
    setIsSaving(true);
    AUTH.deleteUser(password, AUTH.logout, childOnError);
  }

  const pipe = <span style={{marginLeft: "5px", marginRight: "5px"}}> | </span>;

  return (
    <div>
      <div>
        <AccountSettings
          user={user}
          show={showSettings}
          isLoading={isSaving}
          updateUser={updateUser}
          updatePassword={updatePassword}
          deleteUser={deleteUser}
          afterSubmit={afterAccountSettingsSubmit}
          onClose={() => {setShowSettings(false)}}
          setError={setComponentError}
        />
        <AppNavbar user={user} logout={AUTH.logout} setShowSettings={setShowSettings}/>
        {user === undefined ?
          <div style={{marginTop: "30px", textAlign: "center"}}>
            <Spinner animation="grow" />
          </div>
        :
          <div>
            <Router>
              <Routes>
                <Route path="/" element={<Main user={user} setError={setComponentError} />} />
                <Route path="/formBuilder/:formId" element={<FormBuilder user={user} setError={setComponentError} />} />
                <Route path="/form/:formId" element={<PublishedForm setError={setComponentError} />} />
                <Route path="*" element={<NotFound />}/>
              </Routes>
            </Router>
          </div>
        }
        <br/>
        <br/>
      </div>
      <footer id="footer">
        <Container>
          <Row style={{marginTop: "8px", marginBottom: "8px"}}>
            <Col sm={4}>
              Made with ❤️ by <a style={{textDecoration: "none"}} href="https://github.com/dcfernandez1023" target="_blank">dcfernandez1023</a>
            </Col>
            <Col sm={8} style={{textAlign: "right"}}>
              <span>
                <a style={{textDecoration: "none"}} href="https://github.com/dcfernandez1023/form-builder#changelog" target="_blank">Changelog 📝</a>
              </span>
              {pipe}
              <span>
                <a style={{textDecoration: "none"}} href="https://github.com/dcfernandez1023/form-builder" target="_blank">Code <img style={{marginBottom: "2px", height: "20px", width: "20px"}} src="/github.png" /></a>
              </span>
              {pipe}
              <span>
                <a style={{textDecoration: "none"}} href="http://localhost:5000/form/91badde3-9070-401a-b8d1-e591cdd80d0a" target="_blank">Submit Feedback ✏️</a>
              </span>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default App;
