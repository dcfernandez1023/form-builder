import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  ListGroup,
  CloseButton,
  Button,
  DropdownButton,
  Dropdown
} from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
const FORM_MODEL = require("./formElements");


/**
  Props:
    * form
    * selectedElement
    * onSelectElement
    * setSelectedIndex
    * onChangeForm - onChangeForm(editedForm)
*/
const ElementSelector = (props) => {
  const[form, setForm] = useState();

  useEffect(() => {
    setForm(props.form);
  }, [props.form]);

  const selectElement = (element, index) => {
    if(props.selectedElement === undefined) {
      props.onSelectElement(element);
      props.setSelectedIndex(index);
    }
    else if(props.selectedElement.id === element.id) {
      props.onSelectElement(undefined);
      props.setSelectedIndex(-1);
    }
    else {
      props.onSelectElement(element);
      props.setSelectedIndex(index);
    }
  }

  const addElement = (element) => {
    element.id = uuidv4().toString();
    let formCopy = JSON.parse(JSON.stringify(form));
    formCopy.elements.push(element);
    props.onChangeForm(formCopy);
  }

  const removeElement = (id) => {
    let formCopy = JSON.parse(JSON.stringify(form));
    for(var i = 0; i < formCopy.elements.length; i++) {
      if(formCopy.elements[i].id === id) {
        if(props.selectedElement !== undefined && formCopy.elements[i].id === props.selectedElement.id) {
          props.onSelectElement(undefined);
          props.setSelectedIndex(-1);
        }
        formCopy.elements.splice(i, 1);
        break;
      }
    }
    props.onChangeForm(formCopy);
  }

  return (
    <div>
      <Row>
        <Col xs={10}>
          <strong> Element Selector </strong>
        </Col>
        <Col xs={2} style={{textAlign: "right"}}>
          <DropdownButton size="sm" align="end" variant="info" style={{float: "right"}} title="+">
            {FORM_MODEL.types.map((type) => {
              return (
                <Dropdown.Item key={type + "-new"} onClick={() => addElement(JSON.parse(JSON.stringify(FORM_MODEL.elements[type])))}>
                  {FORM_MODEL.elements[type].name}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </Col>
      </Row>
      <br/>
      {form === undefined || form === null || form.elements.length == 0 ?
        <small> No form elements have been added </small>
      :
        <ListGroup variant="flush">
          {form.elements.map((element, index) => {
            return (
              <Row>
                <Col xs={10}>
                  <ListGroup.Item
                    style={{border: "0px"}}
                    action
                    variant={props.selectedElement !== undefined && props.selectedElement.id === element.id ? "warning" : ""}
                    key={element.id + "-element-list"}
                    onClick={() => {selectElement(element, index)}}
                  >
                    <Row>
                      <Col xs={10}>
                        {element.label}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </Col>
                <Col xs={2} style={{textAlign: "right"}}>
                  <div style={{height: "5px"}}></div>
                  <CloseButton
                    style={{width: "6px", height: "6px"}}
                    onClick={() => {removeElement(element.id)}}
                  />
                </Col>
              </Row>
            );
          })}
        </ListGroup>
      }
    </div>
  );
}

export default ElementSelector;
