import useAuth from "../Hooks/useAuth";
import useLoadSecureData from "../Hooks/useLoadSecureData";
import LayoutContainer from "../Layout/LayoutComponent/LayoutContainer";
import CartRow from "../components/CartRow";

const Carts = () => {
  const { user } = useAuth();
  const { data: cartData } = useLoadSecureData(`/carts/${user?.email}`);

  return (
    <div className="bg-gray-700 text-white">
      <h2 className="mt-24 text-4xl text-center">Your Cart Item</h2>
      <div>
        <LayoutContainer>
          <div className="overflow-x-auto my-10">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="text-white">
                  <th>#</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              {/* table body */}
              <tbody>
                {cartData?.map((cart, idx) => (
                  <CartRow key={cart?._id} idx={idx} cart={cart}></CartRow>
                ))}
              </tbody>
            </table>
          </div>
        </LayoutContainer>
      </div>
    </div>
  );
};

export default Carts;
