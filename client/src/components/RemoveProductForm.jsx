import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Form } from "react-bootstrap";
import { selectProducts } from "../store/products/products.selector";
import ModalConfirm from "./ModalConfirm";
import Title from "./Title";
import { fetchProductsStartAsync } from "../store/products/products.action";

const RemoveProductForm = ({
  title,
  labels,
  btnDetails,
  invalidInputMessages,
}) => {
  const [show, setShow] = useState(false);
  const [inputObject, setInputObject] = useState({});
  const [buttonTitle, setButtonTitle] = useState(btnDetails.title);
  const [validated, setValidated] = useState(false);
  const [buttonValid, setButtonValid] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsStartAsync());
  }, [dispatch]);

  const products = useSelector(selectProducts);
  console.log(products);

  const handleClose = () => setShow(false);

  const changeHandler = (event) => {
    const inputField =
      event.currentTarget.parentNode.parentNode.lastElementChild
        .lastElementChild;
    const buttonText = inputField.innerText;
    const inputName = event.target.name;
    let inputValue = event.target.value;
    console.log(inputValue);

    setInputObject({ ...inputObject, [inputName]: inputValue });

    if (inputField.checkValidity()) {
      setButtonValid(true);
    } else {
      setButtonValid(false);
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

    setShow(true);
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
            <Form.Group key={label} className="mb-3">
              <Form.Label>{label}</Form.Label>
              <Form.Select onChange={changeHandler}>
              <option>Open this select menu</option>
                {products.map((product) => {
                    return (
                        <option key={product._id}>{product.productName}</option>
                    )
                })}
              </Form.Select>
            </Form.Group>
          ))}

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

export default RemoveProductForm;
