import React from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';

function Goal({sentgoal}) {
    return (
        <Container className="pt-3">
        <Row>
          <Col>
            <Button href={"/YourSavings/details/" + sentgoal.id} variant="success" size="lg" block className="text-left">
              {sentgoal.description} €{sentgoal.maxGoal} 
            </Button>
          </Col>
        </Row>
      </Container>
    )
}

export default Goal;