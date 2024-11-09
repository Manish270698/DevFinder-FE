import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [isSignUpClicked, setIsSignUpClicked] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const { email, password } = values;
        const res = await axios.post(
          BASE_URL + "/login",
          {
            emailId: email,
            password: password,
          },
          { withCredentials: true }
        );
        setError(null);
        dispatch(addUser(res.data.user));
        navigate("/");
      } catch (err) {
        setError(err?.response?.data?.ERROR);
      }
    },
  });
  return (
    <div
      className="flex justify-center mt-16 min-h-dvh"
      onMouseUp={() => setVisible(false)}
    >
      <div className="w-[90%] sm:w-3/5 lg:w-2/5 xl:w-2/6">
        <div className="relative items-center">
          <div className="absolute inset-0 bg-text"></div>
          <p className="relative p-4 bg-brand text-text font-bold text-3xl translate-x-2 -translate-y-2 border-2 border-text">
            Login to DevFinder
          </p>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-text"></div>
          <form
            className="relative bg-brand border-2 translate-x-2 -translate-y-2 gap-3 flex flex-wrap mt-10 p-10 border-text"
            onSubmit={formik.handleSubmit}
          >
            <label className="text-xl font-semibold" htmlFor="email">
              <sup>*</sup>Email Address
            </label>
            <input
              className="block border-2 p-2 border-text min-w-full text-lg focus:outline-none"
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Email Id"
            />

            <label className="text-xl font-semibold" htmlFor="password">
              <sup>*</sup>Password
            </label>
            <div className="min-w-full flex justify-center items-center">
              <input
                className="block border-2 p-2 w-[90%] border-text text-lg border-r-0 focus:outline-none"
                id="password"
                name="password"
                type={`${!visible ? "password" : "text"}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="Password"
              />
              <div
                onMouseDown={() => setVisible(true)}
                className="flex bg-brand-white cursor-pointer items-center min-h-full border-2 border-l-0 border-text justify-center w-[10%]"
              >
                {!visible ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4 md:size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4 md:size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </div>
            </div>
            {(formik.touched.email && formik.errors.email) ||
            (formik.touched.password && formik.errors.password) ? (
              <div className="block min-w-full text-text-error">
                {formik.errors.password}
              </div>
            ) : null}
            <div className="flex min-w-full max-w-full items-center justify-between text-text-error">
              {error}
            </div>

            <div className="flex min-w-full max-w-full items-center justify-between">
              <div className="relative left-0 mt-4 w-[25%]">
                <div className="absolute inset-0 bg-text min-w-full"></div>
                <button
                  className={`font-semibold relative text-lg md:text-xl min-w-full block border-2 border-text p-2 bg-brand-white ${
                    isClicked
                      ? "-translate-x-0 translate-y-0"
                      : "translate-x-2 -translate-y-2"
                  }`}
                  type="submit"
                  onMouseDown={() => setIsClicked(!isClicked)}
                  onMouseUp={() => setIsClicked(!isClicked)}
                >
                  Sign In
                </button>
              </div>

              <Link
                to="/forgotpassword"
                className="relative left-0 mt-4 w-[40%]"
              >
                <div className="absolute inset-0 min-w-full bg-text"></div>
                <button
                  className={`font-semibold relative text-sm min-w-full block border-2 border-text p-1 bg-brand-white ${
                    isForgotPassword
                      ? "-translate-x-0 translate-y-0"
                      : "translate-x-2 -translate-y-2"
                  }`}
                  type="button"
                  onMouseDown={() => setIsForgotPassword(!isForgotPassword)}
                  onMouseUp={() => setIsForgotPassword(!isForgotPassword)}
                >
                  Forgot Password
                </button>
              </Link>

              <Link to="/signup" className="relative left-0 mt-4 w-[25%]">
                <div className="absolute inset-0 min-w-full bg-text"></div>
                <button
                  className={`font-semibold relative text-lg md:text-xl min-w-full block border-2 border-text p-2 bg-brand-white ${
                    isSignUpClicked
                      ? "-translate-x-0 translate-y-0"
                      : "translate-x-2 -translate-y-2"
                  }`}
                  type="button"
                  onMouseDown={() => setIsSignUpClicked(!isSignUpClicked)}
                  onMouseUp={() => setIsSignUpClicked(!isSignUpClicked)}
                >
                  Sign Up
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
