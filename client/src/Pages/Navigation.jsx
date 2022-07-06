import { Outlet } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import Cart from "../components/Cart";
import "./Navigation.scss"

const Navigation = () => {
  return (
    <>
      <Navbar className="navigation p-3 mb-3" bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/">PHARMSHOP</Navbar.Brand>
          <Nav className="ms-auto">
            <LinkContainer to="/register">
              <Nav.Link className="h5">Register</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/login">
              <Nav.Link className="h5">Admin</Nav.Link>
            </LinkContainer>

            <Navbar.Text className="h5 ps-2">
              <Cart />
            </Navbar.Text>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Navigation;
