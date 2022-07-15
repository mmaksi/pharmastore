import { Container, Row, } from "react-bootstrap";
import CategoryItem from "../components/CategoriesCard";
import { useSelector } from "react-redux";
import { selectUser } from "../store/users/users.selector";
import Title from "../components/Title";

const CategoriesPage = () => {
  const user = useSelector(selectUser)
  console.log(user);

  return (
    <>
    {/* {user.username && <h1 className="text-center mb-5">{`Welcome ${user.username}`}</h1>} */}
    {user.username && <h2 className="text-center mb-4">{`WELCOME ${user.username.toUpperCase()}`}</h2>}


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
