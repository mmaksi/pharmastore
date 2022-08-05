import { useNavigate } from "react-router-dom";
import { Col, Card, Button } from "react-bootstrap";
import "./CategoriesCard.scss";

interface IProps {
  title: string,
  img: string,
  grid: number
}

const CategoryItem: React.FC<IProps> = ({ title, img, grid }) => {
  const navigate = useNavigate();

  const shopHandler = () => {
    navigate(`/${title.replace(/ /g, "-").toLocaleLowerCase()}`);
  };

  return (
    <>
    <Col lg={grid}>
      <Card className="categoryItem bg-dark text-white mb-3 m-2">
        <Card.Img src={img} alt={title} className="categoryItem__image" />
        <div className="categoryItem__button">
          <h4 className="text-center text-uppercase font-weight-bold">{title}</h4>
          <Button
          className="button"
            variant="outline-light"
            size="lg"
            onClick={shopHandler}
          >
            SEE MORE
          </Button>
        </div>
      </Card>
    </Col>
    </>
  );
};

export default CategoryItem;
