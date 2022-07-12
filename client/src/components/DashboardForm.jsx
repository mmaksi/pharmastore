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
  btnDetails,
  placeholders,
  types,
  names,
  accepts,
  formSubTitle,
}) => {
  const [inputObject, setInputObject] = useState({});
  const [show, setShow] = useState(false);
  const [userIsLoading, setUserIsLoading] = useState(false);
  const handleClose = () => setShow(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const inputName = e.target.name;
    const inputValue =
      inputName === "imageUrl"
        ? URL.createObjectURL(e.target.files[0])
        : e.target.value;
    console.log({ ...inputObject, [inputName]: inputValue });
    setInputObject({ ...inputObject, [inputName]: inputValue });
  };

  const { productName, category, imageUrl, price, username, email, password } =
    inputObject;

  const submitHandler = async (e) => {
    e.preventDefault();
    switch (e.target.innerText) {
      case "Remove product":
        setShow(true);
        break;

      case "Add product":
        setShow(false);
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
      <Title title={title} />

      {/* FORM */}
      <Container className="text-center mt-3 pb-4">
        <Form className="dashboardBody__form">
          {labels.map((label, index) => (
            <Form.Group key={label} className="mb-3">
              <Form.Label>{label}</Form.Label>
              <Form.Control
                onChange={changeHandler}
                type={types[index]}
                placeholder={placeholders[index]}
                name={names[index]}
                accept={accepts[index]}
              />
            </Form.Group>
          ))}

          {formSubTitle}

          <div className="d-grid gap-2">
            <Button
              variant="outline-dark"
              type={btnDetails.type}
              onClick={submitHandler}
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
