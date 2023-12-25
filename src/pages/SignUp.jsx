import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { BsEye, BsEyeSlash } from "react-icons/bs";
import { ImSpinner9 } from "react-icons/im";
import { toast } from "react-toastify";
import { useState } from "react";
import authGIF from "../assets/authentication.gif";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import SocialLogin from "../components/SocialLogin";

const imgHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;

const SignUp = () => {
  const { signUpWithEmail, updateUser, logOut, loading, setLoading } =
    useAuth();
  const axiosPublic = useAxiosPublic();
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  // react hook from
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // signUp functionality
  const onSubmit = async (data) => {
    setLoading(true);
    const imageFile = { image: data?.image[0] };
    const res = await axiosPublic.post(imgHostingApi, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    const photo = res.data.data.display_url;
    if (res?.data?.success) {
      try {
        signUpWithEmail(data?.email, data?.password).then((response) => {
          if (response?.user?.email) {
            toast.success("Profile Created.");
            try {
              updateUser(data?.name, photo).then(() => {
                toast.success("Profile Updated.");
                const user = {
                  email: data?.email,
                  name: data?.name,
                  photoURL: photo,
                  role: "user",
                  badge: "bronze",
                };
                // posting info in db
                axiosPublic
                  .post("/users", user)
                  .then((res) => {
                    console.log(res.data);
                    if (res?.data?.insertedId || res?.data?.user) {
                      try {
                        logOut().then(() => {
                          navigate("/logIn");
                        });
                      } catch (error) {
                        console.log(error);
                      }
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              });
            } catch (error) {
              console.log(error);
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-white">
        <div className="max-w-screen-xl mx-auto pt-10 md:pt-24 flex flex-col md:flex-row-reverse justify-center items-center gap-10">
          {/* GIF */}
          <div className="flex-1">
            <img src={authGIF} alt="" />
          </div>
          {/* form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 mx-auto">
              {/* name */}
              <input
                {...register("name", { required: true })}
                className="w-full h-11 outline-none px-5 bg-white border border-[#D0D0D0] rounded text-sm text-gray-800"
                type="text"
                placeholder="Name"
                required
              />

              {/* email */}
              <input
                {...register("email", { required: true })}
                className="w-full h-11 outline-none px-5 mt-4 bg-white border border-[#D0D0D0] rounded text-gray-800"
                type="email"
                placeholder="Email"
                required
              />

              {/* upload image */}
              <label
                htmlFor="dropzone-file"
                className="flex items-center px-3 py-3 mx-auto mt-4 text-center bg-white border border-dashed border-[#D0D0D0] rounded cursor-pointer"
              >

                <input
                  {...register("image", { required: true })}
                  id="dropzone-file"
                  type="file"
                  required
                />
              </label>

              {/* password */}
              <div className="relative">
                <input
                  {...register("password", {
                    required: true,
                  })}
                  aria-invalid={errors.password ? "true" : "false"}
                  className="w-full h-11 outline-none px-5 mt-4 bg-white border border-[#D0D0D0] rounded text-gray-800"
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  required
                />
                {errors?.password?.type === "required" && (
                  <p className="mt-2 mx-1 text-red-600">
                    Password must have to set.
                  </p>
                )}
                <div
                  className="absolute right-2 top-[30px] inline-block cursor-pointer"
                  onClick={() => setShow(!show)}
                >
                  {show ? <BsEyeSlash></BsEyeSlash> : <BsEye></BsEye>}
                </div>
              </div>

              {/* submit button */}
              <button className="btn w-full mt-4 border-none text-gray-700 bg-[#D1A054B3] hover:bg-[#D1A054B3] rounded">
                {loading ? (
                  <ImSpinner9 className="animate-spin text-lg"></ImSpinner9>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>

            {/* social */}
            <div className="w-2/3 mx-auto">
              <div className="my-4 text-center">
                <p>
                  Already have an account?{" "}
                  <Link
                    className="text-lg font-bold text-[#D1A054B3]"
                    to="/logIn"
                  >
                    Log In
                  </Link>
                </p>
                <p>Or Sign Up With</p>
                <SocialLogin></SocialLogin>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
