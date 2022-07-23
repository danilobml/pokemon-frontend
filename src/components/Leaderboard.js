import "./Leaderboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import serverURL from "../serverURL";
import { Container, Row, Col, Button } from "react-bootstrap";
const axios = require("axios").default;

const Leaderboard = () => {
  const [score, setScore] = useState();
  const [winnerList, setWinnerList] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${serverURL}/game/leaderboard`)
      .then((response) => setScore(response.data))
      .catch((error) => console.log(error));

    axios
      .get(`${serverURL}/game/leaderboard/counter`)
      .then((response) => setWinnerList(response.data))
      .catch((error) => console.log(error));
  }, []);

  if (!score) {
    return <h1>"Loading..."</h1>;
  }

  const userWinsNumber = score.filter((fight) => fight.user_won == true);
  const enemyWinsNumber = score.filter((fight) => fight.user_won == false);

  return (
    <Container fluid className="d-flex flex-column justify-content-center align-items-center pt-3 leader" style={{ height: "100vh" }}>
      <h1>Leaderboard</h1>
      <Button onClick={() => navigate("/")}>Home</Button>
      <Row className="d-flex flex-column justify-content-center align-items-center leader-container">
        <Col>
          <h4>
            You've won: <span className="wins"> {userWinsNumber.length} </span> times! Keep working on being your very best!
          </h4>
          <h4>
            The enemy Pokemon won: <span className="wins"> {enemyWinsNumber.length} </span> times! Even if you lose in battle, if you surpass what you've done before, you have bested yourself. `
          </h4>
          <h3>Pokemon Leaders - Vicotories:</h3>
          <ul>
            {winnerList &&
              winnerList.map((item, index) => {
                return (
                  <li key={index}>
                    {item._id} : {item.count}
                  </li>
                );
              })}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Leaderboard;
