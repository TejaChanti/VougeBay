import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    brand: "",
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products/mine", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      setProducts(res.data);
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditProductId(product._id);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category,
      brand: product.brand,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/products/${editProductId}`,
        formData,
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
      toast.success("Product updated successfully!");
      setEditProductId(null);
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        brand: "",
      });
      fetchProducts();
    } catch (err) {
      toast.error("Failed to update product");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      toast.success("Product deleted");
      fetchProducts();
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const filteredProducts = products.filter((product) =>
    [product.name, product.brand, product.category, product.sku]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 mt-[8rem]">
      <ToastContainer />
      <div className="fixed top-16 left-56 right-0 z-40 bg-white px-4 py-4">
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, brand, category, or SKU..."
          className="w-full border p-2 rounded-md outline-none"
        />
        <h1 className="text-2xl font-bold mb-2 mt-6">Your Products</h1>
      </div>
      <div className="mt-6 space-y-6">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="border rounded p-4 shadow-sm bg-white space-y-2"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-6">
                {product.images?.length > 0 && (
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="w-24 h-24 object-cover"
                  />
                )}
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-gray-500">
                    ₹{product.price} | Stock: {product.stock}
                  </p>
                  <p className="text-sm text-gray-400">
                    Category: {product.category} | Brand: {product.brand} | SKU:{" "}
                    {product.sku}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => handleEdit(product)}
                  className="text-green-600 hover:text-green-700"
                >
                  <EditIcon className="transition-transform duration-300 ease-in-out hover:scale-90" />
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <DeleteIcon className="transition-transform duration-300 ease-in-out hover:scale-90" />
                </button>
              </div>
            </div>

            {editProductId === product._id && (
              <form
                onSubmit={handleUpdate}
                className="grid grid-cols-2 gap-4 mt-6"
                autoComplete="off"
              >
                {["name", "price", "stock", "category", "brand"].map(
                  (field) => (
                    <input
                      key={field}
                      name={field}
                      value={formData[field]}
                      placeholder={
                        field.charAt(0).toUpperCase() + field.slice(1)
                      }
                      onChange={(e) =>
                        setFormData({ ...formData, [field]: e.target.value })
                      }
                      className="border p-2 rounded"
                      required
                    />
                  )
                )}
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="border p-2 rounded col-span-2"
                  rows={3}
                  required
                ></textarea>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded col-span-2"
                >
                  Save Changes
                </button>
              </form>
            )}
          </div>
        ))}

        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
