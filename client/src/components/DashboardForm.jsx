import { useState } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
import "./DashboardForm.scss";
import ModalConfirm from "./ModalConfirm";

const DashboardForm = ({ title, labels, btnDetails, placeholders, types }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const submitHandler = (e) => {
    e.preventDefault();
    e.target.innerText === "Remove product" ? setShow(true) : setShow(false);
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
      <div className="dashboardBody__main text-center m-auto">
        <h2>{title}</h2>
        <hr style={{ width: "30%", margin: "auto" }} />
      </div>

      {/* FORM */}
      <Container className="text-center mt-3 pb-4">
        <Form className="dashboardBody__form">
          {labels.map((label, index) => (
            <Form.Group key={label} className="mb-3">
              <Form.Label>{label}</Form.Label>
              <Form.Control
                type={types[index]}
                placeholder={placeholders[index]}
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
