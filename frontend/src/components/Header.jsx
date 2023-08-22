import React from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";

const Header = () => {
  const { cartItem } = useSelector((state) => state.cart);
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" /> King Shop
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <LinkContainer to="/cart">
              <Nav.Link>
                <FaShoppingCart /> Cart
                {cartItem.length > 0 && (
                  <Badge pill bg="success">
                    {cartItem.reduce((a, c) => a + +c.qty, 0)}
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link href="/login">
                <FaUser /> Sign In
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
