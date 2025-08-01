import { useState } from "react";
import { NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow px-6 py-3 flex justify-between items-center z-[9999]">
      {/* Logo */}
      <NavLink to="/" className="text-xl font-bold text-black-600 italic">
        <p>
          <span className="text-4xl">V</span>ogue
          <span className="text-4xl text-red-600">B</span>
          <span className="font-bold text-red-600">ay</span>
        </p>
      </NavLink>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-red-600 font-medium bg-white pl-4 rounded-tl-full rounded-bl-full border-b-[4px] border-red-500 transition-transform duration-600 ease-in-out"
              : "text-gray-700"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive
              ? "text-red-600 font-medium bg-white rounded-tl-full rounded-bl-full pl-4 border-b-[4px] border-red-500 transition-transform duration-600 ease-in-out"
              : "text-gray-700"
          }
        >
          Cart
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive
              ? "text-red-600 font-medium bg-white rounded-tl-full rounded-bl-full pl-4 border-b-[4px] border-red-500 transition-transform duration-600 ease-in-out"
              : "text-gray-700"
          }
        >
          Orders
        </NavLink>
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            isActive
              ? "text-red-600 font-medium bg-white rounded-tl-full rounded-bl-full pl-4 border-b-[4px] border-red-500 transition-transform duration-600 ease-in-out"
              : "text-gray-700"
          }
        >
          Chat
        </NavLink>
      </div>

      {/* Desktop Auth Section */}
      <div className="hidden md:flex justify-between">
        <NavLink
          to="/login"
          className="text-gray-600 hover:text-red-600 font-medium transition-transform duration-300 ease-in-out hover:scale-90"
        >
          Login
        </NavLink>
        <NavLink
          to="/register"
          className="text-gray-600 hover:text-red-600 font-medium pl-4 transition-transform duration-300 ease-in-out hover:scale-90"
        >
          Register
        </NavLink>
        <button
          onClick={handleLogout}
          className="text-gray-600 hover:text-red-500 ml-4"
        >
          <LogoutIcon className="transition-transform duration-300 ease-in-out hover:scale-90" />
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-700 focus:outline-none"
        >
          {isOpen ? (
            <CloseIcon fontSize="large" />
          ) : (
            <MenuIcon fontSize="large" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown with Animation */}
      <div
        className={`absolute top-16 left-0 w-full bg-white shadow-md md:hidden transform transition-all duration-300 ease-in-out origin-top z-[9999] ${
          isOpen
            ? "opacity-100 scale-y-100"
            : "opacity-0 scale-y-0 pointer-events-none"
        }`}
      >
        <div className="p-6 flex flex-col space-y-4">
          <NavLink
            to="/"
            className="text-gray-700 hover:text-red-600 font-medium"
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/cart"
            className="text-gray-700 hover:text-red-600 font-medium"
            onClick={() => setIsOpen(false)}
          >
            Cart
          </NavLink>
          <NavLink
            to="/orders"
            className="text-gray-700 hover:text-red-600 font-medium"
            onClick={() => setIsOpen(false)}
          >
            Orders
          </NavLink>
          <NavLink
            to="/chat"
            className="text-gray-700 hover:text-red-600 font-medium"
            onClick={() => setIsOpen(false)}
          >
            Chat
          </NavLink>

          <div className="border-t border-gray-200 pt-4 flex flex-col space-y-3">
            <NavLink
              to="/login"
              className="text-gray-700 hover:text-red-600 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="text-gray-700 hover:text-red-600 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Register
            </NavLink>
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="text-gray-700 hover:text-red-500 font-medium flex items-center gap-2"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Optional Overlay for Better UX */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-[9998] md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
