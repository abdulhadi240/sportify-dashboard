"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import Heroicons
import { useAuth } from "./context/AuthContext";
import { useRouter } from "next/navigation";
import Loading from "./Loading";

export default function WelcomePage() {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const { login } = useAuth(); // Destructure the login function from the AuthContext
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required!"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required!"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await login(values.email, values.password);
        console.log("Logged in successfully");
        setLoading(true);
      } catch (err) {
        setError("Invalid email or password");
      }
    },
  });

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-6">
      {/* Main container: Hidden on small screens, keeping only the left section visible on mobile */}
      <div className="relative w-full max-w-[850px] sm:flex sm:flex-row sm:justify-start sm:items-stretch flex flex-col gap-3 space-y-6 sm:space-y-0">
        {/* Left Section (Visible on all screens) */}
        <div
          className="w-full sm:w-[400px] sm:h-[610px] h-auto bg-[#F9F9F9] rounded-lg sm:p-8 p-4"
          style={{
            backgroundColor: "#F9F9F9",
          }}
        >
          {/* Left Content */}
          <div className="flex items-start justify-center h-full pt-2">
            <div className="text-center">
              <p
                className="text-[#0C1421]"
                style={{
                  fontFamily: "'Gotham', sans-serif",
                  fontWeight: 700,
                  fontSize: "28px",
                  lineHeight: "28px",
                  marginRight: "80px",
                }}
              >
                Welcome Back 👋
              </p>

              {/* "Login to your account" */}
              <p
                className="text-[#0C1421]"
                style={{
                  fontFamily: "'Gotham', sans-serif",
                  fontWeight: 500,
                  fontSize: "19px",
                  lineHeight: "58px",
                  marginRight: "150px",
                  color: "#313957",
                }}
              >
                Login to your account
              </p>

              {/* Email Label and Placeholder */}
              <div className="mt-5">
                <label
                  htmlFor="email"
                  className="block text-[#0C1421] text-left"
                  style={{
                    fontFamily: "'Gotham', sans-serif",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "26px",
                  }}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Example@email.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
                  style={{
                    fontFamily: "'Gotham', sans-serif",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#8897AD",
                  }}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <div
                    className="text-red-500 text-sm font-bold"
                    style={{ fontFamily: "'Gotham', sans-serif" }}
                  >
                    {formik.errors.email}
                  </div>
                )}
              </div>

              {/* Password Label and Placeholder */}
              <div className="mt-3 relative">
                <label
                  htmlFor="password"
                  className="block text-[#0C1421] text-left"
                  style={{
                    fontFamily: "'Gotham', sans-serif",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "26px",
                  }}
                >
                  Password
                </label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
                  style={{
                    fontFamily: "'Gotham', sans-serif",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#8897AD",
                  }}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                  className="absolute right-4 top-12 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {formik.touched.password && formik.errors.password && (
                  <div
                    className="text-red-500 text-sm font-bold mt-2"
                    style={{ fontFamily: "'Gotham', sans-serif" }}
                  >
                    {formik.errors.password}
                  </div>
                )}
              </div>

              {/* Remember Me Section and Forgot Password */}
              <div className="flex items-center justify-between mt-4">
                {/* Remember Me Switcher */}
                <label className="inline-flex items-center cursor-pointer space-x-2">
                  {/* Switcher */}
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe" // Ensure the name matches the Formik field
                      className="hidden"
                      onChange={() =>
                        formik.setFieldValue(
                          "rememberMe",
                          !formik.values.rememberMe
                        )
                      } // Toggle the value
                      checked={formik.values.rememberMe} // Tie the checkbox to Formik state
                    />
                    <div
                      className="toggle-bg w-10 h-5 rounded-full"
                      style={{
                        backgroundColor: formik.values.rememberMe
                          ? "#6E3B95"
                          : "#F2F2F2",
                      }}
                    ></div>
                    <div
                      className="toggle-circle w-5 h-5 bg-white rounded-full absolute top-0 left-0 transition-transform"
                      style={{
                        transform: formik.values.rememberMe
                          ? "translateX(20px)"
                          : "translateX(0)",
                      }}
                    ></div>
                  </div>

                  {/* Remember Me Text */}
                  <span
                    className="text-[#636363] text-sm"
                    style={{
                      fontFamily: "'Gotham', sans-serif",
                      fontWeight: 550,
                      fontSize: "13px",
                    }}
                  >
                    Remember Me
                  </span>
                </label>

                {/* Forgot Password Link */}
                <a
                  href="#"
                  className="text-[#3D4DD6] text-sm hover:underline"
                  style={{
                    fontFamily: "'Gotham', sans-serif",
                    fontWeight: 550,
                    fontSize: "13px",
                  }}
                >
                  Forgot Password?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                onClick={formik.handleSubmit}
                className="w-full mt-5 py-3 rounded-full bg-[#6E3B95] text-white hover:bg-[#5b2f7d]"
                style={{
                  fontFamily: "'Gotham', sans-serif",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                {loading ? (
                  <div className="flex justify-center">
                    <Loading />
                  </div>
                ) : (
                  "Sign in"
                )}
              </button>

              <div className="flex items-center justify-center mt-3 space-x-2">
                {/* Left Line */}
              </div>

              <div className="flex items-center justify-center mt-3 space-x-2">
                {/* Left Line */}
                <div
                  className="border-t border-[#CFDFE2]"
                  style={{
                    width: "137.5px",
                    border: "1px solid #CFDFE2",
                  }}
                />

                {/* Right Line */}
                <div
                  className="border-t border-[#CFDFE2]"
                  style={{
                    width: "137.5px",
                    border: "1px solid #CFDFE2",
                  }}
                />
              </div>
              {/*  Google and Facebook Sign In */}
              <div className="flex flex-col mt-3 space-y-3">
                {/* Box for Google Sign In */}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div
          className="hidden sm:block relative sm:w-[420px] sm:h-[610px] sm:bg-cover sm:bg-center sm:rounded-lg"
          style={{
            backgroundImage: 'url("/image.jpeg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "16px",
          }}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 "
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              borderRadius: "16px",
            }}
          ></div>
          {/* New Image the Original Image */}
          <div className="absolute inset-0 flex justify-center items-center">
            <img
              src="/spotify5.png"
              alt="Second Image"
              className="w-56 h-56 object-contain rounded-full"
            />
          </div>
        </div>
        <style jsx>{`
          @media (max-width: 1024px) {
            .right-section {
              left: auto;
              right: 0;
              width: 100%;
              height: 300px;
              top: auto;
              bottom: 0;
            }
            .overlay {
              border-radius: 0;
            }
            .image-container {
              justify-content: center;
              align-items: center;
            }
            .image {
              width: 80px;
              height: 80px;
            }
          }

          @media (max-width: 768px) {
            .right-section {
              display: none;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
