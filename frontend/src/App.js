import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { FaArrowUp, FaHandsHelping } from "react-icons/fa";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import ReaderDashboard from "./pages/ReaderDashboard";
import WriterDashboard from "./pages/WriterDashboard";
import AdminPage from "./pages/AdminPage";
import { checkUserRole } from "./utils/auth";
import ResetPassword from "./components/ResetPassword"; // Importe o componente ResetPassword
import ActivateAccount from "./components/ActivateAccount";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    setIsVisible(window.scrollY > 300);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-5 right-10 bg-yellow-400 text-white p-4 rounded-full shadow-lg hover:bg-yellow-500 transition duration-300"
      >
        <FaArrowUp className="text-2xl" />
      </button>
    )
  );
};

const DonationButton = () => (
  <a
    href="#donate"
    className="fixed bottom-20 right-10 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
  >
    <FaHandsHelping className="text-2xl" />
  </a>
);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && localStorage.getItem("token")) {
      setIsAuthenticated(true);
      setRole(user.role);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to={`/${role}-dashboard`} />
              ) : (
                <Home />
              )
            }
          />
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to={`/${role}-dashboard`} />
              ) : (
                <LoginPage />
              )
            }
          />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route
            path="/reader-dashboard"
            element={
              isAuthenticated && checkUserRole("reader") ? (
                <ReaderDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/writer-dashboard"
            element={
              isAuthenticated && checkUserRole("writer") ? (
                <WriterDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              isAuthenticated && checkUserRole("admin") ? (
                <AdminPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/activate" element={<ActivateAccount />} />

          {/* Nova rota para a página ResetPassword */}
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        <ScrollToTopButton />
        <DonationButton />
      </div>
    </Router>
  );
};

export default App;
