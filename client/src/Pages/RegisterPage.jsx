import { useState } from "react";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Title from "../components/Title";
import { signUpUser } from "../store/users/users.action";
import axios from "axios";
import API_URL from "../utils/API_URL";

const initialInputFields = { username: "", email: "", password: "" };

const Register = () => {
  // Form states
  const [validated, setValidated] = useState(false);
  const [inputObject, setInputObject] = useState(initialInputFields);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonValid, setButtonValid] = useState(true);
  const [showSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const { username, email, password } = inputObject;

  // Modal states
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* EVENT HANDLERS */
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
          }, 2000);
        }
        alert("User already exists with these credentials.")
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
      {(showSuccessAlert || showErrorAlert) && (
        <Alert
          className="alert"
          variant={showErrorAlert ? "danger" : "success"}
        >
          {showErrorAlert
            ? `Something went wrong! Please try again.`
            : `Welcome!`}
        </Alert>
      )}
     
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
              {isLoading && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
              )}
              {isLoading ? "Please wait..." : "Sign Up"}
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Register;
