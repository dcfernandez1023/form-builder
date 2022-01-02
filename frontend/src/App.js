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

const AUTH = require("./controllers/auth");


function App() {
  const[user, setUser] = useState();
  const[componentError, setComponentError] = useState();

  useEffect(() => {
    AUTH.getUser(setUser, () => {setUser(null)});
  }, []);

  if(componentError !== undefined) {
    return (
      <ErrorComponent message={componentError.message}/>
    );
  }

  return (
    <div>
      <AppNavbar user={user} />
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
              <Route path="*" element={<NotFound />}/>
            </Routes>
          </Router>
        </div>
      }
    </div>
  );
}

export default App;
