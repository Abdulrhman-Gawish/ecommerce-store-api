<<<<<<< HEAD
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SellerHome from "./pages/seller/SellerHome";
import ProductAnalyticsPage from "./pages/seller/ProductAnalytics";
import ProductDetailsPage from "./pages/seller/ProductDetailsPage";
import EditProductPage from "./pages/seller/EditProductPage";

function App() {
  return (
    <div> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/seller-home" element={<SellerHome />} />
          <Route path="/product-analytics" element={<ProductAnalyticsPage />} />
          <Route path="/product-details/:productId" element={<ProductDetailsPage />} />
          <Route path="/edit-product/:productId" element={<EditProductPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
=======
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      </BrowserRouter>
  );
}
export default App;
>>>>>>> origin/main
