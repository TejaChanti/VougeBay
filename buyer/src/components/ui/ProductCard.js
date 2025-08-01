import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="border rounded-xl shadow hover:shadow-md p-4 bg-white transition-all duration-300 flex flex-col w-full"
    >
      {/* Image Wrapper */}
      <div className="w-full aspect-[4/3] overflow-hidden flex items-center justify-center">
        <img
          src={product.images[0]?.url || product.images[0]}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Info */}
      <h2 className="mt-3 text-lg font-semibold text-gray-800 truncate">
        {product.name}
      </h2>
      <p className="text-red-600 font-medium text-base mt-auto">
        ₹{product.price}
      </p>
    </Link>
  );
};

export default ProductCard;
