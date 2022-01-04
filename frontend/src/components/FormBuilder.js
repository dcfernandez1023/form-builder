import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Spinner,
  Button,
  DropdownButton,
  Dropdown,
  Toast
} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams
} from "react-router-dom";
import NotFound from "./NotFound";
import ElementSelector from "./sub_components/ElementSelector";
import FormRenderer from "./sub_components/FormRenderer";
import ElementEditor from "./sub_components/ElementEditor";
import Preview from "./sub_components/Preview";
import SubmissionHandlerModal from "./sub_components/SubmissionHandlerModal";
import DeleteFormModal from "./sub_components/DeleteFormModal";
const FORMS = require("../controllers/forms");


/**
  Props:
    * setError
*/
const FormBuilder = (props) => {
  let { formId } = useParams();

  const[form, setForm] = useState();
  const[showNotification, setShowNotification] = useState(false);
  const[notification, setNotification] = useState("");
  const[selectedElement, setSelectedElement] = useState();
  const[selectedIndex, setSelectedIndex] = useState(-1);
  const[isSaved, setIsSaved] = useState(true);
  const[isSaving, setIsSaving] = useState(false);
  const[isPreview, setIsPreview] = useState(false);
  const[showSubModal, setShowSubModal] = useState(false);
  const[showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    getForm();
  }, []);

  const getForm = () => {
    /*
      If user could not be retrieved from server, then the user is not logged
      in, so redirect to login page and do not attempt to get form from server
    */
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

  const onChangeForm = (updatedForm) => {
    setForm(updatedForm);
    setIsSaved(false);
    window.onbeforeunload = () => {
      return "You have not saved your changes. Are you sure you want to leave?";
    };
  }

  const handlePublish = () => {
    let formCopy = JSON.parse(JSON.stringify(form));
    formCopy.isPublished = !formCopy.isPublished;
    setIsSaving(true);
    const callback = (data, message) => {
      if(data === null) {
        props.setError(new Error(message));
      }
      else {
        setForm(data);
        if(formCopy.isPublished) {
          alertNotification("Form is now published ✔️");
        }
        else {
          alertNotification("Form is no longer published ✔️");
        }
      }
      setIsSaved(true);
      setIsSaving(false);
      window.onbeforeunload = null;
    }
    const onError = (error) => {
      window.onbeforeunload = null;
      props.setError(error);
    }
    FORMS.updateForm(formId, formCopy, callback, onError);
  }

  const saveForm = (e, componentCallback, updatedForm) => {
    let formCopy = JSON.parse(JSON.stringify(form));
    setIsSaving(true);
    const callback = (data, message) => {
      if(data === null) {
        props.setError(new Error(message));
      }
      else {
        setForm(data);
        alertNotification("Form saved successfully ✔️");
      }
      setIsSaved(true);
      setIsSaving(false);
      if(componentCallback !== undefined && componentCallback !== null) {
        componentCallback();
      }
      window.onbeforeunload = null;
    }
    const onError = (error) => {
      window.onbeforeunload = null;
      props.setError(error);
    }
    if(updatedForm !== undefined) {
      FORMS.updateForm(formId, updatedForm, callback, onError);
    }
    else {
      FORMS.updateForm(formId, formCopy, callback, onError);
    }
  }

  const deleteForm = () => {
    const callback = (data, message) => {
      if(data === null) {
        props.setError(new Error(message));
      }
      else {
        window.location.href = "/";
      }
      setIsSaved(true);
      setIsSaving(false);
    }
    const onError = (error) => {
      props.setError(error);
    }
    FORMS.deleteForm(form.id, callback, onError);
  }

  const alertNotification = (msg) => {
    setNotification(msg);
    setShowNotification(true);
  }

  const hideNotification = () => {
    setNotification("");
    setShowNotification(false);
  }

  const enterPreview = () => {
    setIsPreview(true);
  }

  const exitPreview = () => {
    setIsPreview(false);
  }

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
    <Container fluid>
      <SubmissionHandlerModal
        form={form}
        show={showSubModal}
        isLoading={isSaving}
        onChangeForm={onChangeForm}
        onClose={() => setShowSubModal(false)}
        onSubmit={saveForm}
      />
    <DeleteFormModal
      show={showDeleteModal}
      isLoading={isSaving}
      onClose={() => {setShowDeleteModal(false)}}
      onSubmit={deleteForm}
    />
      <br/>
      {/* Action bar */}
      {isPreview ?
        <Row>
          <Col>
            <Preview form={form} onBack={exitPreview} />
          </Col>
        </Row>
      :
        <div>
          <Row>
            <Col>
              <Toast onClose={hideNotification} show={showNotification} delay={5000} autohide>
                <Toast.Header>
                  <img
                    src="/bulb.png"
                    className="rounded me-2"
                    alt=""
                  />
                  <strong className="me-auto"> Action Status </strong>
                </Toast.Header>
                <Toast.Body> {notification} </Toast.Body>
              </Toast>
            </Col>
            <Col style={{textAlign: "right"}}>
              <Button variant="info" disabled={isSaved || isSaving} onClick={saveForm} style={{float: "right", marginLeft: "10px"}}>
                {isSaving ?
                  <Spinner as="span" size="sm" animation="border" style={{marginRight: "8px"}}/>
                :
                  <span></span>
                }
                Save
               </Button>
               <DropdownButton align="end" variant="info" style={{float: "right"}} title="Actions">
                 <Dropdown.Item onClick={enterPreview}> Preview </Dropdown.Item>
                 <Dropdown.Item onClick={handlePublish}> {form.isPublished ? "Unpublish" : "Publish"} </Dropdown.Item>
                 <Dropdown.Item> Analytics </Dropdown.Item>
                 <Dropdown.Item onClick={() => setShowSubModal(true)}> Submission Handling </Dropdown.Item>
                 <Dropdown.Item onClick={() => {setShowDeleteModal(true)}}> Delete </Dropdown.Item>
               </DropdownButton>
            </Col>
          </Row>
          <br/>
          {/* Form editor */}
          <Row style={{minHeight: "50vh"}}>
            {/* Element selector */}
            <Col xs={3} style={{borderRight: "1px solid lightGray"}}>
              <ElementSelector form={form} selectedElement={selectedElement} onSelectElement={setSelectedElement} onChangeForm={onChangeForm} setSelectedIndex={setSelectedIndex} />
            </Col>
            {/* Form renderer */}
            <Col xs={6}>
              <FormRenderer form={form} onChangeForm={onChangeForm} selectedElement={selectedElement} mode="building" onSubmit={() => {return;}}/>
            </Col>
            {/* Element editor */}
            <Col xs={3} style={{borderLeft: "1px solid lightGray"}}>
              <ElementEditor form={form} onChangeForm={onChangeForm} selectedElement={selectedElement} onChangeSelectedElement={setSelectedElement} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
            </Col>
          </Row>
        </div>
      }
    </Container>
  );
}

export default FormBuilder;
