import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";

import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import ImeiEntry from "./pages/ImeiEntry";
import ProductList from "./pages/ProductList";
import Sales from "./pages/Sales";
import Login from "./pages/Login";

export default function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/login" element={<Login />} />

      {/* PROTECTED APP */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />

        <Route
          path="add-product"
          element={
            <ProtectedRoute roles={["OWNER"]}>
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route path="imei" element={<ImeiEntry />} />
        <Route path="products" element={<ProductList />} />
        <Route path="sales" element={<Sales />} />
      </Route>
    </Routes>
  );
}
