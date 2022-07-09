import "./App.css";
import { Routes, Route } from "react-router-dom";
import PokemonList from "./components/PokemonList";
import OnePokemon from "./components/OnePokemon";
import PokemonInfo from "./components/PokemonInfo";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:id" element={<OnePokemon />} />
        <Route path="/pokemon/:id/:info" element={<PokemonInfo />} />
      </Routes>
    </div>
  );
}

export default App;
