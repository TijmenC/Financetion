import { React, useState, useEffect } from "react";
import { Modal, Button, Container, Form, Row } from "react-bootstrap";
import Spending from "../components/Spending";
import "../styling/MySpendings.css";
import axios from "axios";
import ReactStars from "react-rating-stars-component";

function MySpendings() {
  const [spendings, setSpendings] = useState([]);
  const [savedSpending, setSavedSpending] = useState({
    description: "",
    price: "",
    rating: null,
  });

  const handleInputChange = (event) => {
    const eventname = event.target.name;
    const eventvalue = event.target.value;
    setSavedSpending({ ...savedSpending, [eventname]: eventvalue });
  };
  const handleInputChangeMoney = (event) => {
    const eventname = event.target.name;
    const eventvalue = Number.parseInt(event.target.value, 10);
    setSavedSpending({ ...savedSpending, [eventname]: eventvalue });
  };

  const handleRatingChange = (event) => {
    const eventvalue = event;
    setSavedSpending({ ...savedSpending, rating: eventvalue });
  };

  const saveSpending = () => {
    axios
      .post(global.apiurl + "/api/spendings", savedSpending)
      .then((response) => {
        setSpendings([...spendings, response.data]);
        console.log(response);
        setModalShowing(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    axios
      .get(global.apiurl + "/api/spendings")
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setSpendings(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);
  const [modalShowing, setModalShowing] = useState(false);

  return (
    <>
      <div>
        <Container className="pt-3">
          <Row className="row d-flex justify-content-center text-center">
            <h3>My Spendings</h3>
          </Row>
          {spendings.map((spending) => (
            <Spending key={spending.id} spending={spending} />
          ))}
          <button className="float" onClick={() => setModalShowing(true)}>
            <h3>+</h3>
            <i className="fa fa-plus my-float"></i>
          </button>
        </Container>

        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={modalShowing}
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Add spending
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="description"
                  type="text"
                  value={savedSpending.description}
                  placeholder="Enter name"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Price PM</Form.Label>
                <Form.Control
                  name="price"
                  type="number"
                  value={savedSpending.price}
                  placeholder="€ Enter price PM"
                  onChange={handleInputChangeMoney}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Rating</Form.Label>
                <ReactStars
                  value={savedSpending.rating}
                  count={5}
                  onChange={handleRatingChange}
                  size={24}
                  activeColor="#ffd700"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={saveSpending}>
              Save
            </Button>
            <Button variant="danger" onClick={() => setModalShowing(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default MySpendings;
