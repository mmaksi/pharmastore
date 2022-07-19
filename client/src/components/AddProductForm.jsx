import { useState } from "react";
// import "dotenv/config";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import "./DashboardForm.scss";
import Title from "./Title";
import axios from "axios";

const API_URL = `http://localhost:8000/v1`;

const AddProductForm = ({ title, btnDetails }) => {
  const initialInputFields = {
    productName: "",
    category: "",
    price: 0,
    imageUrl: undefined,
  };

  // Form states
  const [validated, setValidated] = useState(false);
  const [inputObject, setInputObject] = useState(initialInputFields);
  const [userIsLoading, setUserIsLoading] = useState(false);
  const [buttonValid, setButtonValid] = useState(true);
  const [buttonTitle, setButtonTitle] = useState(btnDetails.title);
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const encodeImageFileAsURL = async (imageFile) => {
  //   let imageBase64 = "";
  //   const reader = new FileReader();
  //   reader.onloadend = async () => {
  //     imageBase64 = reader.result;
  //     const { image } = await axios.post(
  //       `https://api.imgbb.com/1/upload?key=${``}`,
  //       { image: imageBase64, name: inputObject.productName }
  //     );
  //     console.log(image.url);
  //   };
  //   reader.readAsDataURL(imageFile);
  // };

  /* CHANGE HANDLER */
  const changeHandler = (event) => {
    const inputName = event.target.name;
    let inputValue = event.target.value;

    switch (inputName) {
      case "imageUrl":
        inputValue = URL.createObjectURL(event.target.files[0])
          .slice(5)
          .toString();
        // encodeImageFileAsURL(event.target.files[0]);
        break;
      case "price":
        inputValue = Number(event.target.value);
        break;
      default:
        inputValue = event.target.value;
        break;
    }

    setInputObject({ ...inputObject, [inputName]: inputValue });
    // Check email from DB
  };

  /* SUBMIT HANDLER */
  const submitHandler = async (event) => {
    // setButtonTitle("Please wait...");
    // setButtonValid(false);
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    if (form.checkValidity() === true) {
      try {
        setIsLoading(true);
        setButtonTitle("Please wait...");
        setButtonValid(false);
        const resposne = await axios.post(
          "http://localhost:8000/v1/products",
          inputObject
        );
        setIsLoading(false);
        setIsAdded(true);
        setButtonTitle(btnDetails.title);
        setButtonValid(true);
        setInputObject(initialInputFields);
        form.reset();
        setValidated(false);
        setTimeout(() => {
          setIsAdded(false);
        }, 2000);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      {isAdded && (
        <Container>
          <Alert
            key="success"
            variant="success"
            className="text-center m-auto mb-3"
            style={{ width: "50%" }}
          >
            Product added successfully!
          </Alert>
        </Container>
      )}

      <Title title={title} width="40%" />

      <Container className="text-center mt-3 pb-4">
        <Form
          className="dashboardBody__form"
          noValidate
          validated={validated}
          onSubmit={submitHandler}
        >
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

            <Form.Label>Product Image</Form.Label>
            <Form.Control
              required
              onChange={changeHandler}
              type="file"
              placeholder="Upload an image of your product"
              name="imageUrl"
              accept="image/*"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid image.
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-grid gap-2">
            <Button
              disabled={buttonValid ? false : true}
              variant="outline-dark"
              type={btnDetails.type}
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
              {buttonTitle}
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default AddProductForm;
