import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "buyer",
  });

  const [errors, setErrors] = useState({});

  const validateUsername = (username) => {
    if (!username) return "Username is required";
    if (username.length < 3 || username.length > 20)
      return "Username must be between 3 to 20 characters";
    return "";
  };

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Invalid email address";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8 || password.length > 20)
      return "Password must be 8-20 characters";
    if (!/[A-Z]/.test(password))
      return "Password must include at least one uppercase letter";
    if (!/[a-z]/.test(password))
      return "Password must include at least one lowercase letter";
    if (!/[0-9]/.test(password))
      return "Password must include at least one number";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      return "Password must include at least one special character";
    return "";
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usernameError = validateUsername(formData.username);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (usernameError || emailError || passwordError) {
      setErrors({
        username: usernameError,
        email: emailError,
        password: passwordError,
      });
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      localStorage.setItem("token", res.data.token);
      toast.success("Registration Successful!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Registration Failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-[10rem]">
      <h1 className="text-2xl font-bold mb-4 text-center">Register Here...</h1>
      <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
        <div>
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={formData.username}
            className="w-full border px-4 py-2 rounded outline-none"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            className="w-full border px-4 py-2 rounded outline-none"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            className="w-full border px-4 py-2 rounded outline-none"
          />
          {errors.password && (
            <p className="text-red-500 text-sm whitespace-pre-line">
              {errors.password}
            </p>
          )}
        </div>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600 hover:underline">
            Login
          </Link>
        </p>

        <button
          type="submit"
          className="w-full px-4 py-2 rounded text-red-600 bg-white-500 border border-red-500 font-medium"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
