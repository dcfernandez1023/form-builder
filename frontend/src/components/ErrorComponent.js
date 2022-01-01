import AppNavbar from "./AppNavbar";
import {
  Container,
  Row,
  Col,
  Alert,
  Button
} from 'react-bootstrap';


/**
  Props:
    * message
    * onRetry
*/
const ErrorComponent = (props) => {
  return (
    <Container fluid>
      <AppNavbar />
      <br/>
      <Row>
        <Col xs={3}></Col>
        <Col xs={6}>
          <Alert variant="danger">
            <Alert.Heading> Oops! An unexpected error occurred </Alert.Heading>
            <p> {typeof props.message !== "string" ? "Could not get information on the error. Click the button below to retry." : props.message} </p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button onClick={typeof props.onRetry !== "function" ? () => {window.location.href = "/"} : props.onRetry} variant="danger">
                Continue
              </Button>
            </div>
          </Alert>
        </Col>
        <Col xs={3}></Col>
      </Row>
    </Container>
  );
}

export default ErrorComponent;
