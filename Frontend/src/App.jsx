import "./App.css";
import "./mobile.js";
import Sidebar from "./Sidebar/Sidebar.jsx";
import ChatWindow from "./ChatWindow/ChatWindow.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute.jsx";

import Login from "./Auth/Login.jsx";
import Signup from "./Auth/Signup.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const { currentUser, loading } = useContext(MyContext);

  if (loading) return <p>Loading...</p>;

  return (
  <>
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={!currentUser ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/signup"
        element={!currentUser ? <Signup /> : <Navigate to="/" />}
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <div className="app">
              <Sidebar />
              <ChatWindow />
            </div>
          </PrivateRoute>
        }
      />
      
    </Routes>
    <ToastContainer position="top-right" autoClose={3000} />
  </>
  );
}

export default App;
