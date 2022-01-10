/**
  This component is used to display a list of the user's forms. This component
  does not interact with the server.
*/

import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  ListGroup,
  Badge,
  Figure
} from 'react-bootstrap';


/**
  Props:
    * forms
*/
const Forms = (props) => {
  if(props.forms === undefined) {
    return (
      <div style={{marginTop: "30px", textAlign: "center"}}>
        <p> Could not get your forms... </p>
      </div>
    );
  }
  if(props.forms.length == 0) {
    return (
      <div style={{marginTop: "30px", textAlign: "center"}}>
        <p> You have not created any forms </p>
        <div>
          <Figure>
            <Figure.Image
              width={400}
              src="no_forms.jpg"
            />
          </Figure>
        </div>
      </div>
    );
  }
  return (
    <ListGroup>
      {props.forms.map((form) => {
        return (
          <ListGroup.Item action key={form.id} onClick={() => {window.location.href = "/formBuilder/" + form.id}}>
            <Row>
              <Col xs={6}>
                {form.title}
              </Col>
              <Col xs={6} style={{textAlign: "right"}}>
                <Badge pill bg="warning" text="dark">
                  {form.submissions.length} submissions
                </Badge>
              </Col>
            </Row>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}

export default Forms;
