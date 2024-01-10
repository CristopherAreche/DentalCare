import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faIdCard,
  faLock,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  LoginUser,
  RegisterUser,
} from "../components/store/features/usersSlice";
import Swal from "sweetalert2";
import RegistrationImage from "../assets/login_image.avif";
import { FaArrowLeft } from "react-icons/fa";
library.add(faIdCard, faLock, faEyeSlash, faEye);

const Register = () => {
  const loading = useSelector((state) => state.users.regLoading);

  const dispatch = useDispatch();
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm();

  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(RegisterUser(data));
      console.log(response.type);
      if (response.type === "user/RegisterUser/fulfilled") {
        await dispatch(LoginUser(data));
        nav("/client-form");
      } else {
        Swal.fire(
          "There was an error with the registration. Please try again.",
          "",
          "error"
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBlur = (fieldName) => {
    trigger(fieldName);
  };

  return (
    <div className="flex justify-center items-center py-40 h-screen bg-gradient-to-r from-[#0E264B] to-[#496FAA]">
      <div className="container">
        <div className="flex flex-col md:flex-row w-[95%] md:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div
            className="hidden md:flex w-full md:w-1/2 flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${RegistrationImage})` }}
          />
          <div className="w-full md:w-1/2 py-16 px-10">
            <Link
              to={"/"}
              className="flex gap-2 text-black mb-3 w-full justify-end"
            >
              <FaArrowLeft />
              <span>Go Back</span>
            </Link>
            <h2 className="text-3xl mb-4">Register</h2>
            <p className="mb-4">Create your account.</p>
            <form>
              <div className="mt-5">
                <input
                  className="border border-gray-400 py-1 px-2 w-full"
                  min={10000000}
                  max={99999999}
                  type="number"
                  placeholder="ID"
                  {...register("dni", {
                    required: "Field required",
                    pattern: {
                      value: /^\d{8}$/,
                      message: "The ID  should contain 8 numbers",
                    },
                  })}
                  onBlur={() => handleBlur("dni")}
                />
                {errors.dni && (
                  <p className="h-0 text-red-500">{errors.dni.message}</p>
                )}
              </div>
              <div className="relative mt-5">
                <input
                  className="border border-gray-400 py-1 px-2 w-full"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Field required",
                  })}
                  onBlur={() => handleBlur("password")}
                />
                {showPassword ? (
                  <FontAwesomeIcon
                    icon={faEye}
                    className="absolute  top-[0.6em] left-[13em]  md:left-[15.5em] transform -translate-y-1/3 text-xl cursor-pointer text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    className="absolute top-[0.6em] left-[13em] md:left-[15.5em] transform -translate-y-1/3 text-xl cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
              {errors.password && (
                <p className="h-0 text-red-500">{errors.password.message}</p>
              )}
              <div className="relative mt-5">
                <input
                  className="border border-gray-400 py-1 px-2 w-full"
                  placeholder="Confirm Password"
                  type={showPassword ? "text" : "password"}
                  {...register("confirm_password", {
                    required: "Field required",
                    validate: (val) => {
                      if (watch("password") != val) {
                        return "The passwords do not match";
                      }
                    },
                  })}
                  onBlur={() => handleBlur("confirm_password")}
                />
                {showPassword ? (
                  <FontAwesomeIcon
                    icon={faEye}
                    className="absolute  top-[0.6em] left-[13em] md:left-[15.5em] transform -translate-y-1/3 text-xl cursor-pointer text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    className="absolute top-[0.6em] left-[13em] md:left-[15.5em] transform -translate-y-1/3 text-xl cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
              {errors.confirm_password && (
                <p className="h-0 mb-10 text-red-500">
                  {errors.confirm_password.message}
                </p>
              )}
              <div className="my-5">
                <input type="checkbox" className="border border-gray-400" />
                <span>
                  {" "}
                  I accept the{" "}
                  <a href="#" className="text-blue-500 font-semibold">
                    Terms of Use
                  </a>{" "}
                  &{" "}
                  <a href="#" className="text-blue-500 font-semibold">
                    {" "}
                    Privacy Policy
                  </a>
                </span>
              </div>
              <a href="/login" className="text-blue-500">
                Already Have an account?
              </a>
              <div className="mt-5">
                <Link to={"/client-form"}>
                  <button
                    onClick={handleSubmit(onSubmit)}
                    className="w-full bg-blue-500 py-3 text-center mb-3 text-white"
                  >
                    {loading === true ? "Loading..." : "Register Now"}
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
