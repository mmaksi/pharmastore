import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "./DashboardForm.scss";
import ModalConfirm from "./ModalConfirm";
import Title from "./Title";
import axios from "axios";
import { signInUser, signUpUser } from "../store/users/users.action";
import { useNavigate } from "react-router-dom";

const API_URL = `http://localhost:8000/v1`;

const DashboardForm = ({
  title,
  labels,
  placeholders,
  btnDetails,
  types,
  names,
  accepts,
  formSubTitle,
  invalidInputMessages,
}) => {
  // Form states
  const [validated, setValidated] = useState(false);
  const [inputObject, setInputObject] = useState({});
  const [userIsLoading, setUserIsLoading] = useState(false);
  const [buttonValid, setButtonValid] = useState(false);

  const { productName, category, imageUrl, price, username, email, password } =
    inputObject;

  // Modal states
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  // Redux Dispatch
  const dispatch = useDispatch();
  // React Router Navigate
  const navigate = useNavigate();

  const changeHandler = (e) => {
    // Enables form validation error messages
    setValidated(true);
    const form = e.currentTarget;
    form.checkValidity() ? setButtonValid(true) : setButtonValid(false);

    const inputName = e.target.name;
    const inputValue =
      inputName === "imageUrl"
        ? URL.createObjectURL(e.target.files[0])
        : e.target.value;
    setInputObject({ ...inputObject, [inputName]: inputValue });
    console.log({ ...inputObject, [inputName]: inputValue });

    // if (inputName === "email") {
    //   // axios.get()
    // }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    const buttonText = form.lastElementChild.lastElementChild.innerText
    setButtonValid(false);
    if (form.checkValidity() === false) {
      setButtonValid(true);
    }

    switch (buttonText) {
      case "Add product":
        setShow(false);
        console.log(productName, category, imageUrl, price);
        axios
          .post("http://localhost:8000/v1/products", {
            productName,
            category,
            imageUrl,
            price,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        break;

      case "Remove product":
        setShow(true);
        break;

      case "Sign Up":
        setUserIsLoading(true);

        try {
          const { data: user } = await axios.post(`${API_URL}/auth/signup`, {
            username,
            email,
            password,
          });
          dispatch(signUpUser(user));
          setUserIsLoading(false);
          navigate(`/`);
        } catch (error) {
          console.log("err signup", error);
        }
        break;

      case "Log in":
        setUserIsLoading(true);
        try {
          const { data: user } = await axios.post(`${API_URL}/auth/signin`, {
            username,
            password,
          });
          dispatch(signInUser(user));
          setUserIsLoading(false);
          navigate(`/`);
        } catch (error) {
          console.log("err signin", error);
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      {/* MODAL */}
      <ModalConfirm
        show={show}
        handleClose={handleClose}
        title="Confirm your deletion"
        body="This will permenantly delete the product from the database. Are you sure
        of your action?"
        action="DELETE"
      />

      {/* TITLE */}
      <Title title={title} width="40%" />

      {/* FORM */}
      <Container className="text-center mt-3 pb-4">
        <Form
          noValidate
          validated={validated}
          className="dashboardBody__form"
          onSubmit={submitHandler}
        >
          {labels.map((label, index) => (
            <Form.Group key={label} className="mb-3">
              <Form.Label>{label}</Form.Label>
              <Form.Control
                required
                onChange={changeHandler}
                type={types[index]}
                placeholder={placeholders[index]}
                name={names[index]}
                accept={accepts[index]}
              />
              <Form.Control.Feedback type="invalid">
                {invalidInputMessages[index]}
              </Form.Control.Feedback>
            </Form.Group>
          ))}

          {formSubTitle}

          <div className="d-grid gap-2">
            <Button
              disabled={buttonValid ? false : true}
              variant="outline-dark"
              type={btnDetails.type}
            >
              {userIsLoading ? "Please wait..." : btnDetails.title}
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default DashboardForm;
