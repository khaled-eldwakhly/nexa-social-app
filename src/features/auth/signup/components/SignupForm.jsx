import {
  faAt,
  faCalendar,
  faEnvelope,
  faLock,
  faMarsAndVenus,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Spinner } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signupAPI } from "../services/signupAPI";
import { signupSchema } from "../services/signupSchema";

export default function SignupForm() {
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
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(signupSchema),
  });

  async function signNewUser(userData) {
    setLoading(true);
    const signupResponse = await signupAPI(userData);
    setLoading(false);
    if (signupResponse?.success === true) {
      navigate("/signin");
      toast.success(signupResponse.message);
    } else {
      toast.error(signupResponse?.message);
    }
  }

  return (
    <>
      <section className="min-h-[70vh] py-10 lg:py-0 md:min-h-auto flex items-center justify-center">
        <div className="space-y-5 shadow-md p-6 shadow-blue-400/30 rounded-xl bg-white">
          <div className="text-center">
            <h2 className="text-xl font-bold">Create an account</h2>
            <span className="text-sm text-gray-600">
              Aleardy have an account?{" "}
              <Link to={"/signin"} className="text-blue-600">
                Signin
              </Link>
            </span>
          </div>
          <div className="w-full bg-gray-200/80 h-px"></div>
          <form className="space-y-3" onSubmit={handleSubmit(signNewUser)}>
            {/* full name */}
            <div className="relative">
              <div>
                <label htmlFor="full-name" className="font-sec">
                  Full Name
                </label>
                {errors.name && touchedFields.name && (
                  <span className="text-red-500 text-sm font-sec absolute right-0 top-0">
                    {errors.name?.message}
                  </span>
                )}
              </div>
              <div className="relative mt-1">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2"
                />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  id="full-name"
                  className="bg-gray-100/80 w-full py-2 px-6 pl-9 rounded-xl focus:outline-blue-400"
                  {...register("name")}
                />
              </div>
            </div>
            {/* username */}
            <div>
              <div className="flex justify-between">
                <label htmlFor="user-name" className="font-sec">
                  Username
                </label>
                {errors.username && touchedFields.username && (
                  <p className="text-red-500 text-sm font-sec max-w-sm mt-1">
                    {errors.username?.message}
                  </p>
                )}
              </div>
              <div className="relative mt-1">
                <FontAwesomeIcon
                  icon={faAt}
                  className="text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2"
                />
                <input
                  type="text"
                  placeholder="Enter your username"
                  id="user-name"
                  className="bg-gray-100/80 w-full py-2 px-6 pl-9 rounded-xl focus:outline-blue-400 "
                  {...register("username")}
                />
              </div>
            </div>
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
                {errors.password &&
                  touchedFields.password &&
                  !watch("password")?.trim() && (
                    <p className="text-red-500 text-sm font-sec max-w-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
              </div>
              <div className="relative mt-1">
                <FontAwesomeIcon
                  icon={faLock}
                  className="text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2"
                />
                <input
                  type="password"
                  placeholder="Enter your password"
                  id="password"
                  className="bg-gray-100/80 w-full py-2 px-6 pl-9 rounded-xl focus:outline-blue-400 "
                  {...register("password")}
                />
              </div>
              {errors.password &&
                touchedFields.password &&
                watch("password")?.trim() && (
                  <p className="text-red-500 text-sm font-sec max-w-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
            </div>
            {/* confirm password */}
            <div className="relative">
              <div className="flex justify-between">
                <label htmlFor="re-password" className="font-sec">
                  Confirm Password
                </label>
                {errors.rePassword && touchedFields.rePassword && (
                  <span className="text-red-500 text-sm font-sec absolute right-0 top-0">
                    {errors.rePassword?.message}
                  </span>
                )}
              </div>
              <div className="relative mt-1">
                <FontAwesomeIcon
                  icon={faLock}
                  className="text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2"
                />
                <input
                  type="password"
                  placeholder="Re-enter your password"
                  id="re-password"
                  className="bg-gray-100/80 w-full py-2 px-6 pl-9 rounded-xl focus:outline-blue-400 "
                  {...register("rePassword")}
                />
              </div>
            </div>
            {/* date of birth & gender*/}
            <div className="flex items-center gap-3">
              <div>
                <label htmlFor="date-of-birth" className="font-sec">
                  Date of Birth
                </label>
                <div className="relative mt-1">
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2"
                  />
                  <input
                    type="date"
                    id="date-of-birth"
                    className="bg-gray-100/80 w-full py-2 px-6 pl-9 rounded-xl focus:outline-blue-400 "
                    {...register("dateOfBirth")}
                  />
                </div>
                {errors.dateOfBirth && touchedFields.dateOfBirth ? (
                  <p className="text-red-500 text-sm font-sec max-w-sm mt-1">
                    {errors.dateOfBirth?.message}
                  </p>
                ) : null}
              </div>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faMarsAndVenus}
                  className="text-gray-400 absolute left-2.5 top-9"
                />
                <label htmlFor="gender" className="font-sec">
                  Gender
                </label>
                <select
                  id="gender"
                  className="bg-gray-100/80 w-full py-2 px-6 pl-9 rounded-xl focus:outline-blue-400 "
                  {...register("gender")}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && touchedFields.gender ? (
                  <p className="text-red-500 text-sm font-sec max-w-sm mt-1">
                    {errors.gender?.message}
                  </p>
                ) : null}
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
                  Signup <FontAwesomeIcon icon={faUserPlus} />
                </>
              )}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
