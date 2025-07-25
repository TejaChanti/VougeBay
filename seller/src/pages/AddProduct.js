import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    brand: "",
    image: null,
  });

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleImageUpload = async () => {
    if (!formData.image) return null;
    const data = new FormData();
    data.append("image", formData.image);

    const res = await axios.post(
      "http://localhost:5000/api/products/upload-image",
      data,
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return { url: res.data.url, public_id: res.data.public_id };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const uploadedImage = await handleImageUpload();
      const payload = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        stock: Number(formData.stock),
        category: formData.category,
        brand: formData.brand,
        images: uploadedImage ? [uploadedImage] : [],
      };

      await axios.post("http://localhost:5000/api/products", payload, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });

      toast.success("Product added successfully!");

      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        brand: "",
        image: null,
      });
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 mb-6"
        autoComplete="off"
      >
        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="border p-2 rounded"
        />
        <input
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="border p-2 rounded col-span-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="border p-2 rounded col-span-2"
          rows={3}
        ></textarea>
        <button
          type="submit"
          className="px-4 py-2 rounded col-span-2 text-red-600 bg-white-500 border border-red-500 font-medium mt-5 w-[20%]"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
