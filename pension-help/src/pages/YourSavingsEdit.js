import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import Back from "../images/back.png";

const MySavingsEdit = (props) => {
  const [currentSaving, setCurrentSaving] = useState({
    id: null,
    description: "",
    maxGoal: "",
  });

  const getSaving = (id) => {
    axios
      .get(global.apiurl + `/api/saving/${id}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setCurrentSaving(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    getSaving(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const eventname = event.target.name;
    const eventvalue = event.target.value;
    setCurrentSaving({ ...currentSaving, [eventname]: eventvalue });
  };
  const handleInputChangeMoney = (event) => {
    const eventname = event.target.name;
    const eventvalue = Number.parseInt(event.target.value, 10);
    setCurrentSaving({ ...currentSaving, [eventname]: eventvalue });
  };

  const updateSaving = () => {
    axios
      .put(global.apiurl + `/api/saving/${currentSaving.id}`, currentSaving)
      .then((response) => {
        console.log(response);
        props.history.push(`/YourSavings/details/${currentSaving.id}`);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteSaving = () => {
    axios
      .delete(global.apiurl + `/api/saving/${currentSaving.id}`)
      .then((response) => {
        props.history.push("/YourSavings");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container className="pt-3">
      <Row>
        <Col>
          <Link to={"/YourSavings"}>
            <Button className="btn bg-transparent">
              <img src={Back} width="30" height="30" alt="back" />
            </Button>
          </Link>
        </Col>
        </Row>
        <Row className="row d-flex justify-content-center text-center">
        <Col>
          <h3>Edit Saving</h3>
        </Col>
        </Row>
      <Row className="row d-flex justify-content-center text-center">
        <Form>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              type="text"
              value={currentSaving.description}
              placeholder="Enter name"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Max Goal</Form.Label>
            <Form.Control
              name="maxGoal"
              type="number"
              value={currentSaving.maxGoal}
              placeholder="€ Enter price PM"
              onChange={handleInputChangeMoney}
            />
          </Form.Group>
        </Form>
      </Row>
      <Row className="row d-flex justify-content-center text-center pt-3">
        <Button variant="success" onClick={updateSaving} link to="">
          Save changes
        </Button>
      </Row>
      <Row className="row d-flex justify-content-center text-center pt-3">
        <Button variant="danger" onClick={deleteSaving}>
          Delete saving
        </Button>
      </Row>
    </Container>
  );
};

export default MySavingsEdit;
