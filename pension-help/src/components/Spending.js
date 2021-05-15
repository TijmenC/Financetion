import React from "react";
import { Button, Row, Col, Container } from "react-bootstrap";

function Spending({ spending }) {
  return (
    <Container className="pt-3">
      <Row>
        <Col>
          <Button href={"MySpendings/details/" + spending.id} variant="danger" size="lg" block>
            {spending.description} €{spending.price} PM
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Spending;
