import { Modal, Button } from "react-bootstrap";

const ModalConfirm = ({ show, handleClose, title, body, action }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {body}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleClose}>
          {action}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirm;
