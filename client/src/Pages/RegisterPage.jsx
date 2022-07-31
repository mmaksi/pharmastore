import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ModalConfirm from "../components/ModalConfirm";
import Title from "../components/Title";
import { signUpUser } from "../store/users/users.action";
import axios from "axios";

const API_URL = `http://localhost:8000/v1`;
const initialInputFields = { username: "", email: "", password: "" };

const Register = () => {
  // Form states
  const [validated, setValidated] = useState(false);
  const [inputObject, setInputObject] = useState(initialInputFields);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonValid, setButtonValid] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const { username, email, password } = inputObject;

  // Modal states
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  console.log("params", params);

  /* EVENT HANDLERS */
  const handleClose = () => setShow(false);

  const changeHandler = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    setInputObject({ ...inputObject, [inputName]: inputValue });
  };

  /* SUBMIT HANDLER */
  const submitHandler = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    if (form.checkValidity()) {
      setIsLoading(true);
      setValidated(false);
      setButtonValid(false);
      try {
        const { data: user } = await axios.post(`${API_URL}/auth/signup`, {
          username,
          email,
          password,
        });
        if (user.username) {
          dispatch(signUpUser(user));
          setTimeout(() => {
            navigate(`/`);
          }, 2500);
        }
      } catch (error) {
        setInputObject(initialInputFields);
        setIsLoading(false);
        setButtonValid(false);
        setShowErrorAlert(true);
        setTimeout(() => {
          setButtonValid(true);
          setShowErrorAlert(false);
        }, 2500);
      }
    }
  };

  const registerSubTitle = (
    <p className="text-center">
      Already a member?{" "}
      <Link to="/login">
        <span>Log in here</span>
      </Link>
    </p>
  );

  return (
    <>
      {(showAlert || showErrorAlert) && (
        <Alert
          className="alert"
          variant={showErrorAlert ? "danger" : "success"}
        >
          {showErrorAlert
            ? `Something went wrong! Please try again.`
            : `Welcome!`}
        </Alert>
      )}

      <ModalConfirm
        show={show}
        handleClose={handleClose}
        title="Confirm your deletion"
        body="This will permenantly delete the product from the database. Are you sure
        of your action?"
        action="DELETE"
      />
      <Title title="Sign Up" width="40%" />

      <Container className="text-center mt-3 pb-4">
        <Form
          noValidate
          validated={validated}
          className="dashboardBody__form"
          onSubmit={submitHandler}
        >
          {/* Username */}
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              onChange={changeHandler}
              type="text"
              placeholder="Username"
              name="username"
            />
            <Form.Control.Feedback type="invalid">
              Required field.
            </Form.Control.Feedback>
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              required
              onChange={changeHandler}
              type="email"
              placeholder="username@example.com"
              name="email"
            />
            <Form.Control.Feedback type="invalid">
              Invalid email.
            </Form.Control.Feedback>
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              onChange={changeHandler}
              type="password"
              placeholder="Password"
              name="password"
            />
            <Form.Control.Feedback type="invalid">
              Invalid password.
            </Form.Control.Feedback>
          </Form.Group>

          {registerSubTitle}

          <div className="d-grid gap-2">
            <Button
              disabled={buttonValid ? false : true}
              variant="outline-dark"
              type="submit"
            >
              {isLoading ? "Please wait..." : "Sign up"}
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Register;
