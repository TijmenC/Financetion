import React, { useState, useEffect } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Back from "../images/back.png";
import ReactStars from "react-rating-stars-component";

const MySpendingsDetails = (props) => {
  const [currentSpending, setCurrentSpending] = useState({
    id: null,
    description: "",
    price: "",
    rating: null,
  });

  const [showStars, setshowStars] = useState(false);

  useEffect(() => {
    getSpending(props.match.params.id);
  }, [props.match.params.id]);

  const getSpending = (id) => {
    axios
      .get(global.apiurl + `/api/spendings/${id}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setCurrentSpending(res.data);
        setshowStars(true);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const ShowStarRatings = () => (
    <ReactStars
      count={5}
      value={currentSpending.rating}
      size={24}
      activeColor="#ffd700"
      edit={false}
    />
  );

  return (
    <Container className="pt-3">
      <Row>
        <Col>
          <Link to={"/MySpendings"}>
            <Button className="btn bg-transparent">
              <img src={Back} width="30" height="30" alt="menu" />
            </Button>
          </Link>
        </Col>
      </Row>
      <Row className="row d-flex justify-content-center text-center">
        <h3>{currentSpending.description}</h3>
      </Row>
      <Row className="row d-flex justify-content-center text-center">
        <Container className="pt-3">
          <p>Price PM: €{currentSpending.price}</p>
        </Container>
      </Row>
      <Row className="row d-flex justify-content-center text-center">
        {showStars ? <ShowStarRatings /> : null}
      </Row>
      <br />
      <Row className="row d-flex justify-content-center text-center">
        <Link to={"/MySpendings/edit/" + currentSpending.id}>
          Edit spending
        </Link>
      </Row>
    </Container>
  );
};

export default MySpendingsDetails;
