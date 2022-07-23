import "./PokemonList.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import serverURL from "../serverURL";
import ReactPaginate from "react-paginate";
import PokemonCard from "./PokemonCard";
const axios = require("axios").default;

function PokemonList({ itemsPerPage }) {
  const [pokemons, setPokemons] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    axios
      .get(`${serverURL}/api/pokemon`)
      .then(function (response) {
        setPokemons(response.data.slice(itemOffset, endOffset));
        setTotalPages(Math.ceil(response.data.length / itemsPerPage));
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  }, [itemOffset, itemsPerPage]);

  const handleChange = (page) => {
    const newOffset = page.selected * itemsPerPage;
    setItemOffset(newOffset);
  };

  if (!pokemons || loading) {
    return <h1>Loading....</h1>;
  }
  return (
    <Container fluid className="d-flex flex-column align-items-center text-center main" style={{ height: "100vh" }}>
      <h1>Choose your Pokemon!</h1>
      <Button size="sm" onClick={() => navigate("/leaderboard")}>
        Leaderboard
      </Button>
      <Container className="d-flex flex-column">
        <ul style={{ listStyleType: "none", display: "flex", flexDirection: "column", flexWrap: "wrap", maxHeight: "83vh" }}>
          {pokemons.map((pokemon, index) => (
            <li key={index} style={{ fontSize: "1.4rem" }}>
              <Link className="link" to={`/pokemon/${pokemon.id}`}>
                <PokemonCard name={pokemon.name.english} />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
      <ReactPaginate nextLabel="Next >" previousLabel="< Previous" breakLabel="..." onPageChange={handleChange} pageCount={totalPages} pageClassName="page-item" pageLinkClassName="page-link" nextClassName="page-item" nextLinkClassName="page-link" previousLinkClassName="page-link" breakClassName="page-item" breakLinkClassName="page-link" containerClassName="pagination" activeClassName="active" pageRangeDisplayed={5} marginPagesDisplayed={5} />
    </Container>
  );
}

export default PokemonList;
