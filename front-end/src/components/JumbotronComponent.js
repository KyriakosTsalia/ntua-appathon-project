import React from "react";
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import "../index.css"

function JumbotronComponent() {
  return (
    <div className="text-center">
      <Jumbotron fluid>
        <Container>
          <h1 className="display-2">CORD-19</h1>
          <h2 className="lead-4">Welcome to the world's biggest corpus of academic papers about COVID-19 and related coronavirus research.</h2>
          <hr className="my-4" />
          <h3>Quickly search for the disease of your choice and information about research related to it,
          all while choosing how recent you want the search to be.</h3>
        </Container>
      </Jumbotron>
    </div>
  )
}

export default JumbotronComponent;
