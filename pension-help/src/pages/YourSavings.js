import { React, useState, useEffect } from "react";
import { Modal, Button, Container, Form } from "react-bootstrap";
import Goal from "../components/Goal";
import "../styling/YourSavings.css";
import axios from "axios";


function YourSavings() {
  

  const [goals, setGoals] = useState([]);
  const [savedGoal, setSavedGoal] = useState(
      {
          description: '',
          maxGoal: '',
      }
  );

  const handleInputChange = (event) => {
    const eventname = event.target.name
    const eventvalue = event.target.value
    setSavedGoal({ ...savedGoal, [eventname]: eventvalue });
  };
  const handleInputChangeMoney = (event) => {
    const eventname = event.target.name
    const eventvalue = Number.parseInt(event.target.value, 10)
    setSavedGoal({ ...savedGoal, [eventname]: eventvalue });
};

  const saveGoal = () => {
    axios
      .post(global.apiurl + "/api/saving", savedGoal)
      .then((response) => {
          setGoals([ ...goals, response.data])
    console.log(response)
        setModalShowing(false)
      })
      .catch((e) => {
        console.log(e);
      });
  };

  

  useEffect(() => {
    axios
      .get(global.apiurl + "/api/saving")
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setGoals(res.data);
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
          <h3>Your Savings</h3>
          {goals.map((goals) => (
            <Goal key={goals.id} sentgoal={goals} />
          ))}
          <button class="float" onClick={() => setModalShowing(true)}>
            <h3>+</h3>
            <i class="fa fa-plus my-float"></i>
          </button>
        </Container>
      
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modalShowing}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add a new goal!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Goal</Form.Label>
              <Form.Control
                name="description"
                type="text"
                value={savedGoal.description}
                placeholder="Enter Goal"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Cost</Form.Label>
              <Form.Control
                name="maxGoal"
                type="number"
                value={savedGoal.maxGoal}
                placeholder="€ ..."
                onChange={handleInputChangeMoney}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={saveGoal}>
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

export default YourSavings;
