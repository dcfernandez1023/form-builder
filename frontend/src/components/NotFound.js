import {
  Container,
  Row,
  Col,
  Figure
} from 'react-bootstrap';

const NotFound = () => {
  return (
    <Container>
      <br/>
      <br/>
      <Row>
        <Col style={{textAlign: "center"}}>
          <h3> The page you are looking for does not exist </h3>
        </Col>
      </Row>
      <br/>
      <Row>
        <Col style={{textAlign: "center"}}>
          <Figure>
            <Figure.Image
              width={600}
              src="/not_found.jpg"
            />
          </Figure>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;
