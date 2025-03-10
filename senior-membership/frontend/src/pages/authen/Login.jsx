import React from "react";
import { Link } from "react-router";
import { TbLockPassword } from "react-icons/tb";
import { MdOutlineMail } from "react-icons/md";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";

// Validation Schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("รูปแบบอีเมลไม่ถูกต้อง")
    .required("กรุณากรอกอีเมล"),
  password: Yup.string()
    .min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร")
    .required("กรุณากรอกรหัสผ่าน"),
});


function Login() {
  const navigate = useNavigate();
  const handleLogin = async (values, { setSubmitting, setErrors }) => {

    try {
      // Replace with  backend API URL
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values), // Send email and password
      });

      if (!response.ok) {
        // Extract error message from the response
        const errorData = await response.json();
        throw new Error(errorData.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
      }

      const data = await response.json();
      console.log("Login Success");
      localStorage.setItem("userToken", data.token);

      // แปลง token
      const userInfo = jwtDecode(data.token)
      alert("เข้าสู่ระบบสำเร็จ!");

      if (userInfo.userInfo.role === 'member'){
        navigate("/history");
      } else if (userInfo.userInfo.role === 'heir'){
        navigate("/deathReport");
      } else if (userInfo.userInfo.role === 'staff'){
        navigate("/staff_candidateList");
      } else if (userInfo.userInfo.role === 'committee'){
        navigate("/committee_candidateList");
      }
     

    } catch (error) {
      console.error("Login Error:", error.message);
      // Set API error in Formik errors
      setErrors({ apiError: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <nav className="bg-white">
        <div className="max-w-screen-3xl flex flex-wrap items-center justify-between mx-auto p-4">
          <img src="logo.png" className="h-16" alt="Logo" />
        </div>
      </nav>

      <div className="p-12 mt-24">
        <div className="max-w-screen-lg mx-auto overflow-hidden md:max-w-3xl lg:max-w-3xl place-items-center">
          <div className="2xl:flex">
            <div className="ibm-plex-sans-thai-medium">
              <div className="p-8 bg-gray-50 overflow-hidden rounded-xl shadow-xl">
                <div className="text-center text-3xl text-black mt-8 mb-8 font-bold">
                  เข้าสู่ระบบชมรมผู้สูงอายุ
                </div>

                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={validationSchema}
                  onSubmit={handleLogin}
                >
                  {({ isSubmitting, errors }) => (
                    <Form>
                      <div className="grid gap-6 md:grid-cols-1">
                        {/* Email Field */}
                        <div>
                          <label
                            htmlFor="email"
                            className="block mb-2 text-base font-medium text-gray-900"
                          >
                            อีเมล
                          </label>
                          <div className="relative mb-0">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                              <MdOutlineMail className="text-xl text-gray-400" />
                            </div>
                            <Field
                              type="text"
                              id="email"
                              name="email"
                              placeholder="email@example.com"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5 ps-10"
                            />
                          </div>
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>

                        {/* Password Field */}
                        <div>
                          <label
                            htmlFor="password"
                            className="block mb-2 text-base font-medium text-gray-900"
                          >
                            รหัสผ่าน
                          </label>
                          <div className="relative mb-0">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                              <TbLockPassword className="text-xl text-gray-400" />
                            </div>
                            <Field
                              type="password"
                              id="password"
                              name="password"
                              placeholder="**********"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5 ps-10"
                            />
                          </div>
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </div>

                      {/* API Error */}
                      {errors.apiError && (
                        <div className="text-red-500 text-sm mt-2 text-center">
                          {errors.apiError}
                        </div>
                      )}

                      <div className="grid gap-6 md:grid-cols-1 place-items-center">
                        {/* Submit Button */}
                        <button
                          type="submit"
                          className="text-gray-900 bg-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mt-5"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                        </button>

                        {/* Register Link */}
                        <div>
                          <Link
                            to="/register"
                            className="inline-flex text-sm items-center text-gray-600 hover:underline"
                          >
                            คุณต้องการเป็นสมาชิก?
                          </Link>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
