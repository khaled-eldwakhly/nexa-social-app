import { faCodeCompare, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Separator } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authContext } from "../../../../Contexts/AuthContext";
import { changePasswordSchema } from "../services/changePasswordSchema";
import { changePasswordAPI } from "../services/profileAPIs";

export default function ChangePassword() {
  const { setIsLoggedIn } = useContext(authContext);
  const navigate = useNavigate();
  const changePasswordMutation = useMutation({
    mutationFn: changePasswordAPI,
    onSuccess: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      setIsLoggedIn(false);
      navigate("/signin");
      toast.success("Password Changed");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    watch,
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = (data) => {
    changePasswordMutation.mutate(data);
  };
  return (
    <>
      <main className="main-padding bg-white min-h-screen">
        <section className="section-padding">
          <div className="flex items-center gap-4">
            <div className="text-red-600 size-8 bg-red-200 flex justify-center items-center rounded-full">
              <FontAwesomeIcon icon={faLock} />
            </div>
            <div className="-space-y-1">
              <h4 className="font-semibold">Change Password</h4>
              <span className="text-sm">Reset your password</span>
            </div>
          </div>
          <Separator className="my-3" />
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* password */}
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="font-sec">
                  Current Password
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
                  className="bg-gray-100/80 w-full py-2 px-6 pl-9 rounded-xl focus:outline-blue-400"
                  {...register("password")}
                />
              </div>
            </div>
            {/* new password */}
            <div className="relative">
              <div className="flex justify-between">
                <label htmlFor="re-password" className="font-sec">
                  New Password
                </label>
                {errors.newPassword &&
                  touchedFields.newPassword &&
                  !watch("newPassword")?.trim() && (
                    <p className="text-red-500 text-sm font-sec max-w-sm mt-1">
                      {errors.newPassword.message}
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
                  placeholder="Re-enter your password"
                  id="re-password"
                  className="bg-gray-100/80 w-full py-2 px-6 pl-9 rounded-xl focus:outline-blue-400 "
                  {...register("newPassword")}
                />
              </div>
              {errors.newPassword &&
                touchedFields.newPassword &&
                watch("newPassword")?.trim() && (
                  <p className="text-red-500 text-sm font-sec max-w-sm mt-1">
                    {errors.newPassword.message}
                  </p>
                )}
            </div>
            <Button
              className={"mt-10 w-full"}
              type="submit"
              isDisabled={changePasswordMutation.isPending}
            >
              Change Password <FontAwesomeIcon icon={faCodeCompare} />
            </Button>
          </form>
          <p className="mt-5 font-sec">
            Use a strong, unique password and never share it with anyone.
          </p>
        </section>
      </main>
    </>
  );
}
