import "./App.css";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Admin from "./components/admin/Admin";
import Demo from "./components/admin/Demo";
import AddBook from "./components/admin/AddBook";
import EditBook from "./components/admin/EditBook";
import Login from "./components/Login/Login";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/header" element={<Header />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/add" element={<AddBook />} />
        <Route path="/edit" element={<EditBook />} />
      </Routes>
    </div>
  );
}

export default App;
