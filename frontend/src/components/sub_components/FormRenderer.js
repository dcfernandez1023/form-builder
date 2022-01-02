import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Figure
} from 'react-bootstrap';
import { ElementUIFactory } from "./ElementUIFactory";


/**
  Props:
    * form
    * mode - 'viewing' or 'building'
    * selectedElement
    * onSubmit
*/
const FormRenderer = (props) => {
  const[form, setForm] = useState();

  useEffect(() => {
    setForm(props.form);
  }, [props.form, props.selectedElement]);

  if(form === null || form === undefined) {
    return (
      <div></div>
    );
  }
  return (
    <div>
      {/* Form Title */ }
      <Row>
        <Col style={{textAlign: "center"}}>
          <h2> {form.title} </h2>
        </Col>
      </Row>
      <br/>
      {/* Form elements */}
      <div>
        {form.elements.length == 0 ?
          <Row>
            <Col style={{textAlign: "center"}}>
              <p> No elements have been added </p>
              <Figure>
                <Figure.Image
                  width={500}
                  src="/no_elements_white.png"
                />
              </Figure>
            </Col>
          </Row>
        :
          <Row>
            {form.elements.map((element) => {
              let isSelected = (props.selectedElement !== undefined && element.id === props.selectedElement.id);
              return ElementUIFactory.getUIElement(element, isSelected);
            })}
          </Row>
        }
      </div>
    </div>
  );
}

export default FormRenderer;
