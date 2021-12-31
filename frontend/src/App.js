import 'bootstrap/dist/css/bootstrap.min.css';

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

const AUTH = require("./controllers/auth");


function App() {
  const[user, setUser] = useState();
  const[componentError, setComponentError] = useState();

  useEffect(() => {
    AUTH.getUser(setUser, setComponentError);
  }, []);

  if(componentError !== undefined) {
    return (
      <ErrorComponent message={componentError.message}/>
    );
  }
  return (
    <Container fluid>
      <AppNavbar userInfo={user} />
      {user === undefined ?
        <div style={{marginTop: "30px", textAlign: "center"}}>
          <Spinner animation="border" />
        </div>
      :
        <div>
          <Router>
            <Routes>
              <Route path="/" element={<Main user={user} />} />
              <Route path="*" element={<NotFound />}/>
            </Routes>
          </Router>
        </div>
      }
    </Container>
  );
}

export default App;
