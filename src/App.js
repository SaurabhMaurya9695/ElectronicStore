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

function App() {
  return (
    <BrowserRouter>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/store" element={<Store />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/user" element={<Dashboards />}>
          <Route path="profile" element={<Profile />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;