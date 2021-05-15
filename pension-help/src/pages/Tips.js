import {React, useState, useEffect} from "react";
import { Container, Row } from "react-bootstrap";
import Lightbulb from "../images/lightbulb.png";
import axios from "axios"

function Tips() {
const [yearlyspending, setYearlySpending] = useState()
  

  useEffect(() => {
    axios
      .get(global.apiurl + "/api/spendings/1")
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setYearlySpending(res.data.price * 12)
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  return (
    <div>
      <Container className="pt-3">
        <Row className="row d-flex justify-content-center text-center pb-3">
          <h3>Tips on saving</h3>
        </Row>
        <Row className="row d-flex justify-content-center text-center pt-4">
          <p><img src={Lightbulb} width="30" height="30" alt="user" />It looks like you don’t use Disney+ a lot, if you get rid of it, you will save €{Math.round(yearlyspending * 1) / 1} a year</p>
        </Row>
        <Row className="row d-flex justify-content-center text-center">
          <p><img src={Lightbulb} width="30" height="30" alt="user" />Think longer about your next purchase, so you don’t make impulse purchases.</p>
        </Row>
        <Row className="row d-flex justify-content-center text-center">
          <p><img src={Lightbulb} width="30" height="30" alt="user" />Want to watch one movie on a streaming platform? Unsubscribe after you have seen it.</p>
        </Row>
      </Container>
    </div>
  );
}

export default Tips;
