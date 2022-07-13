import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
const axios = require("axios").default;

function FightScreen({ myPokemon, enemy, onFight, onGoHome, winner }) {
  const [myPokeImage, setmyPokeImage] = useState("");
  const [enemyImage, setEnemyImage] = useState("");

  console.log(myPokeImage);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${myPokemon.name.english.toLowerCase()}`)
      .then(function (response) {
        // setPokemons(response.data);
        setmyPokeImage(response.data.sprites.front_default);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${enemy.name.english.toLowerCase()}`)
      .then(function (response) {
        // setPokemons(response.data);
        setEnemyImage(response.data.sprites.front_default);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <Image src={myPokeImage} style={{ width: "120px", height: "150px" }} />
          Your Pokemon: {myPokemon.name.english}
        </Col>
        <Col>
          Your enemy: {enemy.name.english}
          <Image src={enemyImage} style={{ width: "120px", height: "150px" }} />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={6}>
          <Button onClick={onFight}>Fight!</Button>
          <Button onClick={onGoHome}>Choose another Pokemon</Button>
        </Col>
      </Row>
      {winner && (
        <Row>
          <Col>
            <h3>Winner: {winner}</h3>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default FightScreen;
