import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import PokemonList from "./components/PokemonList";
import OnePokemon from "./components/OnePokemon";
import PokemonInfo from "./components/PokemonInfo";
import FightScreen from "./components/FightScreen";
import Leaderboard from "./components/Leaderboard";
import { useState, useEffect } from "react";
import serverURL from "./serverURL";
const axios = require("axios").default;

function App() {
  const [myPokemon, setMyPokemon] = useState({});
  const [enemy, setEnemy] = useState({});
  const [pokemons, setPokemons] = useState({});
  const [winner, setWinner] = useState("");
  const [userWon, setUserWon] = useState("");

  const navigate = useNavigate();

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
    // console.log(random);
    setEnemy(pokemons[random]);
  };

  const handleChoosePokemon = (chosen) => {
    setMyPokemon(chosen);
    getRandomEnemy();
    navigate("/fight");
  };

  const handleFight = () => {
    const myPokemonName = myPokemon.name.english;
    const enemyName = enemy.name.english;
    const myPokemonAttack = myPokemon.base.Attack;
    const enemyPokeAttack = enemy.base.Attack;
    const myPokemonDef = myPokemon.base.Defense;
    const enemyDef = enemy.base.Defense;
    const myPokemonSpeed = myPokemon.base.Speed;
    const enemyPokeSpeed = enemy.base.Speed;

    if (myPokemonSpeed > enemyPokeSpeed) {
      if (myPokemonAttack > enemyDef) {
        setWinner(myPokemonName);
        setUserWon(true);
      } else {
        setWinner(enemyName);
        setUserWon(false);
      }
    }
    if (enemyPokeSpeed > myPokemonSpeed) {
      if (enemyPokeAttack > myPokemonDef) {
        setWinner(enemyName);
        setUserWon(false);
      } else {
        setWinner(myPokemonName);
        setUserWon(true);
      }
    }
    // if (myPokemonSpeed > enemyPokeSpeed) {
    //   if (enemyPokeHP <= 0) {
    //     setWinner(myPokemonName);
    //     setUserWon(true);
    //   } else {
    //     setEnemyPokeHP(enemyPokeHP- (myPokemonAttack - enemyDef));
    //     setMyPokemonHP(prev - (enemyPokeAttack - myPokemonDef));
    //   }
    // } else {
    //   if (myPokemonHP <= 0) {
    //     setWinner(enemyName);
    //     setUserWon(false);
    //   } else {
    //     setMyPokemonHP(prev - (enemyPokeAttack - myPokemonDef));
    //     setEnemyPokeHP(prev - (myPokemonAttack - enemyDef));
    //   }
    // }
  };

  // setWinner(myPokemonName);
  //   // setUserWon(true);
  //   console.log(enemyPokeHP);
  // } else {
  //   myPokemonHP -= myPokemonHP <= 0 ? 0 : enemyPokeAttack - myPokemonDef;
  //   console.log(myPokemonHP);
  //   // setWinner(enemyName);
  //   // setUserWon(false);
  // }

  // if (enemyPokeHP === 0) {
  //   setWinner(myPokemonName);
  //   setUserWon(true);
  // } else if (myPokemonHP === 0) {
  //   setWinner(enemyName);
  //   setUserWon(false);
  // }
  // if (myPokemonAttack > enemyDef) {
  //   setWinner(myPokemonName);
  //   setUserWon(true);
  // } else {
  //   setWinner(enemyName);
  //   setUserWon(false);
  // }

  const handleGoHome = () => {
    navigate("/");
    setMyPokemon("");
    setEnemy("");
    setWinner("");
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PokemonList myPokemon={myPokemon} itemsPerPage={30} />} />
        <Route path="/pokemon/:id" element={<OnePokemon onClick={handleChoosePokemon} onGoHome={handleGoHome} />} />
        <Route path="/pokemon/:id/:info" element={<PokemonInfo onGoHome={handleGoHome} />} />
        <Route path="/fight" element={<FightScreen myPokemon={myPokemon} enemy={enemy} onFight={handleFight} onGoHome={handleGoHome} winner={winner} userWon={userWon} />} />
        <Route path="/leaderboard" element={<Leaderboard onGoHome={handleGoHome} />} />
      </Routes>
    </div>
  );
}

export default App;
