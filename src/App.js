import logo from "./logo.svg";
import "./App.css";
import ProductManager from "./Components/ProductManager";
import ProductDetail from "./Components/ProductDetail";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductManager />} />
      <Route path="/products/:id" element={<ProductDetail />} />
    </Routes>
  );
}

export default App;
