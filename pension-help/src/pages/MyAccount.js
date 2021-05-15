import React from "react";
import { Container, Row } from "react-bootstrap";
import User from "../images/user.png";
import { Link } from "react-router-dom";

function MyAccount() {
  return (
    <div>
      <Container className="pt-3">
        <Row className="row d-flex justify-content-center text-center pb-3">
          <h3>My account</h3>
        </Row>
        <Row className="row d-flex justify-content-center text-center">
          <img src={User} width="100" height="100" alt="user" />
        </Row>
        <Row className="row d-flex justify-content-center text-center pt-4">
          <p>Name: Peter Janssen</p>
        </Row>
        <Row className="row d-flex justify-content-center text-center">
          <p>Age: 48</p>
        </Row>
        <Row className="row d-flex justify-content-center text-center">
          <p>Monthly budget: €500</p>
        </Row>
        <Row className="row d-flex justify-content-center text-center">
          <p>Retirement age goal: 64</p>
        </Row>
        <Row className="row d-flex justify-content-center text-center">
          <Link to={"/MyAccount/edit/"}>
            Edit account info
          </Link>
        </Row>
      </Container>
    </div>
  );
}

export default MyAccount;
