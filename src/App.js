import "./App.css";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import Admin from "./components/admin/Admin";
import AddBook from "./components/admin/AddBook";
import Login from "./components/Login/Login";
import EditBookWrapper from "./components/admin/EditBookWrapper";
import Home from "./components/Home/Home";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/header" element={<Header />} />
        {/* <Route path="/header" element={<Header />} /> */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/add" element={<AddBook />} />
        <Route path="/edit/:id" element={<EditBookWrapper />} />
      </Routes>
    </div>
  );
}

export default App;
