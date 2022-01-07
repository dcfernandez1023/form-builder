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

const AUTH = require("./controllers/auth");


function App() {
  const[user, setUser] = useState();
  const[componentError, setComponentError] = useState();

  useEffect(() => {
    AUTH.getUser(setUser, () => {setUser(null)});
  }, []);

  if(componentError !== undefined) {
    return (
      <ErrorComponent message={componentError.isAxiosError ? componentError.response.data.message : componentError.message}/>
    );
  }

  const pipe = <span style={{marginLeft: "5px", marginRight: "5px"}}> | </span>;

  return (
    <div>
      <div>
        <AppNavbar user={user} logout={AUTH.logout} />
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
          <div style={{marginTop: "8px"}}>
            <span style={{float: "left"}}>
              Made with ❤️ by <a style={{textDecoration: "none"}} href="https://github.com/dcfernandez1023" target="_blank">dcfernandez1023</a>
            </span>
            <span style={{float: "right"}}>
              <span>
                <a style={{textDecoration: "none"}} href="https://github.com/dcfernandez1023/form-builder#changelog" target="_blank">Changelog 📝</a>
              </span>
              {pipe}
              <span>
                <a style={{textDecoration: "none"}} href="https://github.com/dcfernandez1023/form-builder" target="_blank">View Code 💻</a>
              </span>
              {pipe}
              <span>
                <a style={{textDecoration: "none"}} href="#" target="_blank">Submit Feedback ✏️</a>
              </span>
            </span>
          </div>
        </Container>
      </footer>
    </div>
  );
}

export default App;
