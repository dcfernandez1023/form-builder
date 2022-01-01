import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Spinner
} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams
} from "react-router-dom";
import NotFound from "./NotFound";
const FORMS = require("../controllers/forms");


/**
  Props:
    * setError
*/
const FormBuilder = (props) => {
  let { formId } = useParams();

  const[form, setForm] = useState();

  useEffect(() => {
    getForm();
  }, []);

  const getForm = () => {
    if(props.user === null || props.user === undefined) {
      window.location.href = "/";
      return;
    }
    const callback = (data, message) => {
      if(data === null) {
        props.setError(new Error(message));
      }
      else {
        if(Object.keys(data).length == 0) {
          setForm(null);
        }
        else {
          setForm(data);
        }
      }
    }
    FORMS.getForm(formId, callback, props.setError);
  }

  console.log("in form builder");
  if(form === undefined) {
    return (
      <div style={{marginTop: "30px", textAlign: "center"}}>
        <Spinner animation="border" />
      </div>
    );
  }
  if(form === null) {
    return (
      <NotFound />
    );
  }
  return (
    <div> Title: {form.title} | Id: {form.id} </div>
  );
}

export default FormBuilder;
