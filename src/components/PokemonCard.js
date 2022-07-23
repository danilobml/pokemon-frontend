import Card from "react-bootstrap/Card";

function PokemonCard({ name }) {
  return (
    <Card className="card d-flex" style={{ paddingTop: "10px" }}>
      <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png" style={{ width: "30px", alignSelf: "center", justifySelf: "center" }} />
      <Card.Body>
        <Card.Text>{name}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default PokemonCard;
