import { Routes, Route } from "react-router-dom";
import Category from "./Pages/CategoryPage";
import Checkout from "./Pages/CheckoutPage";
import CategoriesPage from "./Pages/CategoriesPage";
import Login from "./Pages/LoginPage";
import Navigation from "./Pages/Navigation";
import Register from "./Pages/RegisterPage";
import AddProduct from "./Pages/AddProduct";
import RemoveProduct from "./Pages/RemoveProduct";
import { selectUser, selectUserIsLoggedIn } from "./store/users/users.selector";
import { useSelector } from "react-redux";


function App() {
  const user = useSelector(selectUser)
  const isLoggedIn = useSelector(selectUserIsLoggedIn)
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={isLoggedIn? <CategoriesPage /> : <Login />} />
          <Route path="categories" element={<CategoriesPage />}></Route>
          <Route path="/:categoryName" element={<Category />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="addProduct" element={<AddProduct />} />
          <Route path="removeProduct" element={<RemoveProduct />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
