import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages";
import About from "./pages/about";
import Cart from "./pages/cart";
import Service from "./pages/service";
import Store from "./pages/store";
import Order from "./pages/user/order";
import Contact from "./pages/contact";
import "./App.css";
import Dashboards from "./pages/user/dashboards";
import Profile from "./pages/user/profile";
import CustomNavbar from "./components/user/Navbar";
import { ToastContainer } from "react-toastify";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/user/Home";
import PaymentSuccess from "./pages/user/paymentSuccess";
import UserProvider from "./context/user.provider";
import AdminDashboard from "./pages/admin/admin.dashboard";
import AddProduct from "./pages/admin/add.product";
import AdminHome from "./pages/admin/admin.home";
import ViewCategory from "./pages/admin/view.category"
import AddCategory from "./pages/admin/add.category"
import ViewProduct from "./pages/admin/view.product"
import ViewOrders from "./pages/admin/view.orders";
import AdminUsers from "./pages/admin/admin.users";
import Logout from "./pages/logout";
import StorePage from "./pages/user/storePage";
import ProductView from "./pages/user/productView";
import CategoryViewUser from "./pages/user/categoryView";
import CartProvider from "./context/cart.provider";
import ForgetPassword from "./pages/forgetPassword";
import VerifyPassword from "./pages/verifyPassword";
import ResetPassword from "./pages/resetPassword";
import PaymentFailed from "./pages/user/paymentFailed";
import Loader from "./pages/loader";
import { useEffect, useState } from "react";
import { privateAxios, publicAxios } from "./service/axios.service";
import LinearIndeterminate from "./components/LinearIndeterminate";


function App() {

  const [showLoader , setShowLoader] = useState(false);

  useEffect(()=>{
    // we have to show before every request and disable after every request end
    // for request
    privateAxios.interceptors.request.use(
      (config)=>{
        setShowLoader(true);
        return config;
      },
      (error)=>{
        return Promise.reject(error);
      }
    );

    // for response
    privateAxios.interceptors.response.use(
      (config)=>{
        setShowLoader(false);
        return config;
      },
      (error)=>{
        return Promise.reject(error);
      }
    );


    // ````````````````````````````````````````````````````````````````
    // publicAxios.interceptors.request.use(
    //   (config)=>{
    //     setShowLoader(true);
    //     return config;
    //   },
    //   (error)=>{
    //     return Promise.reject(error);
    //   }
    // );

    // // for response
    // publicAxios.interceptors.response.use(
    //   (config)=>{
    //     setShowLoader(false);
    //     return config;
    //   },
    //   (error)=>{
    //     return Promise.reject(error);
    //   }
    // );
  },[])

  return (
    <UserProvider>
      {/* below this all are the childrens of userprovider */}
      <CartProvider>
        <BrowserRouter>
          <ToastContainer />
          <CustomNavbar />
          <LinearIndeterminate show={showLoader} />
          {/* <Loader show={showLoader}/> */}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/about" element={<About />} />
            <Route path="/store" element={<Store />} />
            <Route path="/service" element={<Service />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forget" element={<ForgetPassword />} />
            <Route path="/verify-otp" element={<VerifyPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="store/product/:pId" element={<ProductView />} />
            <Route
                path="store/:categoryId/:title"
                element={<CategoryViewUser />}
              />
            <Route path="/users" element={<Dashboards />}>
              <Route path="profile/:userId" element={<Profile />} />
              <Route path="about" element={<About />} />
              <Route path="home" element={<Home />} />
              <Route path="cart" element={<Cart />} />
              <Route path="orders" element={<Order/>} />
              <Route path="payment-success/:orderId" element={<PaymentSuccess/>} />
              <Route path="payment-failed" element={<PaymentFailed/>} />
              
            </Route>
            <Route path="/admin" element={<AdminDashboard />}>
              <Route path="add-product" element={<AddProduct />} />
              <Route path="home" element={<AdminHome />} />
            <Route path="add-category" element={<AddCategory/>} />
            <Route path="users" element={<AdminUsers/>} />
            <Route path="categories" element={<ViewCategory/>} />
            <Route path="orders" element={<ViewOrders/>} />
            <Route path="products" element={<ViewProduct/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
