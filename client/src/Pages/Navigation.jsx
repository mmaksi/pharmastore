import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faRightToBracket,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Navigate, Outlet } from "react-router-dom";
import Cart from "../components/Cart";
import { useDispatch, useSelector } from "react-redux";
import { selectCartCount } from "../store/cart/cart.selector";
import { selectUserIsLoggedIn } from "../store/users/users.selector";
import { clearUser, setUserIsLoggedIn } from "../store/users/users.action";

const Navigation = () => {
  const dispatch = useDispatch();

  const cartCount = useSelector(selectCartCount);
  const userIsLoggedIn = useSelector(selectUserIsLoggedIn);

  const logoutHandler = () => {
    // dispatch(setUserIsLoggedIn(false))
    dispatch(clearUser());
    Navigate("/");
  };

  const runLogoutTimer = (dispatch, timer) => {
    setTimeout(() => {
      dispatch(clearUser());
    }, timer);
  };

  if (userIsLoggedIn) runLogoutTimer(dispatch, 1000 * 60 * 60 * 24)

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

            {!userIsLoggedIn && (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}

            {/* {`${userIsLoggedIn}` ? `Logout` : `Signin`} */}

            {userIsLoggedIn && (
              <LinkContainer to="/" onClick={logoutHandler}>
                <Nav.Link>Logout</Nav.Link>
              </LinkContainer>
            )}

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
