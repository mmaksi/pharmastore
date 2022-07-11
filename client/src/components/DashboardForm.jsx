import { useState } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
import "./DashboardForm.scss";
import ModalConfirm from "./ModalConfirm";
import Title from "./Title";
import axios from "axios";

const DashboardForm = ({
  title,
  labels,
  btnDetails,
  placeholders,
  types,
  names,
  accepts
}) => {
  const [inputObject, setInputObject] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const changeHandler = (e) => {
    const inputName = e.target.name;
    const inputValue = inputName === "imageUrl" ? URL.createObjectURL(e.target.files[0]) : e.target.value
    console.log({ ...inputObject, [inputName]: inputValue });
    setInputObject({ ...inputObject, [inputName]: inputValue });
  };

  const { productName, category, imageUrl, price } = inputObject;

  const submitHandler = (e) => {
    e.preventDefault();
    switch (e.target.innerText) {
      case "Remove product":
        setShow(true);
        break;

      case "Add product":
        setShow(false);
        console.log({productName, category, imageUrl, price});
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

          <div className="d-grid gap-2">
            <Button
              variant="outline-dark"
              type={btnDetails.type}
              onClick={submitHandler}
            >
              {btnDetails.title}
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default DashboardForm;
