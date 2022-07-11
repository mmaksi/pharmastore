import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faRightToBracket,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Outlet } from "react-router-dom";
import Cart from "../components/Cart";
import { useSelector } from "react-redux";
import { selectCartCount } from "../store/cart/cart.selector";

const Navigation = () => {
  const cartCount = useSelector(selectCartCount);

  return (
    <>
      <Navbar className="p-3 mb-3" bg="dark" variant="dark" sticky="top">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>PHARMASTORE</Navbar.Brand>
          </LinkContainer>
          
          <Nav className="ms-auto">
            <LinkContainer to="/register">
              <Nav.Link>Register</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/dashboard">
              <Nav.Link>Dashboard</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/checkout">
              <Nav.Link>
                <Cart count={cartCount} />
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Navigation;
