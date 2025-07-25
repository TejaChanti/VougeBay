import { NavLink } from "react-router-dom";

const Sidebar = () => (
  <aside className="fixed top-16 left-0 w-56 h-[calc(100vh-4rem)] bg-gray-100 pl-6 pt-6 pb-6 overflow-y-auto">
    <h2 className="font-semibold text-xl mb-6">Seller Panel</h2>
    <nav className="flex flex-col gap-4">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-red-600 font-medium bg-white p-2 rounded-tl-full rounded-bl-full pl-4 border-r-[4px] border-red-500 transition-all duration-400 ease-in-out"
            : "text-gray-700"
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/add-product"
        className={({ isActive }) =>
          isActive
            ? "text-red-600 font-medium bg-white p-2 rounded-tl-full rounded-bl-full pl-4 border-r-[4px] border-red-500 transition-all duration-400 ease-in-out"
            : "text-gray-700"
        }
      >
        Add Product
      </NavLink>
      <NavLink
        to="/products"
        className={({ isActive }) =>
          isActive
            ? "text-red-600 font-medium bg-white p-2 rounded-tl-full rounded-bl-full pl-4 border-r-[4px] border-red-500 transition-all duration-400 ease-in-out"
            : "text-gray-700"
        }
      >
        Products
      </NavLink>
      <NavLink
        to="/orders"
        className={({ isActive }) =>
          isActive
            ? "text-red-600 font-medium bg-white p-2 rounded-tl-full rounded-bl-full pl-4 border-r-[4px] border-red-500 transition-all duration-400 ease-in-out"
            : "text-gray-700"
        }
      >
        Orders
      </NavLink>
      <NavLink
        to="/chat"
        className={({ isActive }) =>
          isActive
            ? "text-red-600 font-medium bg-white p-2 rounded-tl-full rounded-bl-full pl-4 border-r-[4px] border-red-500 transition-all duration-400 ease-in-out"
            : "text-gray-700"
        }
      >
        Chat
      </NavLink>
    </nav>
  </aside>
);

export default Sidebar;
