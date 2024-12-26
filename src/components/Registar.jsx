import React, { useContext, useEffect, useState } from "react";

import { signInWithPopup, updateProfile } from "firebase/auth";

import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import { GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from "../provider/AuthProvider";
import { auth } from "../../firebase.init";
import axios from "axios";

function Register() {
  const { createUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const provider = new GoogleAuthProvider();
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        axios
          .post("http://localhost:5000/jwt", user, {
            withCredentials: true,
          })
          .then((data) => {
            console.log(data);
          });
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Password validation function
  const validatePassword = (password) => {
    // Must have at least one uppercase letter, one lowercase letter, and at least 6 characters.
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const minLength = /.{6,}/;

    if (!uppercase.test(password)) {
      return "Password must have at least one uppercase letter.";
    }
    if (!lowercase.test(password)) {
      return "Password must have at least one lowercase letter.";
    }
    if (!minLength.test(password)) {
      return "Password must be at least 6 characters long.";
    }
    return null; // Password is valid
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { name, email, password, photoURL } = formData;

    // Validate password before proceeding
    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError); // Show error toast if validation fails
      setLoading(false);
      return;
    }

    try {
      const res = await createUser(email, password);
      if (res) {
        toast.success("User Registration Successful!"); // Show success toast
        navigate("/");
      }

      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });

      setFormData({
        name: "",
        email: "",
        photoURL: "",
        password: "",
      });
    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration failed. Please try again.");
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full transform transition-transform duration-700 hover:scale-105">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="photo-url"
            >
              Photo URL
            </label>
            <input
              type="url"
              id="photo-url"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="https://example.com/photo.jpg"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="********"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
        <br />

        <button
          onClick={handleLogin}
          className="flex items-center justify-center px-4 py-2 mx-auto bg-white shadow-2xl rounded-md transition duration-200 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Login with Google"
        >
          <>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/800px-Google_2015_logo.svg.png"
              alt="Google Logo"
              className="h-8 mr-2"
            />
            <span className="text-gray-800 font-bold  text-xl">
              Login with Google
            </span>
          </>
        </button>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
      />
    </div>
  );
}

export default Register;
