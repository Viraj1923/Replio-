import React, { useState } from "react";
import "./Login.css";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../Firebase/FirebaseConfig";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const provider = new GoogleAuthProvider();

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // only save minimal info in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({ uid: user.uid, email: user.email })
      );

      toast.success("Google login successful!");
      navigate("/");
    } catch (error) {
      console.error("Google Sign-in Error:", error.message);
      toast.error("Failed to sign in with Google");
    }
  };

  // Email/Password Login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      localStorage.setItem(
        "user",
        JSON.stringify({ uid: user.uid, email: user.email })
      );

      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      console.error("Email Sign-in Error:", error.message);
      toast.error("Invalid email or password.");
    }
  };

  // Forgot Password
  const handleForgotPassword = async () => {
    if (!email) {
      toast.warn("Please enter your email first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.info("Password reset email sent!");
    } catch (error) {
      console.error("Password Reset Error:", error.message);
      toast.error("Failed to send password reset email.");
    }
  };

  return (
    <div className="login-page">
      <div className="logo"><img src="/bot.png" height={"60px"} width={"50px"}/>Replio</div>

      <div className="login-box">
        <h2>Welcome Back</h2>
        <form onSubmit={handleEmailLogin}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">
            Continue
          </button>
        </form>

        <button className="forgot-btn" onClick={handleForgotPassword}>
          Forgot password?
        </button>

        <div className="divider">or</div>

        <button className="btn-secondary" onClick={handleGoogleLogin}>
          <img
            width="20"
            height="20"
            alt="Google logo"
            src="https://auth-cdn.oaistatic.com/assets/google-logo-NePEveMl.svg"
          />
          Continue with Google
        </button>

        <button className="btn-secondary">
          <img
            width="24"
            height="24"
            alt="GitHub logo"
            src="https://img.icons8.com/?size=100&id=AZOZNnY73haj&format=png&color=000000"
          />
          Continue with GitHub
        </button>

        <div className="signup-text">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>

      <footer>© 2025 Replio. All rights reserved.</footer>
    </div>
  );
};

export default Login;