import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//   firstName,
//   lastName,
//   emailId,
//   password,
//   age,
//   gender,
//   skills,
//   photoUrl,
//   about,
// }

const SignUp = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isSignUpClicked, setIsSignUpClicked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      emailId: "",
      password: "",
      age: "",
      gender: "",
      skills: "",
      photoUrl: "",
      about: "",
    },
    onSubmit: async (values) => {
      try {
        let {
          firstName,
          lastName,
          emailId,
          password,
          age,
          gender,
          skills,
          photoUrl,
          about,
        } = values;
        skills = skills.split(",").map((e) => e.trim());

        const data = await axios.post(
          "http://localhost:7777/signup",
          {
            firstName,
            lastName,
            emailId,
            password,
            age,
            gender,
            skills,
            photoUrl,
            about,
          },
          { withCredentials: true }
        );
        setError(null);
        console.log(data);
      } catch (err) {
        // console.log("data: ", data);
        setError(err.response?.data?.ERROR);
      }
    },
  });
  return (
    <div className="flex justify-center mt-16 min-h-dvh">
      <div className="w-[90%] sm:w-3/5 lg:w-1/2 xl:w-2/5">
        <div className="relative items-center">
          <div className="absolute inset-0 bg-text"></div>
          <p className="relative p-4 bg-brand text-text font-bold text-3xl translate-x-2 -translate-y-2 border-2 border-text">
            SignUp on DevFinder
          </p>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-text"></div>
          <form
            className="relative bg-brand border-2 translate-x-2 -translate-y-2 gap-3 flex flex-wrap mt-10 p-10 border-text"
            onSubmit={formik.handleSubmit}
          >
            <label className="text-xl font-semibold" htmlFor="email">
              <sup>*</sup>First Name
            </label>
            <input
              className="block border-2 p-2 border-text min-w-full text-lg focus:outline-none"
              id="firstName"
              name="firstName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              placeholder="First Name"
            />

            <label className="text-xl font-semibold" htmlFor="email">
              Last Name
            </label>
            <input
              className="block border-2 p-2 border-text min-w-full text-lg focus:outline-none"
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              placeholder="Last Name"
            />

            <label className="text-xl font-semibold" htmlFor="email">
              <sup>*</sup>Email Address
            </label>
            <input
              className="block border-2 p-2 border-text min-w-full text-lg focus:outline-none"
              id="emailId"
              name="emailId"
              type="emailId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.emailId}
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
                onClick={() => setVisible(!visible)}
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
            <div className="min-w-full flex gap-4">
              <label className="w-[50%] text-xl font-semibold" htmlFor="email">
                <sup>*</sup>Age
              </label>
              <label className="w-[50%] text-xl font-semibold" htmlFor="email">
                <sup>*</sup>Gender
              </label>
            </div>
            <div className="min-w-full flex gap-4 justify-between">
              <div className="w-[50%]">
                <input
                  className="h-10 box-border p-2 block border-2 border-text min-w-full text-lg focus:outline-none"
                  id="age"
                  name="age"
                  type="number"
                  min="18"
                  max="100"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.age}
                  placeholder="age"
                />
              </div>
              <div className="w-[50%]">
                <select
                  className="h-10 border-box block border-2 p-2 border-text min-w-full text-lg focus:outline-none"
                  id="gender"
                  name="gender"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.gender}
                  placeholder="gender"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>

            <label className="text-xl font-semibold" htmlFor="email">
              <sup>*</sup>Skills
              <p className="inline text-sm">(Comma separated)</p>
            </label>
            <input
              className="block border-2 p-2 border-text min-w-full text-lg focus:outline-none"
              id="skills"
              name="skills"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.skills}
              placeholder="Skills"
            />

            <label className="text-xl font-semibold" htmlFor="email">
              Image URL
            </label>
            <input
              className="block border-2 p-2 border-text min-w-full text-lg focus:outline-none"
              id="photoUrl"
              name="photoUrl"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.photoUrl}
              placeholder="Enter your image URL"
            />

            <label className="text-xl font-semibold" htmlFor="email">
              About
            </label>
            <textarea
              className="block border-2 p-2 max-h-20 border-text min-w-full text-lg focus:outline-none"
              id="about"
              name="about"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.about}
              placeholder="Write something about yourself"
            />
            <div className="block min-w-full text-text-error">{error}</div>

            <div className="flex min-w-full max-w-full items-center justify-between">
              <div className="relative left-0 mt-4">
                <div className="absolute inset-0 bg-text"></div>
                <button
                  className={`font-semibold relative text-xl block border-2 border-text p-2 bg-brand-white ${
                    isClicked
                      ? "-translate-x-0 translate-y-0"
                      : "translate-x-2 -translate-y-2"
                  }`}
                  type="submit"
                  onMouseDown={() => setIsClicked(!isClicked)}
                  onMouseUp={() => setIsClicked(!isClicked)}
                >
                  Create Account
                </button>
              </div>

              <Link to="/login" className="relative left-0 mt-4">
                <div className="absolute inset-0 bg-text"></div>
                <div className="absolute inset-0 bg-text"></div>
                <button
                  className={`font-semibold relative text-xl block border-2 border-text p-2 bg-brand-white ${
                    isSignUpClicked
                      ? "-translate-x-0 translate-y-0"
                      : "translate-x-2 -translate-y-2"
                  }`}
                  type="button"
                  onMouseDown={() => setIsSignUpClicked(!isSignUpClicked)}
                >
                  Login
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
