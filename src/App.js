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

function App() {
  return (
    <UserProvider>
      {/* below this all are the childrens of userprovider */}
      <CartProvider>
        <BrowserRouter>
          <ToastContainer />
          <CustomNavbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/about" element={<About />} />
            <Route path="/store" element={<Store />} />
            <Route path="/service" element={<Service />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="store/product/:pId" element={<ProductView />} />
            <Route path="/users" element={<Dashboards />}>
              <Route path="profile/:userId" element={<Profile />} />
              <Route path="about" element={<About />} />
              <Route path="home" element={<Home />} />
              <Route path="cart" element={<Cart />} />
              <Route
                path="store/:categoryId/:title"
                element={<CategoryViewUser />}
              />
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
