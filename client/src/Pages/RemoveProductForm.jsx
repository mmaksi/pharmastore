import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { selectProducts } from "../store/products/products.selector";
import { fetchProductsStartAsync } from "../store/products/products.action";
import ModalConfirm from "../components/ModalConfirm";
import Title from "../components/Title";
import axios from "axios";
import "./DashboardForm.scss"
import API_URL from "../utils/API_URL";


const initialInputFields = {
  productName: "",
  category: "",
  price: 0,
  imageUrl: undefined,
};

const RemoveProductForm = () => {
  const [show, setShow] = useState(false);
  const [inputObject, setInputObject] = useState({});
  const [validated, setValidated] = useState(false);
  const [buttonValid, setButtonValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsStartAsync());
  }, [dispatch]);

  const products = useSelector(selectProducts);
  console.log(inputObject);

  const handleClose = () => setShow(false);

  const changeHandler = (event) => {
    const inputField =
      event.currentTarget.parentNode.parentNode.lastElementChild
        .lastElementChild;
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

    if (form.checkValidity() === true) {
      setIsLoading(true);
      setValidated(false);
      setButtonValid(false);
      try {
        await axios.post(`${API_URL}/products`, inputObject);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          setIsLoading(false);
          setButtonValid(true);
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
      <ModalConfirm
        show={show}
        handleClose={handleClose}
        title="Confirm your deletion"
        body="This will permenantly delete the product from the database. Are you sure
        of your action?"
        action="DELETE"
      />

      <Title title="Remove Product" width="40%" />

      <Container className="text-center mt-3 pb-4">
        <Form
          noValidate
          validated={validated}
          className="dashboardBody__form"
          onSubmit={submitHandler}
        >
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Select name="productName" onChange={changeHandler}>
              {products.map((product) => {
                return <option key={product._id}>{product.productName}</option>;
              })}
            </Form.Select>
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

export default RemoveProductForm;
