import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Button,
  Form,
  CloseButton
} from 'react-bootstrap';
const FORM_MODEL = require("./formElements");


/**
  Props:
    * form
    * selectedElement
    * selectedIndex
    * setSelectedIndex
    * onChangeSelectedElement
    * onChangeForm

    NOTE: selectedIndex is ONLY used to update the selectedElement without
          having to loop through the elements and update by id
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
    element[attribute] = FORM_MODEL.convertField(attribute, value);
    formCopy.elements[props.selectedIndex] = element;
    props.onChangeSelectedElement(element);
    props.onChangeForm(formCopy);
  }

  const moveDown = () => {
    let formCopy = JSON.parse(JSON.stringify(form));
    if(props.selectedIndex == formCopy.elements.length - 1) {
      return;
    }
    let temp = formCopy.elements[props.selectedIndex + 1];
    formCopy.elements[props.selectedIndex] = temp;
    formCopy.elements[props.selectedIndex + 1] = selectedElement;
    props.onChangeForm(formCopy);
    props.setSelectedIndex(props.selectedIndex + 1);
  }

  const moveUp = () => {
    let formCopy = JSON.parse(JSON.stringify(form));
    if(props.selectedIndex == 0) {
      return;
    }
    let temp = formCopy.elements[props.selectedIndex - 1];
    formCopy.elements[props.selectedIndex] = temp;
    formCopy.elements[props.selectedIndex - 1] = selectedElement;
    props.onChangeForm(formCopy);
    props.setSelectedIndex(props.selectedIndex - 1);
  }

  // for select elements only
  const addOptionToSelectedElement = () => {
    let formCopy = JSON.parse(JSON.stringify(form));
    let element = JSON.parse(JSON.stringify(selectedElement));
    var newOption = {value: "", display: ""};
    element.options.push(Object.assign({}, newOption));
    formCopy.elements[props.selectedIndex] = element;
    props.onChangeSelectedElement(element);
    props.onChangeForm(formCopy);
  }

  // for select elements only
  const deleteOptionFromSelectElement = (index) => {
    let formCopy = JSON.parse(JSON.stringify(form));
    let element = JSON.parse(JSON.stringify(selectedElement));
    element.options.splice(index, 1);
    formCopy.elements[props.selectedIndex] = element;
    props.onChangeSelectedElement(element);
    props.onChangeForm(formCopy);
  }

  // for select elements only
  const onChangeOption = (index, e) => {
    var key = e.target.name;
    var value = e.target.value;
    let formCopy = JSON.parse(JSON.stringify(form));
    let element = JSON.parse(JSON.stringify(selectedElement));
    for(var i = 0; i < formCopy.elements.length; i++) {
      if(element.id === formCopy.elements[i].id) {
        element.options[index][key] = value;
        formCopy.elements[i] = element;
        break;
      }
    }
    props.onChangeSelectedElement(element);
    props.onChangeForm(formCopy);
  }

  const renderInputEditor = () => {
    return FORM_MODEL.inputFields.map((field, index) => {
      if(field.element === "input") {
        return (
          <Col xl={12} key={field.value + "-" + index.toString()} className="form-col-spacing">
            <Form.Label> {field.display} </Form.Label>
            <Form.Control
              name={field.value}
              value={selectedElement[field.value]}
              size="sm"
              onChange={(e) => {onEditAttribute(field.value, e.target.value)}}
            />
          </Col>
        );
      }
      else if(field.element === "select") {
        return (
          <Col xl={12} key={field.value + "-" + index.toString()} className="form-col-spacing">
            <Form.Label> {field.display} </Form.Label>
            <Form.Select
               name={field.value}
               value={selectedElement[field.value]}
               size="sm"
               onChange={(e) => {onEditAttribute(field.value, e.target.value)}}
            >
              {field.options.map((option, index2) => {
                return (
                  <option value={option.value} key={"option-" + index2.toString()}> {option.display} </option>
                );
              })}
            </Form.Select>
          </Col>
        );
      }
    });
  }

  const renderTextAreaEditor = () => {
    return FORM_MODEL.textareaFields.map((field, index) => {
      if(field.element === "input") {
        return (
          <Col xl={12} key={field.value + "-" + index.toString()} className="form-col-spacing">
            <Form.Label> {field.display} </Form.Label>
            <Form.Control
              name={field.value}
              value={selectedElement[field.value]}
              size="sm"
              onChange={(e) => {onEditAttribute(field.value, e.target.value)}}
            />
          </Col>
        );
      }
      else if(field.element === "select") {
        return (
          <Col xl={12} key={field.value + "-" + index.toString()} className="form-col-spacing">
            <Form.Label> {field.display} </Form.Label>
            <Form.Select
               name={field.value}
               value={selectedElement[field.value]}
               size="sm"
               onChange={(e) => {onEditAttribute(field.value, e.target.value)}}
            >
              {field.options.map((option, index2) => {
                return (
                  <option value={option.value} key={"option-" + index2.toString()}> {option.display} </option>
                );
              })}
            </Form.Select>
          </Col>
        );
      }
    });
  }

  const renderRadioEditor = () => {
    return FORM_MODEL.radioFields.map((field, index) => {
      if(field.element === "input") {
        return (
          <Col xl={12} key={field.value + "-" + index.toString()} className="form-col-spacing">
            <Form.Label> {field.display} </Form.Label>
            <Form.Control
              name={field.value}
              value={selectedElement[field.value]}
              size="sm"
              onChange={(e) => {onEditAttribute(field.value, e.target.value)}}
            />
          </Col>
        );
      }
      else if(field.element === "select") {
        return (
          <Col xl={12} key={field.value + "-" + index.toString()} className="form-col-spacing">
            <Form.Label> {field.display} </Form.Label>
            <Form.Select
               name={field.value}
               value={selectedElement[field.value]}
               size="sm"
               onChange={(e) => {onEditAttribute(field.value, e.target.value)}}
            >
              {field.options.map((option, index2) => {
                return (
                  <option value={option.value} key={"option-" + index2.toString()}> {option.display} </option>
                );
              })}
            </Form.Select>
          </Col>
        );
      }
    });
  }

  const renderSelectEditor = () => {
    return FORM_MODEL.selectFields.map((field, index) => {
      if(field.element === "input") {
        return (
          <Col xl={12} key={field.value + "-" + index.toString()} className="form-col-spacing">
            <Form.Label> {field.display} </Form.Label>
            <Form.Control
              name={field.value}
              value={selectedElement[field.value]}
              size="sm"
              onChange={(e) => {onEditAttribute(field.value, e.target.value)}}
            />
          </Col>
        );
      }
      else if(field.element === "select") {
        return (
          <Col xl={12} key={field.value + "-" + index.toString()} className="form-col-spacing">
            <Form.Label> {field.display} </Form.Label>
            <Form.Select
               name={field.value}
               value={selectedElement[field.value]}
               size="sm"
               onChange={(e) => {onEditAttribute(field.value, e.target.value)}}
            >
              {field.options.map((option, index2) => {
                return (
                  <option value={option.value} key={"option-" + index2.toString()}> {option.display} </option>
                );
              })}
            </Form.Select>
          </Col>
        );
      }
      else if(field.element === "inputs") {
        return (
          <Col xl={12} key={field.value + "-" + index.toString()} className="form-col-spacing">
            <Form.Label>
              {field.display}
              <Button
                style={{marginLeft: "8px", paddingTop: "1px", paddingBottom: "1px"}}
                size="sm"
                variant="info"
                onClick={addOptionToSelectedElement}
              >
                +
              </Button>
            </Form.Label>
            {selectedElement.options.map((option, optionIndex) => {
              return (
                <div style={{marginBottom: "5px"}} key={"editor-option" + optionIndex.toString()}>
                  <Row>
                    <Col style={{marginBottom: "3px"}}>
                      <Form.Label> Value </Form.Label>
                      <Form.Control
                        name="value"
                        size="sm"
                        value={selectedElement.options[optionIndex].value}
                        onChange={(e) => {
                          onChangeOption(optionIndex, e);
                        }}
                      />
                    </Col>
                    <Col style={{marginBottom: "3px"}}>
                      <Form.Label> Display </Form.Label>
                      <Form.Control
                        name="display"
                        size="sm"
                        value={selectedElement.options[optionIndex].display}
                        onChange={(e) => {
                          onChangeOption(optionIndex, e);
                        }}
                      />
                    </Col>
                    <Col xs={2} style={{textAlign: "right"}}>
                      <CloseButton
                        style={{marginTop: "40px", width: "6px", height: "6px"}}
                        size="sm"
                        onClick={() => deleteOptionFromSelectElement(optionIndex)}
                      />
                    </Col>
                  </Row>
                </div>
              );
            })}
          </Col>
        );
      }
    });
  }

  const renderEditor = () => {
    if(selectedElement.type === "INPUT") {
      return (
        <Row>
          {renderInputEditor()}
        </Row>
      );
    }
    else if(selectedElement.type === "SELECT") {
      return (
        <Row>
          {renderSelectEditor()}
        </Row>
      );
    }
    else if(selectedElement.type === "TEXTAREA") {
      return (
        <Row>
          {renderTextAreaEditor()}
        </Row>
      );
    }
    else if(selectedElement.type === "RADIO") {
      return (
        <Row>
          {renderRadioEditor()}
        </Row>
      );
    }
    else {
      return (
        <Row>
          <Col> No such element {selectedElement.type} </Col>
        </Row>
      );
    }
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
                <Button variant="info" size="sm" style={{marginRight: "5px"}} onClick={moveUp}> Move up </Button>
                <Button variant="info" size="sm" onClick={moveDown}> Move down </Button>
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
                {renderEditor()}
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
