import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/login";
import Watchlist from "./pages/watchlist";
import { AuthProvider, useAuth } from "./auth/context";
import "./App.css";
import Signup from "./pages/signup";
import ProductPage from "./pages/product";
import MovieDetailPage from "./pages/singleProduct";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/singleproduct" element={<MovieDetailPage />} />


          
          <Route
            path="/watchlist"
            element={
              <PrivateRoute>
                <Watchlist />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<h2>Welcome to Movie Watchlist App</h2>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;