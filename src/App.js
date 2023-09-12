import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages";
import About from "./pages/about";
import Cart from "./pages/cart";
import Service from "./pages/service";
import Store from "./pages/store";
import Contact from "./pages/contact";
import "./App.css";
import Dashboards from "./pages/user/dashboards";
import Profile from "./pages/user/profile";
import CustomNavbar from "./components/user/Navbar";
import { ToastContainer } from "react-toastify";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/user/Home";
import UserProvider from "./context/user.provider";
import Order from "./pages/user/orders";
import AdminDashboard from "./pages/admin/admin.dashboard";
import AddProduct from "./pages/admin/add.product";
import AdminHome from "./pages/admin/admin.home";

function App() {
  return (
    <UserProvider>
      {/* below this all are the childrens of userprovider */}
      <BrowserRouter>
        <ToastContainer />
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/store" element={<Store />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<Dashboards />}>
            <Route path="profile" element={<Profile />} />
            <Route path="about" element={<About />} />
            <Route path="home" element={<Home />} />
            <Route path="orders" element={<Order />} />
          </Route>
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="add-product" element={<AddProduct />}></Route>
            <Route path="home" element={<AdminHome />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
