import { useFormik } from "formik";
import { useState } from "react";

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Invalid credentials!";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid credentials!";
  }

  if (!values.password) {
    errors.password = "Invalid credentials!";
    // } else if (
    //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.password)
    // ) {
  } else {
    errors.password = "Invalid credentials!";
  }

  return errors;
};

const Login = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isSignUpClicked, setIsSignUpClicked] = useState(false);

  const handleDown = (set, value) => {
    set(!value);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="flex justify-center mt-16 min-h-dvh">
      <div className="w-[90%] sm:w-2/4 lg:w-2/6">
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
              className="block border-2 p-2 border-text min-w-full text-lg"
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />

            <label className="text-xl font-semibold" htmlFor="password">
              <sup>*</sup>Password
            </label>
            <input
              className="block border-2 p-2 border-text min-w-full text-lg"
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {(formik.touched.email && formik.errors.email) ||
            (formik.touched.password && formik.errors.password) ? (
              <div className="block min-w-full text-text-error">
                {formik.errors.password}
              </div>
            ) : null}

            <div className="flex min-w-full max-w-full items-center justify-between">
              <div className="relative left-0 mt-4">
                <div className="absolute inset-0 bg-text"></div>
                <button
                  className={`font-semibold relative text-xl block border-2 translate-x-2 -translate-y-2 border-text p-2 bg-brand-white ${
                    isClicked ? "translate-x-0 translate-y-0" : ""
                  }`}
                  type="submit"
                  onMouseDown={() => handleDown(setIsClicked, isClicked)}
                  onMouseUp={() => handleDown(setIsClicked, isClicked)}
                >
                  Submit
                </button>
              </div>
              <div className="relative left-0 mt-4">
                <div className="absolute inset-0 bg-text"></div>
                <div className="absolute inset-0 bg-text"></div>
                <button
                  className={`font-semibold relative text-xl block border-2 translate-x-2 -translate-y-2 border-text p-2 bg-brand-white ${
                    isSignUpClicked ? "translate-x-0 translate-y-0" : ""
                  }`}
                  type="button"
                  onMouseDown={() =>
                    handleDown(setIsSignUpClicked, isSignUpClicked)
                  }
                  onMouseUp={() =>
                    handleDown(setIsSignUpClicked, isSignUpClicked)
                  }
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
