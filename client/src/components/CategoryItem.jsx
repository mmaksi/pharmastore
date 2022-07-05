import { useNavigate } from "react-router-dom";
import { Col, Card, Button } from "react-bootstrap";
import "./categoryItem.scss";

const CategoryItem = ({ title, img }) => {
  const navigate = useNavigate();

  const shopHandler = () => {
    navigate(`/categories/${title.toLocaleLowerCase()}`)
  }

  return (
    <Col>
      <Card className="categoryItem bg-dark text-white mb-3 m-2">
        <Card.Img src={img} alt={title} className="categoryItem__image" />
        <Card.ImgOverlay className="categoryItem__imgOverlay">
          <Card.Title
            as="h4"
            className="text-center text-uppercase font-weight-bold"
          >
            {title}
          </Card.Title> 
          <Button className="categoryItem__button" variant="outline-light" size="lg" onClick={shopHandler}>SHOP DRUGS</Button>
        </Card.ImgOverlay>
      </Card>
    </Col>
  );
};

export default CategoryItem;
