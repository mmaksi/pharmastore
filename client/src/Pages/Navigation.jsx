import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faRightToBracket,
  faChartLine,
  faCirclePlus,
  faCircleMinus,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { LinkContainer } from "react-router-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import Cart from "../components/Cart";
import { useDispatch, useSelector } from "react-redux";
import { selectCartCount } from "../store/cart/cart.selector";
import {
  selectIsAdmin,
  selectUser,
  selectUserIsLoggedIn,
} from "../store/users/users.selector";
import { clearUser } from "../store/users/users.action";
import { useState } from "react";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const handleClose = () => setMenuOpen(false);

  const dispatch = useDispatch();

  const cartCount = useSelector(selectCartCount);
  const isLoggedIn = useSelector(selectUserIsLoggedIn);
  const isAdmin = useSelector(selectIsAdmin);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(clearUser());
    navigate("/");
  };

  const runLogoutTimer = (dispatch, timer) => {
    setTimeout(() => {
      dispatch(clearUser());
    }, timer);
  };

  if (isLoggedIn) runLogoutTimer(dispatch, 1000 * 60 * 60 * 24);

  return (
    <>
      <Navbar
        className="p-3 mb-3"
        bg="dark"
        expand={isAdmin ? false : "lg"}
        variant="dark"
        sticky="top"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>PHARMASTORE</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} onClick={toggleMenu} />

          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-flase`}
            aria-labelledby={`offcanvasNavbarLabel-expand-false`}
            placement="end"
            restoreFocus={false}
            show={menuOpen}
            onHide={handleClose}
          >
            {/* Offcanvas header and title */}
            <Offcanvas.Header >
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
                {isLoggedIn
                  ? `Hi, ${user.username.toUpperCase()}`
                  : "PHARMASTORE"}
              </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body >
              <Nav className="ms-auto justify-content-end flex-grow-1 pe-3">
                {/* Offcanvas body - Register */}
                <LinkContainer onClick={toggleMenu} to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>

                {/* Offcanvas body - Login */}
                {!isLoggedIn && (
                  <LinkContainer onClick={toggleMenu} to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                )}

                {/* Offcanvas body - Logout */}
                {isLoggedIn && (
                  <LinkContainer onClick={logoutHandler} to="login">
                    <Nav.Link>Logout</Nav.Link>
                  </LinkContainer>
                )}

                {/* Offcanvas body - Cart */}
                {!isAdmin && isLoggedIn && (
                  <LinkContainer onClick={toggleMenu} to={isLoggedIn ? `/checkout` : `/login`}>
                    <Nav.Link>
                      <Cart count={cartCount} />
                    </Nav.Link>
                  </LinkContainer>
                )}

                {isLoggedIn && <NavDropdown.Divider />}

                {/* Offcanvas body - Add Product */}
                {isAdmin && (
                  <LinkContainer onClick={toggleMenu} to={`/addProduct`}>
                    <Nav.Link>
                      <FontAwesomeIcon icon={faCirclePlus} className="me-2" />
                      Add Product
                    </Nav.Link>
                  </LinkContainer>
                )}

                {/* Offcanvas body - Remove Product */}
                {isAdmin && (
                  <LinkContainer onClick={toggleMenu} to={`/removeProduct`}>
                    <Nav.Link>
                      <FontAwesomeIcon icon={faCircleMinus} className="me-2" />
                      Remove Product
                    </Nav.Link>
                  </LinkContainer>
                )}

                {/* Offcanvas body - Orders */}
                {isAdmin && (
                  <LinkContainer onClick={toggleMenu} to="/orders">
                    <Nav.Link>
                      <FontAwesomeIcon icon={faStore} className="me-2" />
                      Orders
                    </Nav.Link>
                  </LinkContainer>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Navigation;
