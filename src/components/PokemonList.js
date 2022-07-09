import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import serverURL from "../serverURL";
const axios = require("axios").default;

function PokemonList({ myPokemon }) {
  const [pokemons, setPokemons] = useState();

  useEffect(() => {
    axios
      .get(`${serverURL}/api/pokemon`)
      .then(function (response) {
        setPokemons(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  if (!pokemons) {
    return <h1>Loading</h1>;
  }
  return (
    <div>
      <ul>
        {pokemons.map((pokemon, index) => (
          <li key={index}>
            <Link to={`/pokemon/${pokemon.id}`}>{pokemon.name.english}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonList;
