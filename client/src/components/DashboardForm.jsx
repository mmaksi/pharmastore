import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "./DashboardForm.scss";
import ModalConfirm from "./ModalConfirm";
import Title from "./Title";
import axios from "axios";
import { signInUser, signUpUser } from "../store/users/users.action";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const API_URL = `http://localhost:8000/v1`;

const DashboardForm = ({
  title,
  labels,
  placeholders,
  btnDetails,
  types,
  mins,
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
  const [buttonTitle, setButtonTitle] = useState(btnDetails.title);

  const { productName, category, imageUrl, price, username, email, password } =
    inputObject;

  // Modal states
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Event Hadlers
  const handleClose = () => setShow(false);

  /* CHANGE HANDLER */
  const changeHandler = (event) => {
    const inputField = event.currentTarget.parentNode.parentNode.lastElementChild.lastElementChild;
    const buttonText = inputField.innerText;
    const inputName = event.target.name;
    let inputValue = event.target.value

    switch (buttonText) {
      case "Add product":
        switch (inputName) {
          case "imageUrl":
            inputValue = URL.createObjectURL(event.target.files[0])
              .slice(5)
              .toString();
            break;
          case "price":
            inputValue = event.target.valueAsNumber
            break
          default:
            inputValue = event.target.value;
            break;
        }
        setInputObject({ ...inputObject, [inputName]: inputValue });
    
        const isImageUrl = !!(inputValue.slice(0, 4) === "http");
        // const isNumber = Number(inputValue)
        // const isPositiveNumber = Number(isNumber) > 0
    
        if (inputField.checkValidity() && isImageUrl) {
          setButtonValid(true);
        } else {
          setButtonValid(false);
        }
    
        // Check email from DB
        break;
        case "Remove product":
          setInputObject({ ...inputObject, [inputName]: inputValue });

          if (inputField.checkValidity()) {
            setButtonValid(true);
          } else {
            setButtonValid(false);
          }
          break;
      default:
        break;
    }
  };

  /* SUBMIT HANDLER */
  const submitHandler = async (event) => {
    const form = event.currentTarget;
    const buttonText = form.lastElementChild.lastElementChild.innerText;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity()) {
      setValidated(true);
      setInputObject({});
    } else {
      setValidated(false);
    }

    switch (buttonText) {
      case "Add product":
        setShow(false);
        try {
          await axios.post("http://localhost:8000/v1/products", inputObject);
        } catch (error) {
          console.error(error);
        }
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
      <ModalConfirm
        show={show}
        handleClose={handleClose}
        title="Confirm your deletion"
        body="This will permenantly delete the product from the database. Are you sure
        of your action?"
        action="DELETE"
      />
      <Title title={title} width="40%" />

      <Container className="text-center mt-3 pb-4">
        <Form
          noValidate
          validated={validated}
          className="dashboardBody__form"
          onSubmit={submitHandler}
        >
          {labels.map((label, index) => (
            <Form.Group key={label} className="mb-3" hasValidation>
              <Form.Label>{label}</Form.Label>
              <Form.Control
                required
                onChange={changeHandler}
                type={types[index]}
                min={mins[index]}
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
              {buttonTitle}
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default DashboardForm;
