import { Button, Form, Container, Alert, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";

import { setAdmin, signInUser } from "../store/users/users.action";
import Title from "../components/Title";
import API_URL from "../utils/API_URL";

const loginSubTitle = (
  <p className="text-center">
    Don't have an account?{" "}
    <Link to="/register">
      <span>Create one here</span>
    </Link>
  </p>
);

const initialInputFields = {
  username: "",
  password: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [inputObject, setInputObject] = useState(initialInputFields);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonValid, setButtonValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("")
  const [showAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const { username, password } = inputObject;

  /* CHANGE HANDLER */
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
        const { data: user } = await axios.post(`${API_URL}/auth/signin`, {
          username,
          password,
        });
        if (user.username) {
          dispatch(signInUser(user));
          if (user.isAdmin) dispatch(setAdmin(true));
          navigate(`/`);
        } else {
          setIsLoading(false);
          setButtonValid(false);
          setShowErrorAlert(true);
          setTimeout(() => {
            setButtonValid(true);
            setShowErrorAlert(false);
          }, 2500);
        }
      } catch (error) {
        const serverErrorMessage = error.response.data.error
        setErrorMessage(serverErrorMessage)
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

  return (
    <>
      {(showAlert || showErrorAlert) && (
        <Alert
          className="alert"
          variant={showErrorAlert ? "danger" : "info"}
        >
          {showErrorAlert ? `${errorMessage}` : `Welcome!`}
        </Alert>
      )}

      <Title title="Log in" width="40%" />

      <Container className="text-center mt-3 pb-4">
        <Form
          noValidate
          validated={validated}
          className="dashboardBody__form"
          onSubmit={submitHandler}
        >
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              onChange={changeHandler}
              type="text"
              placeholder="Username"
              name="username"
              value={inputObject.username}
            />
            <Form.Control.Feedback type="invalid">
              Invalid username.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              onChange={changeHandler}
              type="password"
              placeholder="Password"
              name="password"
              value={inputObject.password}
            />
            <Form.Control.Feedback type="invalid">
              Invalid password.
            </Form.Control.Feedback>
          </Form.Group>

          {loginSubTitle}

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
              {isLoading ? "Please wait..." : "Login"}
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Register;
