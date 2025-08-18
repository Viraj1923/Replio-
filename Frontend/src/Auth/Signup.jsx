import React, { useState } from "react";
import "./Signup.css";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../Firebase/FirebaseConfig";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const provider = new GoogleAuthProvider();

  // Email/Password Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      localStorage.setItem(
        "user",
        JSON.stringify({ uid: user.uid, email: user.email })
      );

      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error.message);
      toast.error("Signup failed: " + error.message);
    }
  };

  // Google Signup
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      localStorage.setItem(
        "user",
        JSON.stringify({ uid: user.uid, email: user.email })
      );

      toast.success("Google account created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Google sign-up error:", error.message);
      toast.error("Signup failed: " + error.message);
    }
  };

  return (
    <div className="signup-page">
      {/* Logo same as login */}
      <div className="logo"><img src="/bot.png" height={"60px"} width={"50px"}/>Replio</div>

      <div className="signup-box">
        <h2>Create Account</h2>

        {/* Signup form */}
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            required
          />
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
            Sign Up
          </button>
        </form>

        <div className="divider">or</div>

        {/* Google Signup */}
        <button className="btn-secondary" onClick={handleGoogleSignup}>
          <img
            width="20"
            height="20"
            alt="Google logo"
            src="https://auth-cdn.oaistatic.com/assets/google-logo-NePEveMl.svg"
            style={{ marginRight: "8px", }}
          />
          Sign up with Google
        </button>

        {/* GitHub Signup (not connected yet) */}
        <button className="btn-secondary">
          <img
            width="24"
            height="24"
            alt="GitHub logo"
            src="https://img.icons8.com/?size=100&id=AZOZNnY73haj&format=png&color=000000"
            style={{ marginRight: "8px" }}
          />
          Sign up with GitHub
        </button>

        <div className="login-text">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>

      <footer>© 2025 Replio. All rights reserved.</footer>
    </div>
  );
};

export default Signup;