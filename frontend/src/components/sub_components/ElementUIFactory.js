import {
  Col,
  Form
} from 'react-bootstrap';


class ElementUIFactory {
  static getUIElement(element, isSelected, onChange) {
    if(element.type === "INPUT") {
      return ElementUIFactory.renderInput(element, isSelected, onChange);
    }
    else if(element.type === "SELECT") {
      return ElementUIFactory.renderSelect(element, isSelected, onChange);
    }
    else if(element.type === "RADIO") {
      return ElementUIFactory.renderRadio(element, isSelected, onChange);
    }
    else if(element.type === "TEXTAREA") {
      return ElementUIFactory.renderTextarea(element, isSelected, onChange);
    }
    return <div> No such element </div>;
  }

  static renderInput(element, isSelected, onChange) {
    return (
      <Col
        className="form-col-spacing"
        md={element.columns}
        key={element.id + "-col"}
        style={isSelected ? {backgroundColor: "#fff3cd"} : {} }
      >
        <Form.Label> {element.label} </Form.Label>
        <Form.Control
          id={element.id}
          required={element.required}
          type="text"
          placeholder={element.placeholder}
          onChange={(e) => {onChange(element.id, element.name, e.target.value)}}
        />
      </Col>
    );
  }

  static renderSelect(element, isSelected, onChange) {
    return (
      <Col
        className="form-col-spacing"
        md={element.columns}
        key={element.id + "-col"}
        style={isSelected ? {backgroundColor: "#fff3cd"} : {} }
      >
        <Form.Label> {element.label} </Form.Label>
        <Form.Select
          id={element.id}
          required={element.required}
          onChange={(e) => {onChange(element.id, element.name, e.target.value)}}
        >
          <option value=""> Select </option>
          {element.options.map((option, index) => {
            return (
              <option value={option.value} key={element.id + "-option" + index.toString()}>
                {option.display}
              </option>
            );
          })}
        </Form.Select>
      </Col>
    );
  }

  static renderRadio(element, isSelected, onChange) {
    return (
      <Col
        md={element.columns}
        key={element.id + "-col"}
        className="form-col-spacing"
        style={isSelected ? {backgroundColor: "#fff3cd"} : {} }
      >
        <Form.Label style={{marginRight: "10px"}}> {element.label} </Form.Label>
        <Form.Check
          inline
          id={element.id + "radio1"}
          label={element.label1}
          type="radio"
          name={"radioGroup-" + element.id}
          value={element.value1}
          required={element.required}
          onChange={(e) => {onChange(element.id, element.name, e.target.value)}}
        />
        <Form.Check
          inline
          id={element.id + "radio2"}
          label={element.label2}
          type="radio"
          name={"radioGroup-" + element.id}
          value={element.value2}
          required={element.required}
          onChange={(e) => {onChange(element.id, element.name, e.target.value)}}
        />
      </Col>
    );
  }

  static renderTextarea(element, isSelected, onChange) {
    return (
      <Col
        md={element.columns}
        key={element.id + "-col"}
        className="form-col-spacing"
        style={isSelected ? {backgroundColor: "#fff3cd"} : {} }
        >
        <Form.Label> {element.label} </Form.Label>
        <Form.Control
          id={element.id}
          as="textarea"
          rows={element.rows}
          required={element.required}
          placeholder={element.placeholder}
          onChange={(e) => {onChange(element.id, element.name, e.target.value)}}
        />
      </Col>
    );
  }
}


export { ElementUIFactory };
