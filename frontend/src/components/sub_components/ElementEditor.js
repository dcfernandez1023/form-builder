import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Button,
  Form
} from 'react-bootstrap';


/**
  Props:
    * form
    * selectedElement
    * selectedIndex
    * setSelectedIndex
    * onChangeSelectedElement
    * onChangeForm
*/
const ElementEditor = (props) => {
  const[form, setForm] = useState();
  const[selectedElement, setSelectedElement] = useState();

  useEffect(() => {
    setForm(props.form);
    setSelectedElement(props.selectedElement);
  }, [props.form, props.selectedElement]);

  const onEditAttribute = (attribute, value) => {
    let formCopy = JSON.parse(JSON.stringify(form));
    let element = JSON.parse(JSON.stringify(selectedElement));
    element[attribute] = value;
    formCopy.elements[props.selectedIndex] = element;
    props.onChangeSelectedElement(element);
    props.onChangeForm(formCopy);
  }

  return (
    <div>
      <Row>
        <strong> Element Editor </strong>
      </Row>
      <br/>
      {selectedElement === null || selectedElement === undefined ?
        <small> No element selected </small>
      :
        <div>
          <Row>
            <Col>
              <div style={{marginBottom: "8px"}}>
                <u> Position </u>
              </div>
              <div>
                <Button variant="info" size="sm" style={{marginRight: "5px"}}> Move up </Button>
                <Button variant="info" size="sm"> Move down </Button>
              </div>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col>
              <div style={{marginBottom: "8px"}}>
                <u> Attributes </u>
              </div>
              <div>
                <Form.Label> Label </Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => {onEditAttribute("label", e.target.value)}}
                  value={selectedElement["label"]}
                />
              </div>
            </Col>
          </Row>
          <br/>
        </div>
      }
    </div>
  );
}

export default ElementEditor;
