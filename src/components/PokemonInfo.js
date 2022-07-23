import "./OnePokemon.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import serverURL from "../serverURL";
const axios = require("axios").default;

function PokemonInfo() {
  const [stats, setStats] = useState();
  const { id, info } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${serverURL}/api/pokemon/${id}/${info}`)
      .then(function (response) {
        setStats(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id, info]);

  console.log(info);
  if (!stats) {
    return <h1>Loading</h1>;
  }
  return (
    <Container fluid className="d-flex flex-column justify-content-center align-items-center pt-3 cont" style={{ height: "100vh" }}>
      <div className="box">
        <h1>{info}</h1>

        {info === "base" ? (
          <ul>
            <li>HP: {stats.HP}</li>
            <li>Attack: {stats.Attack}</li>
            <li>Defense: {stats.Defense}</li>
            <li>Sp. Attack: {stats["Sp. Attack"]}</li>
            <li>Sp. Defense: {stats["Sp. Defense"]}</li>
            <li>Speed: {stats.Speed}</li>
          </ul>
        ) : info === "name" ? (
          <ul>
            <li>English: {stats.english}</li>
            <li>Japanese: {stats.japanese}</li>
            <li>Chinese: {stats.chinese}</li>
            <li>French: {stats.french}</li>
          </ul>
        ) : (
          <ul>
            {stats.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        )}
      </div>
      <Button onClick={() => navigate(-1)}>Back</Button>
    </Container>
  );
}

export default PokemonInfo;
