import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import {
  selectProducts,
  selectProductsIsLoading,
} from "../store/products/products.selector";
import { fetchProductsStartAsync } from "../store/products/products.action";
import ModalConfirm from "../components/ModalConfirm";
import { ReactComponent as PulseLoader } from '../assets/pulse-1.svg';
import { ReactComponent as HeartLoader } from '../assets/heart-1.svg';
import Title from "../components/Title";
import axios from "axios";
import "./DashboardForm.scss";
import API_URL from "../utils/API_URL";

const initialInputFields = {
  productName: "",
};

const RemoveProductForm = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [inputObject, setInputObject] = useState(initialInputFields);
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
  const loading = useSelector(selectProductsIsLoading);

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
    const productToDelete = form.firstElementChild.lastElementChild.value;
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    if (form.checkValidity() === true) {
      setIsLoading(true);
      setValidated(false);
      setButtonValid(false);
      try {
        await axios.delete(`${API_URL}/products/${productToDelete}`);
        setShowAlert(true);
        window.location.reload();
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
      {loading && (
        <div className="loader">
          <PulseLoader style={{ position: "absolute" }} />
          <HeartLoader />
        </div>
      )}
      {!loading && (
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
                    return (
                      <option key={product._id}>{product.productName}</option>
                    );
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
                  {isLoading ? "Please wait..." : "Remove product"}
                </Button>
              </div>
            </Form>
          </Container>
        </>
      )}
    </>
  );
};

export default RemoveProductForm;
