import { Container, Row, } from "react-bootstrap";
import CategoryItem from "../components/CategoriesCard";
import { useSelector } from "react-redux";
import { selectUser, selectUserIsLoggedIn } from "../store/users/users.selector";

const CategoriesPage = () => {
  const user = useSelector(selectUser)
  const isLoggedIn = useSelector(selectUserIsLoggedIn)
  
  return (
    <>
    {user.username && <h2 className="text-center mb-4">{`WELCOME ${user.username.toUpperCase()}`}</h2>}
      <Container>
        <Row>
          <CategoryItem grid={6} img={`https://i.ibb.co/PTRVWVG/Hypertension.jpg`} title={`Hypertension`} />
          <CategoryItem grid={6} img={`https://i.ibb.co/LgTZJVM/heartfailure.jpg`} title={`Heart Failure`} />
        </Row>

        <Row>
          <CategoryItem grid={4} img={`https://i.ibb.co/r028g8r/sneeze.jpg`} title={`Anti-Histamine`} />
          <CategoryItem grid={4} img={`https://i.ibb.co/tBV6CYS/inflammation.jpg`} title={`Anti-Inflammatory`} />
          <CategoryItem grid={4} img={`https://i.ibb.co/tZrgLmX/diabetes.jpg`} title={`Diabetes`} />
        </Row>
      </Container>
    </>
  );
};

export default CategoriesPage;
