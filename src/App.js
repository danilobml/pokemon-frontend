import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import PokemonList from "./components/PokemonList";
import OnePokemon from "./components/OnePokemon";
import PokemonInfo from "./components/PokemonInfo";
import FightScreen from "./components/FightScreen";
import { useState, useEffect } from "react";
import serverURL from "./serverURL";
const axios = require("axios").default;

function App() {
  const [myPokemon, setMyPokemon] = useState({});
  const [enemy, setEnemy] = useState({});
  const [pokemons, setPokemons] = useState();
  const [winner, setWinner] = useState("");

  const navigate = useNavigate();

  console.log(myPokemon);
  if (enemy) {
    console.log(enemy);
  }

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

  const getRandomEnemy = () => {
    const random = Math.floor(Math.random() * 809);
    console.log(random);
    setEnemy(pokemons[random]);
  };

  const handleChoosePokemon = (chosen) => {
    setMyPokemon(chosen);
    getRandomEnemy();
    navigate("/fight");
  };

  const handleFight = () => {
    if (myPokemon.base.Attack > enemy.base.Defense) {
      setWinner(myPokemon.name.english);

      // return <h1>{myPokemon.name.english} won!</h1>;
    } else {
      // return <h1>{enemy.name.english} defeated your Pokemon!</h1>;
      setWinner(enemy.name.english);
    }
  };

  const handleGoHome = () => {
    navigate("/");
    setMyPokemon("");
    setEnemy("");
    setWinner("");
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PokemonList myPokemon={myPokemon} />} />
        <Route path="/pokemon/:id" element={<OnePokemon onClick={handleChoosePokemon} />} />
        <Route path="/pokemon/:id/:info" element={<PokemonInfo />} />
        <Route path="/fight" element={<FightScreen myPokemon={myPokemon} enemy={enemy} onFight={handleFight} onGoHome={handleGoHome} winner={winner} />} />
      </Routes>
    </div>
  );
}

export default App;
