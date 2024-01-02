import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faLock,
  faIdCard,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../components/store/features/usersSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";
import loginImage from "../assets/dentista.avif";

library.add(faIdCard, faLock, faEyeSlash, faEye);

const Login = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const loading = useSelector((state) => state.users.loading);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(LoginUser(data));
      if (response.type === "user/LoginUser/fulfilled") {
        nav("/citas");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBlur = (fieldName) => {
    trigger(fieldName);
  };

  return (
    <div className="py-40 min-h-screen bg-gradient-to-r from-[#0E264B] to-[#496FAA]">
      <div className="container mx-auto">
        <div className="flex w-[90vw] md:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div
            className="hidden md:w-1/2 md:flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${loginImage})` }}
          />
          <div className="w-full md:w-1/2 py-16 px-10">
            <Link
              to={"/"}
              className="flex gap-2 text-black mb-3 w-full justify-end"
            >
              <FaArrowLeft />
              <span>Go Back</span>
            </Link>
            <h2 className="text-3xl mb-4">Login</h2>
            <p className="mb-4">Welcome back.</p>
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
                    className="absolute  top-[0.6em] left-[12em] md:left-[15.5em] transform -translate-y-1/3 text-xl cursor-pointer text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    className="absolute top-[0.6em] left-[12em] md:left-[15.5em] transform -translate-y-1/3 text-xl cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
              {errors.password && (
                <p className="h-0 text-red-500">{errors.password.message}</p>
              )}
              <div className="mt-4">
                <a href="/register" className="text-blue-500 ">
                  Do not have an account? Register Now
                </a>
              </div>
              <div className="mt-5">
                <Link to={"/client-form"}>
                  <button
                    onClick={handleSubmit(onSubmit)}
                    className="w-full bg-blue-500 py-3 text-center mb-3 text-white"
                  >
                    {loading === true ? "Loading..." : "Login"}
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

export default Login;
