import "./Navigation.css";
import UserDropdown from "./UserDropdown";
import logo from "/favicon.png";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import LayoutContainer from "../../Layout/LayoutComponent/LayoutContainer";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const { user } = useAuth();


  // const notificationCountURL = "/announcement/count";
  // const { data: notificationCount } = useLoadPublicData(notificationCountURL);

  const navLinks = (
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
  );

  return (
    <div className="w-full fixed bg-[#27485C] bg-opacity-90 z-50">
      <LayoutContainer>
        <div className="w-full navbar px-0">
          {/* drawer */}
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          {/* logo & name */}
          <div className="flex-1 flex items-center gap-4 px-2 mx-2 text-2xl text-white font-bold leading-none">
            <img className="w-12" src={logo} alt="LOGO" />
            <p>ProductsBD</p>
          </div>
          {/* navLinks */}
          <div>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                {navLinks}
              </ul>
            </div>
            <div className="ml-4">
              {user ? (
                <UserDropdown></UserDropdown>
              ) : (
                <Link
                  to="/logIn"
                  className="btn btn-sm btn-outline text-white px-6 hover:bg-textColor"
                >
                  Join Us
                </Link>
              )}
            </div>
          </div>

        </div>
      </LayoutContainer>
    </div>
  );
};

export default Navbar;
