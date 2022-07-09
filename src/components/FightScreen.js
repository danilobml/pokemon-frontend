import { Container, Row, Col, Button } from "react-bootstrap";

function FightScreen({ myPokemon, enemy }) {
  return (
    <Container>
      <Row>
        <Col>Your Pokemon: {myPokemon}</Col>
        <Col>Your enemy: {enemy}</Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={6}>
          <Button>Fight!</Button>
          <Button>Choose another Pokemon</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default FightScreen;
