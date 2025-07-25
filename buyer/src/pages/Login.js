import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

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

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      localStorage.setItem("token", res.data.token);
      toast.success("Login Successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Login Failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-[10rem]">
      <h1 className="text-2xl font-bold mb-4">Login Here...</h1>
      <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
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
          Don't have an account?{" "}
          <Link to="/register" className="text-red-600 hover:underline">
            Register
          </Link>
        </p>

        <button
          type="submit"
          className="w-full px-4 py-2 rounded text-red-600 bg-white-500 border border-red-500 font-medium"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
