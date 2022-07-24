import "./OnePokemon.css";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import serverURL from "../serverURL";
const axios = require("axios").default;

function OnePokemon({ onClick, onGoHome }) {
  const [pokemon, setPokemon] = useState();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${serverURL}/api/pokemon/${id}`)
      .then(function (response) {
        setPokemon(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  console.log(pokemon);
  if (!pokemon) {
    return <h1>Loading</h1>;
  }
  return (
    <Container fluid className="d-flex flex-column justify-content-center align-items-center pt-3 cont" style={{ height: "100vh" }}>
      <div className="box">
        <h1 className="title-h1">
          <Link className="link" to={`/pokemon/${id}/name`}>
            {pokemon.name.english}
          </Link>
        </h1>
        <p>*Click on the Name, "Type" or "Base" for details</p>
        <br />
        <h2>Stats:</h2>
        <h3>
          <Link className="link" to={`/pokemon/${id}/type`}>
            Type
          </Link>
        </h3>
        <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
          {pokemon.type.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
        <h3>
          <Link className="link" to={`/pokemon/${id}/base`}>
            Base
          </Link>
        </h3>
        <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
          <li>HP: {pokemon.base.HP}</li>
          <li>Attack: {pokemon.base.Attack}</li>
          <li>Defense: {pokemon.base.Defense}</li>
          <li>Sp. Attack: {pokemon.base["Sp. Attack"]}</li>
          <li>Sp. Defense: {pokemon.base["Sp. Defense"]}</li>
          <li>Speed: {pokemon.base.Speed}</li>
        </ul>
        <Button onClick={() => onClick(pokemon)}>I choose you!</Button>
        <br />
        <br />
        <Button onClick={onGoHome}>Coose another pokemon</Button>
      </div>
    </Container>
  );
}

export default OnePokemon;
