import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ModalConfirm from "../components/ModalConfirm";
import Title from "../components/Title";
import { signUpUser } from "../store/users/users.action";
import axios from "axios";

const API_URL = `http://localhost:8000/v1`;


const Register = () => {
  // Form states
  const [validated, setValidated] = useState(false);
  const [inputObject, setInputObject] = useState({});
  const [userIsLoading, setUserIsLoading] = useState(false);
  const [buttonValid, setButtonValid] = useState(false);

  const { username, email, password } = inputObject;

  // Modal states
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Event Hadlers
  const handleClose = () => setShow(false);

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
        const { data: user } = await axios.post(`${API_URL}/auth/signup`, {
          username,
          email,
          password,
        });
        console.log(user);
        dispatch(signUpUser(user));
        setUserIsLoading(false);
        navigate(`/`);
      } catch (error) {
        console.log("err signup", error);
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
          <Form.Group className="mb-3" >
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
          <Form.Group className="mb-3" >
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
              {userIsLoading ? "Please wait..." : "Sign up"}
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Register;
