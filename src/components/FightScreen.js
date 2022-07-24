import "./FightScreen.css";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import serverURL from "../serverURL";
const axios = require("axios").default;

function FightScreen({ myPokemon, enemy, onFight, onGoHome, winner, userWon }) {
  const [myPokeImage, setmyPokeImage] = useState("");
  const [enemyImage, setEnemyImage] = useState("");
  const myPokemonName = myPokemon.name.english;
  const enemyPokemonName = enemy.name.english;

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${myPokemonName.toLowerCase()}`)
      .then(function (response) {
        setmyPokeImage(response.data.sprites.front_default);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${enemyPokemonName.toLowerCase()}`)
      .then(function (response) {
        setEnemyImage(response.data.sprites.front_default);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [myPokemonName, enemyPokemonName]);

  if (myPokemonName && enemyPokemonName) {
    axios
      .post(`${serverURL}/game/save`, {
        my_pokemon: myPokemonName,
        enemy: enemyPokemonName,
        winner: winner,
        user_won: userWon,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  console.log(myPokemon);
  console.log(enemy);

  return (
    <Container fluid className="d-flex flex-column justify-content-center align-items-center pt-3 fight-main" style={{ height: "100vh" }}>
      <h1 className="title-h1">Fight Arena</h1>
      <div className="fight">
        <Row className="d-flex justify-content-center">
          <Col>
            <span> Your Pokemon: {myPokemon.name.english}</span>
            <br />
            <Image src={myPokeImage} style={{ width: "350px", height: "350px" }} />
          </Col>
          <Col>
            <span> Your enemy: {enemy.name.english}</span> <br />
            <Image src={enemyImage} style={{ width: "350px", height: "350px" }} />
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col>
            {!winner && (
              <Button className="button-fight" onClick={onFight}>
                Fight!
              </Button>
            )}
            <Button className="button-fight" onClick={onGoHome}>
              Choose another Pokemon
            </Button>
            {winner && (
              <Button className="button-fight" onClick={() => navigate("/leaderboard")}>
                Leaderboard
              </Button>
            )}
          </Col>
        </Row>
        {winner && (
          <Row>
            <Col>
              <h3>Winner: {winner}!</h3>
              {winner === myPokemonName ? <h3>(You Win!)</h3> : <h3>(You Lose!)</h3>}
            </Col>
          </Row>
        )}
      </div>
    </Container>
  );
}

export default FightScreen;
