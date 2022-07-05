import { Container, Row, } from "react-bootstrap";
import CategoryItem from "../components/CategoryItem";

const CategoriesPage = () => {
  return (
    <>
      <Container>
        <Row>
          <CategoryItem img={`https://i.ibb.co/PTRVWVG/Hypertension.jpg`} title={`Hypertension`} />
          <CategoryItem img={`https://i.ibb.co/LgTZJVM/heartfailure.jpg`} title={`Heart Failure`} />
        </Row>

        <Row>
          <CategoryItem img={`https://i.ibb.co/r028g8r/sneeze.jpg`} title={`Anti-Histamine`} />
          <CategoryItem img={`https://i.ibb.co/tBV6CYS/inflammation.jpg`} title={`Anti-Inflammatory`} />
          <CategoryItem img={`https://i.ibb.co/tZrgLmX/diabetes.jpg`} title={`Diabetes`} />
        </Row>
      </Container>
    </>
  );
};

export default CategoriesPage;
