import { Table, Container } from "react-bootstrap";
import "./ChecoutTable.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../store/cart/cart.selector";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { clearItemFromCart } from "../store/cart/cart.action";

const Checkout = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const removeCartItemHandler = (_, cartItemToRemove) => {
    console.log(cartItemToRemove);
    dispatch(clearItemFromCart(cartItems, cartItemToRemove))
  }

  return (
    <Container className="mt-4">
      <Table
        variant="light"
        bordered={false}
        borderless={false}
        responsive="md"
      >
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
                <td onClick={(event) => removeCartItemHandler(event, item)}><FontAwesomeIcon icon={faX} /></td>
                <td>${item.price}</td>
              </tr>
            );
          })}
          <tr className="table__totalRow">
            <td></td> <td></td> <td></td> <td></td>
            <td>
              <strong>{`TOTAL PRICE: $${cartTotal}`}</strong>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default Checkout;
