import { Container, Form, Button } from "react-bootstrap";
import "./DashboardForm.scss";

const DashboardForm = ({ title, labels, btnDetails, placeholders, types }) => {
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <>
      <div className="dashboardBody__main text-center m-auto">
        <h2>{title}</h2>
        <hr style={{ width: "30%", margin: "auto" }} />
      </div>
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
