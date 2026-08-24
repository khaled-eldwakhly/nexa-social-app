import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Spinner } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authContext } from "../../../../Contexts/AuthContext";
import { userDataContext } from "../../../../Contexts/UserDataContext";
import { signinSchema } from "../services/sigininSchema";
import { signinAPI } from "../services/signinAPI";

export default function SigninForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { setIsLoggedIn } = useContext(authContext);
  const { setUserData } = useContext(userDataContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
    watch,
  } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signinSchema),
  });

  async function signinUser(userData) {
    setLoading(true);
    const signinResponse = await signinAPI(userData);
    setLoading(false);
    if (signinResponse?.success === true) {
      setUserData(signinResponse.data.user);
      localStorage.setItem("token", signinResponse.data.token);
      localStorage.setItem(
        "userData",
        JSON.stringify(signinResponse.data.user),
      );
      setIsLoggedIn(true);
      navigate("/");
    } else {
      toast.error(signinResponse?.message);
    }
  }

  return (
    <>
      <section className="min-h-[70vh] md:min-h-auto flex items-center justify-center">
        <div className="space-y-5 sm:min-w-sm p-6 rounded-xl text-gray-700 shadow-md shadow-blue-400/30 bg-white">
          <div className="text-center">
            <h2 className="text-xl font-bold">Login</h2>
            <span className="text-sm text-gray-600">
              Does not have an account?{" "}
              <Link to={"/signup"} className="text-blue-600">
                Signup
              </Link>
            </span>
          </div>
          <div className="w-full bg-gray-200/80 h-px"></div>
          <form className="space-y-3" onSubmit={handleSubmit(signinUser)}>
            {/* email */}
            <div>
              <div className="flex justify-between">
                <label htmlFor="email" className="font-sec">
                  Email
                </label>
                {errors.email && touchedFields.email && (
                  <span className="text-red-500 text-sm font-sec">
                    {errors.email?.message}
                  </span>
                )}
              </div>
              <div className="relative mt-1">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2"
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  id="email"
                  className="bg-gray-100/80 w-full py-2 px-6 pl-9 rounded-xl focus:outline-blue-400 "
                  {...register("email")}
                />
              </div>
            </div>
            {/* password */}
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="font-sec">
                  Password
                </label>
                {errors.password && touchedFields.password && (
                  <p className="text-red-500 text-sm font-sec max-w-sm mt-1">
                    {errors.password?.message}
                  </p>
                )}
              </div>
              <div className="relative mt-1">
                <FontAwesomeIcon
                  icon={faLock}
                  className="text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  id="password"
                  className="bg-gray-100/80 w-full py-2 px-6 pl-9 rounded-xl focus:outline-blue-400 "
                  {...register("password")}
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="bg-blue-600/80 text-white text-center py-2 px-3 w-full rounded-xl mt-2 cursor-pointer hover:bg-blue-600 duration-100"
              isPending={loading}
            >
              {loading ? (
                <Spinner className="text-white" />
              ) : (
                <>
                  Signin <FontAwesomeIcon icon={faRightToBracket} />
                </>
              )}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
