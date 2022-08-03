import { Fragment, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Container,
  ListGroup,
  Button,
  Form,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryProductsStartAsync } from "../store/products/products.action";
import {
  selectProducts,
  selectProductsIsLoading,
} from "../store/products/products.selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Title from "../components/Title";
import { selectCartItems } from "../store/cart/cart.selector";
import { addItemToCart } from "../store/cart/cart.action";
import { useState } from "react";
import { ReactComponent as PulseLoader } from "../assets/pulse-1.svg";
import { ReactComponent as HeartLoader } from "../assets/heart-1.svg";
import "../components/Button.scss"

const Category = () => {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const { categoryName } = useParams(); // use it to query the database

  const cartItems = useSelector(selectCartItems);

  useEffect(() => {
    dispatch(fetchCategoryProductsStartAsync(categoryName));
  }, [dispatch, categoryName]);

  const categoryProducts = useSelector(selectProducts);
  const loading = useSelector(selectProductsIsLoading);

  const addToCartHandler = (_, selectedProduct) => {
    const productToAdd = { ...selectedProduct, quantity };
    dispatch(addItemToCart(cartItems, productToAdd));
    setQuantity(1);
  };

  const quantityHandler = (event) => {
    let selectedQuantity = +event.target.value;
    setQuantity(selectedQuantity);
  };

  let pageTitle = <Title title={categoryName} />

  if (!categoryProducts.length) {
    pageTitle = <Title title={`No found drugs in ${categoryName} category yet.`} />
  }

  return (
    <>
      {/* Loader Animation */}
      {loading && (
        <div className="loader">
          <PulseLoader style={{ position: "absolute" }} />
          <HeartLoader />
        </div>
      )}

      {!loading && pageTitle}

      {!loading && (
        <Container>
          <Link
            className="button btn my-3"
            style={{ backgroundColor: "white", borderColor: "#212529" }}
            to="/"
          >
            <FontAwesomeIcon icon={faChevronLeft} /> Go Back
          </Link>

          <Row xs={1} md={4} className="g-4">
            {categoryProducts.map((product, idx) => (
              <Col className="mb-4" key={product.productId}>
                <Card border="dark">
                  <Card.Img
                    className="p-4"
                    variant="top"
                    src={product.imageUrl}
                  />
                  <Card.Body>
                    <Card.Title className="text-center">
                      {product.productName}
                    </Card.Title>
                  </Card.Body>

                  <ListGroup variant="flush">
                    
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>${product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity:</Col>
                        <Col>
                          <Form.Select onChange={quantityHandler}>
                            {[...Array(100).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Button
                        className="button w-100"
                        type="button"
                        variant="dark"
                        onClick={(event) => addToCartHandler(event, product)}
                      >
                        Add to cart
                      </Button>
                    </ListGroup.Item>

                  </ListGroup>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default Category;
