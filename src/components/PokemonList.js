import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import serverURL from "../serverURL";
import ReactPaginate from "react-paginate";
const axios = require("axios").default;

function PokemonList({ itemsPerPage }) {
  const [pokemons, setPokemons] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [loading, setLoading] = useState(true);

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
    <Container fluid className="d-flex flex-column flex-wrap" style={{ height: "100vh" }}>
      <Container className="d-flex flex-column flex-wrap">
        <Row>
          <ul style={{ listStyleType: "none" }}>
            {pokemons.map((pokemon, index) => (
              <Col key={index}>
                <li>
                  <Link to={`/pokemon/${pokemon.id}`}>{pokemon.name.english}</Link>
                </li>
              </Col>
            ))}
          </ul>
        </Row>
      </Container>
      <ReactPaginate nextLabel="Next >" previousLabel="< Previous" breakLabel="..." onPageChange={handleChange} pageCount={totalPages} pageClassName="page-item" pageLinkClassName="page-link" nextClassName="page-item" nextLinkClassName="page-link" previousLinkClassName="page-link" breakClassName="page-item" breakLinkClassName="page-link" containerClassName="pagination" activeClassName="active" pageRangeDisplayed={5} marginPagesDisplayed={5} />
    </Container>
  );
}

export default PokemonList;
