import PropTypes from "prop-types";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const location = useLocation()
  const navigate = useNavigate()

  // cart functionality
  const handleCart = async () => {
    if (user?.email) {
      const cartInfo = {
        productId: product?._id,
        email: user?.email,
      };
      const res = await axiosSecure.post("/carts", cartInfo);
      if (res.data.insertedId) {
        toast.success(`${product?.brand} ${product?.model} added to your cart.`);
      }
    }else{
      navigate("/logIn", { state: { from: location } })
    }
  };

  return (
    <div>
      <div className="card card-compact bg-gray-400 shadow-xl">
        <figure>
          <img src={product?.image} alt="Shoes" />
        </figure>
        <div className="card-body text-black">
          <h2 className="card-title">{product?.brand} {product?.model}</h2>
          <p>Type : {product?.type}</p>
          <p>Processor : {product?.processor}</p>
          <p>Memory : {product?.memory}</p>
          <p>OS : {product?.OS}</p>
          <p>Price : $ {product?.price_usd} USD</p>
          <div className="card-actions justify-end">
            <Link
              to={`/productDetails/${product?._id}`}
              className="btn btn-outline border-black text-black hover:bg-gray-500"
            >
              Details
            </Link>
            <button onClick={handleCart} className="btn btn-primary">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

ProductCard.propTypes = {
  product: PropTypes.object,
};
