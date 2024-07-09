import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import AdminLayout from "./components/Layouts/AdminLayout";
import AdminUsers from "./pages/AdminUsers";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Crops from "./pages/Crops";
import { NotFound } from "./pages/NotFound";
import CropDetails from "./pages/CropDetails";
import Logout from "./pages/Logout";
import AdminSettings from "./pages/AdminSettings";
import UsersContent from "./pages/UsersContent";
import CropsContent from "./pages/CropsContent";
import Profile from "./pages/ProfileCopy";
import CreateProduct from "./pages/createProduct";
import EditCrops from "./components/EditCrops";
import EditCropDetails from "./components/EditCropDetails";
import MyOrders from "./pages/MyOrders";
import Chart from "./components/Chart";
import AboutUs from "./pages/AboutUsPage/AboutUs";
import Cart from "./pages/Cart";
import PredictionLayout from "./components/Layouts/PredictionLayout";
import CropPrediction from "./pages/Prediction/CropPrediction";
import ModelComparison from "./pages/Prediction/ModelComparison";
import AdvicePrediction from "./pages/Prediction/AdvicePrediction";
import NpkChart from "./pages/Prediction/NpkChart";
import BookingData from "./pages/BookingData";
import MostPopular from "./pages/MostPopular";
import FertilizerPrediction from "./pages/Prediction/FertilizerPrediction";
import ForgetPassword from "./pages/ForgetPassword";
import { ForgetRedirectToLogin } from "./components/ForgetRedirectToLogin";
import CreateStore from "./pages/CreateStore";
import Footer from "./components/Footer/Footer";
import Loader from "./assets/loading.gif";
import "./App.css";
import useUserData from "./components/userData";
import NewAdminLayout from "./components/Layouts/NewAdminLayout";
import ResetPasswordForm from "./components/Email/ResetPasswordForm";
import BuySuccess from "./components/BuySuccess";

function App() {
  const { userData } = useUserData();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsloading(false);
    }, 2000);
  }, []);

  const [cart, setCart] = useState([]);

  return (
    <>
      <BrowserRouter>
        {isLoading === true && (
          <div className="loaderzz">
            <img src={Loader} alt="reak" />
          </div>
        )}
        <Navbar userData={userData} cart={cart} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crops" element={<Crops />} />
          <Route
            path="/crops/:id"
            element={<CropDetails cart={cart} setCart={setCart} />}
          />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/ourstores" element={<AdminUsers />} />
          <Route path="/try" element={<BuySuccess />} />

          <Route
            path="/cart"
            element={<Cart cart={cart} setCart={setCart} />}
          />

          {userData.status === "success" ? (
            <Route path="/logout" element={<Logout />} />
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgetPassword" element={<ForgetPassword />} />
              <Route
                path="/ForgetRedirectToLogin"
                element={<ForgetRedirectToLogin />}
              />
              <Route
                path="/resetPassword/:resetToken"
                element={<ResetPasswordForm />}
              />
            </>
          )}

          {userData.status === "success" && (
            <Route path="/prediction" element={<PredictionLayout />}>
              <Route path="crop" element={<CropPrediction />} />
              <Route path="advice" element={<AdvicePrediction />} />
              <Route path="npk" element={<NpkChart />} />
              <Route path="models" element={<ModelComparison />} />
              <Route
                path="fertilizer"
                element={<FertilizerPrediction cart={cart} setCart={setCart} />}
              />
            </Route>
          )}

          {userData.status === "success" && (
            <Route path="/profile" element={<NewAdminLayout />}>
              <Route index element={<Profile userData={userData} />} />
              <Route path="myorders" element={<MyOrders />} />
              {userData.user.role === "admin" && (
                <>
                  <Route path="createproduct" element={<CreateProduct />} />
                  <Route path="createstore" element={<CreateStore />} />
                  <Route path="editcrops" element={<EditCrops />} />
                  <Route path="editcrops/:id" element={<EditCropDetails />} />
                  <Route path="bookingdata" element={<BookingData />} />
                  <Route path="mostpop" element={<MostPopular />} />
                  <Route path="statistics" element={<Chart />} />
                  <Route path="settings" element={<AdminSettings />}>
                    <Route path="usersSettings" element={<UsersContent />} />
                    <Route path="cropsSettings" element={<CropsContent />} />
                  </Route>
                </>
              )}
            </Route>
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

// // import NavbarDesigned from "./components/Navbar/NavbarDesigned";
// import NavbarDesigned from "./components/Navbar/NavbarDesigned";
// import Home from "./pages/Home";
// import AdminLayout from "./components/Layouts/AdminLayout";
// import AdminUsers from "./pages/AdminUsers";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Crops from "./pages/Crops";
// import { NotFound } from "./pages/NotFound";
// import CropDetails from "./pages/CropDetails";
// import Logout from "./pages/Logout";
// import AdminSettings from "./pages/AdminSettings";
// import UsersContent from "./pages/UsersContent";
// import CropsContent from "./pages/CropsContent";
// import Profile from "./pages/Profile";
// import CreateProduct from "./pages/createProduct";
// import EditCrops from "./components/EditCrops";
// import EditCropDetails from "./components/EditCropDetails";
// import { Sugar } from "react-preloaders";
// import MyOrders from "./pages/MyOrders";
// import Chart from "./components/Chart";
// import AdminStats from "./pages/AdminStats";
// import AboutUs from "./pages/AboutUsPage/AboutUs";
// import Cart from "./pages/Cart";
// import CropPrediction from "./pages/Prediction/CropPrediction";
// import PredictionLayout from "./components/Layouts/PredictionLayout";
// import AdvicePrediction from "./pages/Prediction/AdvicePrediction";
// import NpkChart from "./pages/Prediction/NpkChart";
// import BookingData from "./pages/BookingData";
// import MostPopular from "./pages/MostPopular";
// import FertilizerPrediction from "./pages/Prediction/FertilizerPrediction";
// import ForgetPassword from "./pages/ForgetPassword";
// import { ForgetRedirectToLogin } from "./components/ForgetRedirectToLogin";
