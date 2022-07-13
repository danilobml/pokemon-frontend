import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import serverURL from "../serverURL";
const axios = require("axios").default;

function OnePokemon({ onClick }) {
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
    <div>
      <h1>
        <Link to={`/pokemon/${id}/name`}>{pokemon.name.english}</Link>
      </h1>
      <h2>Stats:</h2>
      <h3>
        <Link to={`/pokemon/${id}/type`}>Type</Link>
      </h3>
      <ul>
        {pokemon.type.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
      <h3>
        <Link to={`/pokemon/${id}/base`}>Base</Link>
      </h3>
      <ul>
        <li>HP: {pokemon.base.HP}</li>
        <li>Attack: {pokemon.base.Attack}</li>
        <li>Defense: {pokemon.base.Defense}</li>
        <li>Sp. Attack: {pokemon.base["Sp. Attack"]}</li>
        <li>Sp. Defense: {pokemon.base["Sp. Defense"]}</li>
        <li>Speed: {pokemon.base.Speed}</li>
      </ul>
      <Button onClick={() => onClick(pokemon)}>I choose you!</Button>
    </div>
  );
}

export default OnePokemon;
