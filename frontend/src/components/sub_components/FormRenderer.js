import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Figure,
  Badge
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
  const[isEditingTitle, setIsEditingTitle] = useState(false);
  const[validated, setValidated] = useState(false);
  const[formData, setFormData] = useState({});

  useEffect(() => {
    setForm(props.form);
  }, [props.form, props.selectedElement]);

  const onChangeFormTitle = (e) => {
    let formCopy = JSON.parse(JSON.stringify(form));
    formCopy.title = e.target.value;
    props.onChangeForm(formCopy);
  }

  const makeTitleHeader = () => {
    // if(form.title.trim().length == 0) {
    //   alert("Title cannot be blank.");
    //   return;
    // }
    setIsEditingTitle(false);
  }

  const makeTitleEditable = () => {
    setIsEditingTitle(true);
  }

  const onChangeFormElement = (id, name, value) => {
    let copy = Object.assign({}, formData);
    copy[id] = {name: name, value: value};
    setFormData(copy);
    setValidated(false);
  }

  const buildUrl = () => {
    let full = window.location.protocol+'//'+ window.location.hostname + (window.location.port.toString().trim().length !== 0 ? ':'+ window.location.port: '');
    return full += "/form/" + form.id;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(props.mode === "building") {
      return;
    }
    setValidated(true);
    let isValid = true;
    let dataCopy = Object.assign({}, formData);
    for(var i = 0; i < form.elements.length; i++) {
      let element = form.elements[i];
      if(dataCopy[element.id] === undefined) {
        dataCopy[element.id] = {name: element.name, value: ""};
      }
      // Check to ensure required elements are filled
      if(element.required && dataCopy[element.id].value.trim().length == 0) {
        document.getElementById(element.id).value = "";
        isValid = false;
      }
    }
    if(!isValid) {
      return;
    }
    props.onSubmit(dataCopy);
  }

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
          {isEditingTitle && props.mode === "building" ?
            <div style={{width: "300px", margin: "0 auto"}}>
              <Form.Control
                name="title"
                value={form.title}
                onChange={onChangeFormTitle}
              />
              <div style={{textAlign: "right", marginTop: "8px"}}>
                <Button variant="info" size="sm" onClick={makeTitleHeader}>
                  <img src="/check.png" style={{paddingTop: "3px", paddingBottom: "3px"}} />
                </Button>
              </div>
            </div>
          :
            <div>
              <h3
                className={props.mode === "building" ? "form-title" : ""}
                style={{paddingBottom: "8px", display: "inline-block"}}
                onClick={makeTitleEditable}
              >
                {form.title}
              </h3>
              {form.isPublished && props.mode === "building" ?
                <a href={buildUrl()} target="_blank">
                  <Badge text="dark" bg="warning" style={{marginLeft: "8px"}} pill>
                    Published
                    <img src="/external.png" style={{height: "15px", width: "15px", marginLeft: "3px"}}/>
                  </Badge>
                </a>
              :
                <div></div>
              }
            </div>
          }
        </Col>
      </Row>
      <br/>
      {/* Form elements */}
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <div>
          {form.elements.length == 0 && props.mode === "building" ?
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
                return ElementUIFactory.getUIElement(element, isSelected, onChangeFormElement);
              })}
            </Row>
          }
        </div>
        {form.elements.length > 0 || props.mode === "viewing" ?
          <div>
            <hr />
            <Row>
              <Col style={{textAlign: "center"}}>
                <Button type="submit" variant="success"> Submit </Button>
              </Col>
            </Row>
          </div>
        :
          <div></div>
        }
      </Form>
    </div>
  );
}

export default FormRenderer;
