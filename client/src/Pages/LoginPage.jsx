import { Button, Form, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";

import { setAdmin, signInUser } from "../store/users/users.action";
import Title from "../components/Title";

const loginSubTitle = (
  <p className="text-center">
    Don't have an account?{" "}
    <Link to="/register">
      <span>Create one here</span>
    </Link>
  </p>
);

const API_URL = `http://localhost:8000/v1`;

const initialState = {
  username: "",
  password: ""
}

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [inputObject, setInputObject] = useState(initialState);
  const [userIsLoading, setUserIsLoading] = useState(false);
  const [buttonValid, setButtonValid] = useState(true);

  const { username, password } = inputObject;

  /* CHANGE HANDLER */
  const changeHandler = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    setInputObject({ ...inputObject, [inputName]: inputValue });
  };

  /* SUBMIT HANDLER */
  const submitHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      setValidated(false);
      setUserIsLoading(true);
      try {
        const { data: user } = await axios.post(`${API_URL}/auth/signin`, {
          username,
          password,
        });
        if (user.username) {
          setUserIsLoading(false);
          dispatch(signInUser(user));
          if (user.isAdmin) dispatch(setAdmin(true));
          navigate(`/`);
        } else {
          alert(`Wrong username or password`);
        }
      } catch (error) {
        setUserIsLoading(false);
        console.log("err signin", error);
      }
    }
  };

  return (
    <>
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
              {userIsLoading ? "Please wait..." : "Login"}
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Register;
