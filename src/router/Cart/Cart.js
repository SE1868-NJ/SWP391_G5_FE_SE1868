import React from "react";
import { Container, Row } from "react-bootstrap";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";

function Cart() {
  return (
    <div>
      <Header />
      <Container fluid>
        <Row className="ml-3">
          <h2 style={{ color: "black", fontSize: "30px", textAlign: "center" }}>Shopping Cart</h2>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default Cart;