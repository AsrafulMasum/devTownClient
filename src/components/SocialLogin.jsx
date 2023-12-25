import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const SocialLogin = () => {
  const { logInWithGoogle } = useAuth();

  const axiosPublic = useAxiosPublic();

  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogle = async () => {
    try {
      logInWithGoogle().then((res) => {
        const user = {
          email: res?.user?.email,
          name: res?.user?.displayName,
          photoURL: res?.user?.photoURL,
          role: "user",
          badge: "bronze",
        };
        axiosPublic
          .post("/users", user)
          .then((res) => {
            if (
              res?.data?.user ||
              res?.data?.insertedId
            ) {
              toast.success("Log In Successful.");
              navigate(
                location?.state?.from?.pathname
                  ? location?.state?.from?.pathname
                  : "/"
              );
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-4 w-full">
      <button
        onClick={handleGoogle}
        className="btn w-full btn-outline"
      >
        <FaGoogle></FaGoogle>
      </button>
    </div>
  );
};

export default SocialLogin;
