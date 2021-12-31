import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';
import Login from "./components/Login";


/**
  Props:
    * user
*/
const Main = (props) => {
  if(props.user === null) {
    return (
      <Login />
    );
  }
  return (
    <div> Forms </div>
  );
}

export default Main;
