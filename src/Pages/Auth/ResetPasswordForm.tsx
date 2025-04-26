import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "../../helper/axios";
import Swal from "sweetalert2";
import { LuEyeClosed } from "react-icons/lu";
import { FaEye } from "react-icons/fa";
import { useLocation } from 'react-router-dom';

const ResetPasswordModal: React.FC<{ }> = ({

}) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<{ password: string; confirmPassword: string }>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [showChecklist, setShowChecklist] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const email = query.get('email');

  console.log('Email:', email); 

  const onSubmit = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    if (data.password !== data.confirmPassword) {
      return Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Passwords do not match",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        background: "#fef2f2",
        iconColor: "#ef4444",
        customClass: {
          popup: "w-auto text-sm px-4 py-2 shadow-md rounded-md",
          title: "text-red-700 font-medium",
        },
      });
    }

    try {
      await axios.post("https://23f2-2405-201-37-21d9-3801-53f6-f1a6-cf41.ngrok-free.app/api/auth/v1/forgot-password", {
        email_or_phone: email,
        new_password: data.password,
        confirm_new_password: data.confirmPassword,
      });

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Password reset successfully",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        background: "#f0fdf4",
        iconColor: "#22c55e",
        customClass: {
          popup: "w-auto text-sm px-4 py-2 shadow-md rounded-md",
          title: "text-green-700 font-medium",
        },
      })
    } catch (err) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Failed to reset password",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        background: "#fef2f2",
        iconColor: "#ef4444",
        customClass: {
          popup: "w-auto text-sm px-4 py-2 shadow-md rounded-md",
          title: "text-red-700 font-medium",
        },
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <div className="relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4">Reset Your Password</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block text-base font-medium text-gray-700 mb-1">
            New Password
          </label>

          <Controller
            control={control}
            name="password"
            rules={{
              required: "Password is required",
              validate: () =>
                isPasswordValid || "Password must meet strength requirements",
            }}
            render={({ field }) => (
              <div className="relative mb-2">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  className={`w-full border p-2 rounded pr-10 focus:outline-none focus:ring-2 focus:ring-[#FC8503]/30 ${
                    errors.password ||
                    (!isPasswordValid && passwordValue.length > 0)
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  {...field}
                  value={passwordValue}
                  onChange={(e) => {
                    field.onChange(e);
                    setPasswordValue(e.target.value);
                  }}
                  onFocus={() => setShowChecklist(true)}
                  onBlur={(e) => {
                    field.onBlur();
                    setShowChecklist(false);
                  }}
                />
                <span
                  onClick={togglePassword}
                  className="absolute right-3 top-2.5 text-gray-500 cursor-pointer text-lg"
                >
                  {showPassword ? <FaEye /> : <LuEyeClosed />}
                </span>

  
                <div
                  className={`absolute top-0 left-full ml-4 z-50 w-64 transition-opacity duration-300 ${
                    showChecklist
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                ></div>
              </div>
            )}
          />

          {errors.password && (
            <p className="text-red-500 text-sm mb-2">
              {errors.password.message}
            </p>
          )}

          {errors.password && (
            <p className="text-red-500 text-sm mb-2">
              {errors.password.message}
            </p>
          )}

          {errors.password && (
            <p className="text-red-500 text-sm mb-2">
              {errors.password.message}
            </p>
          )}

          {/* Confirm Password */}
          <label className="block text-base  font-medium text-gray-700 mb-1 mt-5">
            Confirm Password
          </label>
          <div className="relative mb-4">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full border border-gray-300 p-2 rounded pr-10 focus:outline-none focus:ring-2 focus:ring-[#FC8503]/30"
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            <span
              onClick={toggleConfirmPassword}
              className="absolute right-3 top-2.5 text-gray-500 cursor-pointer text-lg"
            >
              {showConfirmPassword ? <FaEye /> : <LuEyeClosed />}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mb-4">
              {errors.confirmPassword.message}
            </p>
          )}

          <button
            type="submit"
            className="w-full  bg-teal-600 text-white py-3 rounded-lg font-medium hover: bg-teal-700 transition-colors disabled:opacity-50"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
