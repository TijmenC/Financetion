import {React, useState, useEffect} from 'react';
import { Container, Row, ProgressBar, Col, Figure, Modal, Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "../styling/YourSavings.css";
import axios from "axios"
import Car from "../images/car.png"
import Thumbsup from "../images/thumb-up.png"
import Calculator from "../images/calculator.png"
import Back from "../images/back.png";

function YourSavingsDetailed(props) {
    const [modalShowing, setModalShowing] = useState(false);
    const [percentage, setPercentage] = useState('');
    const [monthlygoal, setMonthlyGoal] = useState();

    

    const handleInputChangeMoney = (event) => {
        const eventvalue = Number.parseInt(event.target.value, 10)
        setSavedGoal({ ...savedGoal, addMoney: eventvalue });
    };

    const saveGoal = () => {
        axios
          .put(global.apiurl + `/api/saving/${savedGoal.id}`, savedGoal)
          .then((response) => {
        console.log(response)
            setModalShowing(false)
            reload()
          })
          .catch((e) => {
            console.log(e);
          });
      };
  

    const [savedGoal, setSavedGoal] = useState(
        {
            id: '',
            description: '',
            currentGoal: '',
            maxGoal: '',
            addMoney: ''
        }
    );

    useEffect(() => {
      axios
        .get(global.apiurl + "/api/saving/" + props.match.params.id)
        .then((res) => {
          console.log(res);
          console.log(res.data);
          setSavedGoal(res.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }, [props.match.params.id]);

    const reload = () => {
      axios
      .get(global.apiurl + "/api/saving/" + props.match.params.id)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setSavedGoal(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    }

    useEffect(() => {
      setPercentage(savedGoal.currentGoal * 100 / savedGoal.maxGoal)
      const moneyLeft = savedGoal.maxGoal - savedGoal.currentGoal
      setMonthlyGoal(moneyLeft/12)
      // eslint-disable-next-line
    }, [savedGoal.currentGoal]);


    return (
        <div>
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
                    <h3>{savedGoal.description}</h3>
                </Row>
                <Row className="row d-flex justify-content-center text-center">
                    <Figure>
                    <Figure.Image width={121} height={130} alt="171x180" src={Car} />
                    </Figure>
                    <br />
                </Row>
                <Row className="row d-flex justify-content-center text-center">
                    <Col md="6">
                        <ProgressBar label={Math.round(percentage * 10) / 10 + "%"} now={savedGoal.currentGoal} max={savedGoal.maxGoal} variant="success"></ProgressBar>
                    </Col>
                </Row>
                <br />
                <Row className="row d-flex justify-content-center text-center">
                    <Col md="4">
                        Current: €{savedGoal.currentGoal}
                    </Col>
                    <Col md="4">
                        Max: €{savedGoal.maxGoal}
                    </Col>
                </Row>
                <br />
                <Row className="row d-flex justify-content-center text-center">
                    <Col md="0.5">
                    <Figure>
                        <Figure.Image
                            width={50}
                            height={50}
                            alt="50x50"
                            src={Thumbsup}
                        />
                    </Figure>
                    </Col>
                    <Col md="6">
                        <h5> Keep up the good work you're {Math.round(percentage * 1) / 1}% to your goal! </h5>
                    </Col>
                </Row>
                <br />
                <Row className="row d-flex justify-content-center text-center">
                    <Col md="0.5">
                    <Figure>
                        <Figure.Image
                            width={50}
                            height={50}
                            alt="50x50"
                            src={Calculator}
                        />
                    </Figure>
                    </Col>
                    <Col md="6">
                        <h5> If you keep adding <b>€{Math.round(monthlygoal * 1) / 1} PM</b> you'll be done in <b>12 months!</b> </h5>
                    </Col>
                </Row>
                <Row className="row d-flex justify-content-center text-center">
                <Link to={"/YourSavings/edit/" + savedGoal.id}>Edit Savings</Link>
                </Row>
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
            Add Money!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Add Money</Form.Label>
              <Form.Control
                name="addmoney"
                type="number"
                value={savedGoal.addMoney}
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
        </div >
    )
}

export default YourSavingsDetailed;