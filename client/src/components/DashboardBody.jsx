import { Container, Form, Button } from "react-bootstrap";
import "./DashboardBody.scss";

const SidenavBody = () => {
  return (
    <>
      <div className="dashboardBody__main">
        <h2 className="text-center">Add a new product</h2>
        <hr />
      </div>
      <Container className="text-center mt-3 pb-4">
        <Form className="dashboardBody__form">
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control type="text" placeholder="Product Name" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control type="text" placeholder="Product Category" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Paste the product's image URL here"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="text" placeholder="Price" />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="outline-dark" type="submit">
              Add product
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default SidenavBody;
