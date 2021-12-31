import AppNavbar from "./AppNavbar";
import {
  Container,
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
      <Alert variant="danger">
        <Alert.Heading> Oops! An unexpected error occurred </Alert.Heading>
        <p> {typeof props.message !== "string" ? "Could not get information on the error. Click the button below to retry." : props.message} </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={typeof props.onRetry !== "function" ? () => {window.location.reload()} : props.onRetry} variant="outline-danger">
            Retry
          </Button>
        </div>
      </Alert>
    </Container>
  );
}

export default ErrorComponent;
