import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import {
  Container,
  Modal,
  Row,
  Col,
  Tabs,
  Tab,
  Accordion,
  Badge,
  Alert,
  Button,
  Spinner
} from 'react-bootstrap';


/**
  Props:
    * form
    * show
    * isLoading
    * onChangeForm
    * onClose
    * onSubmit
*/
const Analytics = (props) => {

  const [show, setShow] = useState(false);
  const [form, setForm] = useState();
  const [isSaved, setIsSaved] = useState(true);

  useEffect(() => {
    setAndSortSubmissions(props.form);
    setShow(props.show);
  }, [props.form, props.show, props.isLoading]);

  const getGraphData = () => {
    if(form === undefined || form === null) {
      return [];
    }
    var data = [];
    var count = {};
    var order = [];
    for(var i = 0; i < form.submissions.length; i++) {
      var date = new Date(form.submissions[i].timestamp).toLocaleDateString();
      if(count[date] === undefined) {
        count[date] = 1;
        order.push(date);
      }
      else {
        count[date] = count[date] + 1;
      }
    }
    for(var x = 0; x < order.length; x++) {
      data.push(
        {name: order[x], Submissions: count[order[x]]}
      );
    }
    return data;
  }

  const setAndSortSubmissions = (formFromProps) => {
    // sort descending
    formFromProps.submissions.sort((a, b) => {
      return b.timestamp - a.timestamp;
    });
    setForm(formFromProps);
  }

  const onClose = () => {
    setIsSaved(true);
    props.onClose();
  }

  const removeSubmission = (index) => {
    let formCopy = JSON.parse(JSON.stringify(form));
    formCopy.submissions.splice(index, 1);
    setForm(formCopy);
    setIsSaved(false);
  }

  const onSave = (e) => {
    let formCopy = JSON.parse(JSON.stringify(form));
    props.onChangeForm(formCopy);
    props.onSubmit(e, onClose, formCopy);
  }

  const getDateTimeString = (timestamp) => {
    let date = new Date(timestamp);
    return date.toLocaleDateString() + " at " + date.toLocaleTimeString();
  }

  if(form === undefined || form === null) {
    return (
      <div></div>
    );
  }
  return (
    <Modal show={show} onHide={onClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>
          Form Analytics
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs defaultActiveKey="graph" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="graph" title="Graph">
            {form.submissions.length == 0 ?
              <div style={{marginTop: "50px", height: "75px", textAlign: "center"}}>
                No form submissions
              </div>
            :
              <div>
                <h5> Number of Form Submissions by Date </h5>
                <br/>
                <div style={{height: "60vh"}}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={getGraphData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend wrapperStyle={{ position: 'relative' }} />
                      <Line type="monotone" dataKey="Submissions" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <br/>
              </div>
            }
          </Tab>
          <Tab eventKey="data" title="Data">
            {form.submissions.length == 0 ?
              <div style={{marginTop: "50px", height: "75px", textAlign: "center"}}>
                No form submissions
              </div>
            :
              <div style={{minHeight: "75px"}}>
                <Row style={{marginBottom: "8px"}}>
                  <Col>
                    <h5> Submissions </h5>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Accordion>
                      {form.submissions.map((submission, index) => {
                        let date = new Date(submission.timestamp);
                        return (
                          <Accordion.Item key={"key-" + form.id + "-submission" + index.toString()} eventKey={"form-" + form.id + "-submission" + index.toString()}>
                            <Accordion.Header>
                              {date.toLocaleDateString() + " at " + date.toLocaleTimeString()}
                              {submission.submissionErrors.length > 0 ?
                                <Badge pill bg="danger" style={{marginLeft: "8px"}}>
                                  !
                                </Badge>
                              :
                                <span></span>
                              }
                            </Accordion.Header>
                            <Accordion.Body>
                              {submission.data.map((data, dataIndex) => {
                                return (
                                  <div key={"data-submission-" + dataIndex.toString()} style={{marginBottom: "8px"}}>
                                    <strong> {data.name}: </strong>
                                    <span> {data.value} </span>
                                  </div>
                                );
                              })}
                              {submission.submissionErrors.length > 0 ?
                                <Alert variant="danger" style={{marginTop: "8px"}}>
                                  <strong> Submission Errors: </strong>
                                  {submission.submissionErrors.map((err, errIndex) => {
                                    return (
                                      <li key={"submission-" + index.toString() + "error-" + errIndex.toString()}> {err.type} Submission Handler: {err.error} </li>
                                    );
                                  })}
                                </Alert>
                              :
                                <span></span>
                              }
                              <div style={{textAlign: "right"}}>
                                <Button variant="outline-dark" onClick={() => removeSubmission(index)}>
                                  🗑️
                                </Button>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        );
                      })}
                    </Accordion>
                  </Col>
                </Row>
                <br/>
                <br/>
              </div>
            }
            <br/>
            <Button style={{float: "right"}} variant="success" disabled={isSaved || props.isLoading} onClick={(e) => {onSave(e)}}>
              {props.isLoading ?
                <Spinner as="span" size="sm" animation="border" style={{marginRight: "8px"}}/>
              :
                <span></span>
              }
              Save
            </Button>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}

export default Analytics;
