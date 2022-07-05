import { Routes, Route } from "react-router-dom";
import Category from "./Pages/CategoryPage";
import Checkout from "./Pages/CheckoutPage";
import CategoriesPage from "./Pages/CategoriesPage";
import Login from "./Pages/LoginPage";
import Navigation from "./Pages/Navigation";
import Register from "./Pages/RegisterPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<CategoriesPage />} />
          <Route path="categories" element={<CategoriesPage />}></Route>
          <Route path="categories/:categoryName" element={<Category />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
