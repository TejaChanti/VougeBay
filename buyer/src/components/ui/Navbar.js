import { NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow px-6 py-3 flex justify-between items-center z-50">
      <NavLink to="/" className="text-xl font-bold text-black-600 italic ">
        <p>
          <span className="text-4xl">V</span>ogue
          <span className="text-4xl text-red-600">B</span>
          <span className="font-bold text-red-600">ay</span>
        </p>
      </NavLink>
      <div className="space-x-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-red-600 font-medium bg-white p-2 rounded-tl-full rounded-bl-full pl-4 border-b-[4px] border-red-500 transition-all duration-400 ease-in-out"
              : "text-gray-700"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive
              ? "text-red-600 font-medium bg-white p-2 rounded-tl-full rounded-bl-full pl-4 border-b-[4px] border-red-500 transition-all duration-400 ease-in-out"
              : "text-gray-700"
          }
        >
          Cart
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive
              ? "text-red-600 font-medium bg-white p-2 rounded-tl-full rounded-bl-full pl-4 border-b-[4px] border-red-500 transition-all duration-400 ease-in-out"
              : "text-gray-700"
          }
        >
          Orders
        </NavLink>
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            isActive
              ? "text-red-600 font-medium bg-white p-2 rounded-tl-full rounded-bl-full pl-4 border-b-[4px] border-red-500 transition-all duration-400 ease-in-out"
              : "text-gray-700"
          }
        >
          Chat
        </NavLink>
      </div>

      <div className="flex justify-between">
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
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
          className="text-gray-600 hover:text-red-500 ml-4"
        >
          <LogoutIcon className="transition-transform duration-300 ease-in-out hover:scale-90" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
