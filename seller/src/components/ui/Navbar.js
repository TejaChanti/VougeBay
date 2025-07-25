import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow px-6 py-3 flex justify-between items-center z-50">
      <Link to="/" className="text-xl font-bold text-black-600 italic ">
        <p>
          <span className="text-4xl">V</span>ogue
          <span className="text-4xl text-red-600">B</span>
          <span className="font-bold text-red-600">ay</span>
        </p>
      </Link>
      <div className="space-x-4">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
          className="text-gray-600 hover:text-red-500"
        >
          <LogoutIcon className="transition-transform duration-300 ease-in-out hover:scale-90" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
