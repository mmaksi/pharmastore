import { useState } from "react";
import { Container, Form, Button, Spinner, Alert } from "react-bootstrap";
import Title from "../components/Title";
import axios from "axios";
import "./AddProduct.scss";

import {
  selectIsAdmin,
  selectUser,
  selectUserIsLoggedIn,
} from "../store/users/users.selector";
import { useDispatch, useSelector } from "react-redux";
import AuthErr from "../components/AuthErr";

const API_URL = `http://localhost:8000/v1`;

const initialInputFields = {
  productName: "",
  category: "",
  imageUrl: "",
  price: 1,
};

const AddProductForm = () => {
  // Form states
  const [validated, setValidated] = useState(false);
  const [inputObject, setInputObject] = useState(initialInputFields);
  const [buttonValid, setButtonValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const isLoggedIn = useSelector(selectUserIsLoggedIn);
  const isAdmin = useSelector(selectIsAdmin);
  const user = useSelector(selectUser);

  /* CHANGE HANDLER */
  const changeHandler = (event) => {
    const inputName = event.target.name;
    let inputValue = event.target.value;
    setInputObject({ ...inputObject, [inputName]: inputValue });

    if (inputName === "price") inputValue = event.target.valueAsNumber;
    inputValue = event.target.value;
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
        await axios.post("http://localhost:8000/v1/products", inputObject);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          setIsLoading(false);
          setButtonValid(true);
          setInputObject(initialInputFields);
          form.reset();
        }, 2500);
      } catch (error) {
        setIsLoading(false);
        setButtonValid(true);
        setShowErrorAlert(true);
        setTimeout(() => {
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
          variant={showErrorAlert ? "danger" : "success"}
        >
          {showErrorAlert ? `Error adding product!` : `Product added!`}
        </Alert>
      )}

      <Title title="Add Product" width="40%" />

      <Container className="text-center mt-3 pb-4">
        <Form
          noValidate
          validated={validated}
          className="dashboardBody__form"
          onSubmit={submitHandler}
        >
          {/* Product Name */}
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              required
              onChange={changeHandler}
              type="text"
              placeholder="Product Name"
              name="productName"
              value={inputObject.productName}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid name.
            </Form.Control.Feedback>
          </Form.Group>

          {/* Product Category */}
          <Form.Group className="mb-3">
            <Form.Label>Product Category</Form.Label>
            <Form.Control
              required
              onChange={changeHandler}
              type="text"
              placeholder="Category"
              name="category"
              value={inputObject.category}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid category.
            </Form.Control.Feedback>
          </Form.Group>

          {/* Product Price */}
          <Form.Group className="mb-3">
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              required
              onChange={changeHandler}
              type="number"
              min="1"
              placeholder="Price"
              name="price"
              value={inputObject.price}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid price.
            </Form.Control.Feedback>
          </Form.Group>

          {/* Product Image */}
          <Form.Group className="mb-3">
            <Form.Label>Product Image</Form.Label>
            {/* <Form.Control
              required
              onChange={changeHandler}
              type="file"
              placeholder="Upload an image of your product"
              name="imageUrl"
              accept="image/*"
            /> */}
            <Form.Control
              required
              onChange={changeHandler}
              type="text"
              placeholder="Paste the Image URL here"
              name="imageUrl"
              value={inputObject.imageUrl}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid image.
            </Form.Control.Feedback>
          </Form.Group>

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
              {isLoading ? "Please wait..." : "Add product"}
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default AddProductForm;
