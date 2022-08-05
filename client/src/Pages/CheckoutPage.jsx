import { Table, Container, Button } from "react-bootstrap";
import "./ChecoutTable.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../store/cart/cart.selector";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { clearCart, clearItemFromCart } from "../store/cart/cart.action";
import { selectUser } from "../store/users/users.selector";
import axios from "axios";
import { useState } from "react";
import API_URL from "../utils/API_URL";

const Checkout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const user = useSelector(selectUser);

  const removeCartItemHandler = (_, cartItemToRemove) => {
    dispatch(clearItemFromCart(cartItems, cartItemToRemove));
  };

  const sendOrderHandler = async (_, cartItems) => {
    setIsLoading(true);
    const orderItems = [...cartItems];
    const totalPrice = cartTotal;
    try {
      await axios.post(`${API_URL}/orders`, {
        orderItems,
        totalPrice,
        user,
      });
      setIsLoading(false);
      dispatch(clearCart(cartItems));
    } catch (error) {
      alert("Failed to send orders. Please try again later.");
    }
  };

  return (
    <Container className="mt-4">
      <Table bordered={false} borderless={true} striped={false} responsive="md">
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Remove Item</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {cartItems.map((item, index) => {
            return (
              <tr key={item.productId}>
                <td>{index + 1}</td>
                <td>{item.productName}</td>
                <td>{item.quantity}</td>
                <td
                  className="checkoutItem__remove"
                  onClick={(event) => removeCartItemHandler(event, item)}
                >
                  <FontAwesomeIcon icon={faX} />
                </td>
                <td>${item.price}</td>
              </tr>
            );
          })}
          <tr className="table__totalRow">
            <td></td> <td></td> <td></td> <td></td>
            <td>
              <span className="mb-3" style={{ display: "block" }}>
                <strong>{`TOTAL PRICE: $${cartTotal}`}</strong>
              </span>
              <Button
              className="button"
                disabled={isLoading || !cartItems.length ? true : false}
                variant="outline-dark"
                onClick={(event) => sendOrderHandler(event, cartItems)}
              >
                {isLoading ? "Sending order..." : "SEND MY ORDER"}
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default Checkout;
