import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import Back from "../images/back.png";
import ReactStars from "react-rating-stars-component";

const MySpendingsEdit = (props) => {
  const [currentSpending, setCurrentSpending] = useState({
    id: null,
    description: "",
    price: "",
    rating: "",
  });
  const [showStars, setshowStars] = useState(false);

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
      value={currentSpending.rating}
      count={5}
      onChange={handleRatingChange}
      size={24}
      activeColor="#ffd700"
    />
  );

  useEffect(() => {
    getSpending(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const eventname = event.target.name;
    const eventvalue = event.target.value;
    setCurrentSpending({ ...currentSpending, [eventname]: eventvalue });
  };
  const handleInputChangeMoney = (event) => {
    const eventname = event.target.name;
    const eventvalue = Number.parseInt(event.target.value, 10);
    setCurrentSpending({ ...currentSpending, [eventname]: eventvalue });
  };
  const handleRatingChange = (event) => {
    const eventvalue = event;
    setCurrentSpending({ ...currentSpending, rating: eventvalue });
  };

  const updateSpending = () => {
    axios
      .put(global.apiurl + `/api/spendings/${currentSpending.id}`, currentSpending)
      .then((response) => {
        console.log(response);
        props.history.push(`/MySpendings/details/${currentSpending.id}`);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteSpending = () => {
    axios
      .delete(global.apiurl + `/api/spendings/${currentSpending.id}`)
      .then((response) => {
        props.history.push("/MySpendings");
      })
      .catch((e) => {
        console.log(e);
      });
  };

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
        <h3>Edit spending</h3>
      </Row>
      <Row className="row d-flex justify-content-center text-center">
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="description"
              type="text"
              value={currentSpending.description}
              placeholder="Enter name"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price PM</Form.Label>
            <Form.Control
              name="price"
              type="number"
              value={currentSpending.price}
              placeholder="€ Enter price PM"
              onChange={handleInputChangeMoney}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Rating</Form.Label>
            <Row className="row d-flex justify-content-center text-center">
              {showStars ? <ShowStarRatings /> : null}
            </Row>
          </Form.Group>
        </Form>
      </Row>
      <Row className="row d-flex justify-content-center text-center pt-3">
        <Button variant="success" onClick={updateSpending} link to="">
          Save changes
        </Button>
      </Row>
      <Row className="row d-flex justify-content-center text-center pt-3">
        <Button variant="danger" onClick={deleteSpending}>
          Delete spending
        </Button>
      </Row>
    </Container>
  );
};

export default MySpendingsEdit;
