import {
  Container,
  Row,
  Col,
  ListGroup,
  Navbar,
  Nav,
  Dropdown
} from 'react-bootstrap';


/**
  Props:
    * user 
*/
const AppNavbar = (props) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">
          Form Builder
        </Navbar.Brand>
        <Nav className = "mr-auto">
        </Nav>
        {props.user !== undefined && props.user !== null ?
          <Nav>
            <Dropdown>
              <Dropdown.Toggle
                variant="light"
                style={{margin: "1%", float: "right"}}
              >
                👤
              </Dropdown.Toggle>
              <Dropdown.Menu align="end" style={{border: "1px solid gray"}}>
                <Row>
                  <Col>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col xs ={12} style = {{textAlign: "center"}}>
                            Signed in as:
                          </Col>
                        </Row>
                        <Row>
                          <Col style = {{textAlign: "center"}}>
                            <strong> {props.user === undefined || props.user === null ? "" : props.user.email} </strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item action onClick = {() => {window.location.pathname = "/changelog"}}>
                        View Changelog
                      </ListGroup.Item>
                      <ListGroup.Item action onClick = {() => {window.open("https://formtosheets-9a6d7.web.app/0150b734-1ea9-44a2-9c1e-94052fc5b453", "_self")}}>
                        Submit Feedback
                      </ListGroup.Item>
                      <ListGroup.Item action>
                        Signout
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
          :
          <div></div>
        }
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
