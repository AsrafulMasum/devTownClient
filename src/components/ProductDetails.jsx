import { useParams } from "react-router-dom";
import useLoadSecureData from "../Hooks/useLoadSecureData";
import LayoutContainer from "../Layout/LayoutComponent/LayoutContainer";
import { toast } from "react-toastify";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";

const ProductDetails = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { id } = useParams();
  const { data: productData } = useLoadSecureData(`/products/${id}`);

  // cart functionality
  const handleCart = async () => {
    const cartInfo = {
      productId: productData?._id,
      email: user?.email,
    };
    const res = await axiosSecure.post("/carts", cartInfo);
    if (res.data.insertedId) {
      toast.success(`${productData?.brand} ${productData?.model} added to your cart.`);
    }
  };

  return (
    <div className="py-24 bg-gray-700">
      <LayoutContainer>
        <div className="lg:w-1/2 mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
          <img
            className="object-cover w-full"
            src={productData?.image}
            alt="Article"
          />

          <div className="p-6 flex justify-between items-end">
            <div>
              <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
                Price : {productData?.price_usd}
              </span>
              <p
                className="block mt-2 text-xl font-semibold transition-colors duration-300 transform text-white"
                tabIndex="0"
                role="link"
              >
                {productData?.brand} {productData?.model}
              </p>
              <p className="mt-2 text-sm text-white">
                Type : {productData?.type}
              </p>
              <p className="mt-2 text-sm text-white">
                Processor : {productData?.processor}
              </p>
              <p className="mt-2 text-sm text-white">
                Memory : {productData?.memory}
              </p>
              <p className="mt-2 text-sm text-white">
                OS : {productData?.OS}
              </p>
              <p className="mt-2 text-sm text-white">
                Color : {productData?.color}
              </p>
            </div>
            <div>
              <button onClick={handleCart} className="btn text-white">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </LayoutContainer>
    </div>
  );
};

export default ProductDetails;
