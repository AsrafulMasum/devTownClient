import { NavLink } from "react-router-dom";
import "./Navigation.css";
import { FaShoppingCart } from "react-icons/fa";

const Drawer = () => {
  const navLinks = (
    <>
      <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/products">Mobiles</NavLink>
      </li>
      <li>
        <NavLink to="/cart"><FaShoppingCart className="text-lg" /></NavLink>
      </li>
    </>
    </>
  );

  return (
    <div className="drawer-side z-50">
      <label
        htmlFor="my-drawer-3"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu p-4 w-80 min-h-full bg-gray-600">{navLinks}</ul>
    </div>
  );
};

export default Drawer;
