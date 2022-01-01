import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';
import Login from "./components/Login";
import Home from "./components/Home";


/**
  Props:
    * user
    * setError
*/
const Main = (props) => {
  if(props.user === null) {
    return (
      <Login />
    );
  }
  return (
    <Home setError={props.setError} />
  );
}

export default Main;
