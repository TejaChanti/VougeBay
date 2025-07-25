import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import ManageProducts from "./pages/ManageProducts";
import ManageOrders from "./pages/ManageOrders";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddProduct from "./pages/AddProduct"; // ✅ NEW IMPORT
import Navbar from "./components/ui/Navbar";
import Sidebar from "./components/ui/Sidebar";
import PrivateRoute from "./components/ui/PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <div className="h-screen flex flex-col">
          <Navbar />

          <div className="flex flex-1">
            <Sidebar />
            <main className="ml-64 mt-16 h-[calc(100vh-4rem)] overflow-y-auto p-6 w-full">
              <Routes>
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/add-product"
                  element={
                    <PrivateRoute>
                      <AddProduct />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/products"
                  element={
                    <PrivateRoute>
                      <ManageProducts />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <PrivateRoute>
                      <ManageOrders />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/chat"
                  element={
                    <PrivateRoute>
                      <Chat />
                    </PrivateRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </>
  );
}

export default App;
