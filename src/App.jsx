import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import ImeiEntry from "./pages/ImeiEntry";
import ProductList from "./pages/ProductList";
import Sales from "./pages/Sales";
import Login from "./pages/Login";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <div className="flex bg-gray-100 min-h-screen">
              <Sidebar />
              <div className="flex-1">
                <Header />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route
                    path="/add-product"
                    element={
                      <ProtectedRoute roles={["OWNER"]}>
                        <AddProduct />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/imei" element={<ImeiEntry />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/sales" element={<Sales />} />
                </Routes>
              </div>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
