// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "../../helper/axios";
// import Swal from "sweetalert2";
// import { LuEyeClosed } from "react-icons/lu";
// import { FaEye } from "react-icons/fa";
// import { useLocation, useNavigate } from "react-router-dom";

// const ResetPasswordModal: React.FC = () => {
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm<{ password: string; confirmPassword: string }>();

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   function useQuery() {
//     return new URLSearchParams(useLocation().search);
//   }
//   const query = useQuery();
//   const email = query.get("email");

//   const showNotification = (message: string, isSuccess: boolean) => {
//     Swal.fire({
//       toast: true,
//       position: "top-end",
//       icon: isSuccess ? "success" : "error",
//       title: message,
//       showConfirmButton: false,
//       timer: 1500,
//       timerProgressBar: true,
//       background: isSuccess ? "#f0fdf4" : "#fef2f2",
//       iconColor: isSuccess ? "#22c55e" : "#ef4444",
//       customClass: {
//         popup: "w-auto text-sm px-4 py-2 shadow-md rounded-md",
//         title: isSuccess
//           ? "text-green-700 font-medium"
//           : "text-red-700 font-medium",
//       },
//     });
//   };

//   const onSubmit = async (data: {
//     password: string;
//     confirmPassword: string;
//   }) => {
//     if (data.password !== data.confirmPassword) {
//       return showNotification("Passwords do not match", false);
//     }

//     setIsSubmitting(true);

//     try {
//       await axios.post(`/api/auth/v1/forgot-password`, {
//         email: email,
//         new_password: data.password,
//         confirm_password: data.confirmPassword,
//       });

//       showNotification("Password reset successfully", true);

//       setTimeout(() => {
//         navigate("/login");
//       }, 1500);
//     } catch (error) {
//       console.error("Reset password error:", error);
//       // showNotification("Failed to reset password", false);
//       showNotification(error.response.data.detail, false);

//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
//         <div className="relative">
//           <button
//             className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
//             onClick={() => navigate("/login")}
//           >
//             &times;
//           </button>
//         </div>

//         <h2 className="text-xl font-semibold mb-4">Reset Your Password</h2>

//         <form onSubmit={handleSubmit(onSubmit)}>
//           <label className="block text-base font-medium text-gray-700 mb-1">
//             New Password
//           </label>
//           <div className="relative mb-2">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="New Password"
//               className={`w-full border p-2 rounded pr-10 focus:outline-none focus:ring-2 focus:ring-[#FC8503]/30 ${
//                 errors.password ? "border-red-500" : "border-gray-300"
//               }`}
//               {...register("password", { required: "Password is required" })}
//             />
//             <span
//               onClick={() => setShowPassword((prev) => !prev)}
//               className="absolute right-3 top-2.5 text-gray-500 cursor-pointer text-lg"
//             >
//               {showPassword ? <FaEye /> : <LuEyeClosed />}
//             </span>
//           </div>
//           {errors.password && (
//             <p className="text-red-500 text-sm mb-2">
//               {errors.password.message}
//             </p>
//           )}

//           <label className="block text-base font-medium text-gray-700 mb-1 mt-5">
//             Confirm Password
//           </label>
//           <div className="relative mb-4">
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               placeholder="Confirm Password"
//               className={`w-full border p-2 rounded pr-10 focus:outline-none focus:ring-2 focus:ring-[#FC8503]/30 ${
//                 errors.confirmPassword ? "border-red-500" : "border-gray-300"
//               }`}
//               {...register("confirmPassword", {
//                 required: "Confirm your password",
//                 validate: (value) =>
//                   value === watch("password") || "Passwords do not match",
//               })}
//             />
//             <span
//               onClick={() => setShowConfirmPassword((prev) => !prev)}
//               className="absolute right-3 top-2.5 text-gray-500 cursor-pointer text-lg"
//             >
//               {showConfirmPassword ? <FaEye /> : <LuEyeClosed />}
//             </span>
//           </div>
//           {errors.confirmPassword && (
//             <p className="text-red-500 text-sm mb-4">
//               {errors.confirmPassword.message}
//             </p>
//           )}

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors disabled:opacity-50"
//           >
//             {isSubmitting ? "Submitting..." : "Submit"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ResetPasswordModal;



import React from "react";
import { LuEyeClosed } from "react-icons/lu";
import { FaEye } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useResetPassword } from "../../hooks/useResetPassword";

const ResetPasswordModal: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    showPassword,
    showConfirmPassword,
    isSubmitting,
    form,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    onSubmit
  } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = form;

  function useQuery() {
    return new URLSearchParams(location.search);
  }
  const query = useQuery();
  const email = query.get("email");

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <div className="relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
            onClick={() => navigate("/login")}
          >
            &times;
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4">Reset Your Password</h2>

        <form onSubmit={handleSubmit((data) => onSubmit(data, email || ""))}>
          <label className="block text-base font-medium text-gray-700 mb-1">
            New Password
          </label>
          <div className="relative mb-2">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              className={`w-full border p-2 rounded pr-10 focus:outline-none focus:ring-2 focus:ring-[#FC8503]/30 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              {...register("password", { required: "Password is required" })}
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-2.5 text-gray-500 cursor-pointer text-lg"
            >
              {showPassword ? <FaEye /> : <LuEyeClosed />}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mb-2">
              {errors.password.message}
            </p>
          )}

          <label className="block text-base font-medium text-gray-700 mb-1 mt-5">
            Confirm Password
          </label>
          <div className="relative mb-4">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className={`w-full border p-2 rounded pr-10 focus:outline-none focus:ring-2 focus:ring-[#FC8503]/30 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            <span
              onClick={toggleConfirmPasswordVisibility}
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
            disabled={isSubmitting}
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordModal;


