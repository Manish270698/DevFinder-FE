import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const SignUp = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isSignUpClicked, setIsSignUpClicked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

        const res = await axios.post(
          BASE_URL + "/signup",
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
        dispatch(addUser(res.data.user));
        navigate("/profile");
      } catch (err) {
        setError(err.response?.data?.ERROR);
      }
    },
  });
  return (
    <div className="flex justify-center text-sm md:text-lg lg:lg:text-xl mt-10 md:mt-16 min-h-dvh">
      <div className="w-[90%] sm:w-3/5 lg:w-1/2 xl:w-2/5">
        <div className="relative items-center">
          <div className="absolute inset-0 bg-text"></div>
          <h1 className="relative p-4 bg-brand text-text font-bold text-lg lg:text-2xl translate-x-2 -translate-y-2 border-2 border-text">
            SignUp on DevFinder
          </h1>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-text"></div>
          <form
            className="relative bg-brand border-2 translate-x-2 -translate-y-2 gap-3 flex flex-wrap mt-10 p-10 border-text"
            onSubmit={formik.handleSubmit}
          >
            <label className="font-semibold" htmlFor="email">
              <sup>*</sup>First Name
            </label>
            <input
              className="block border-2 p-2 border-text min-w-full focus:outline-none"
              id="firstName"
              name="firstName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              placeholder="First Name"
            />

            <label className="font-semibold" htmlFor="email">
              Last Name
            </label>
            <input
              className="block border-2 p-2 border-text min-w-full focus:outline-none"
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              placeholder="Last Name"
            />

            <label className="font-semibold" htmlFor="email">
              <sup>*</sup>Email Address
            </label>
            <input
              className="block border-2 p-2 border-text min-w-full focus:outline-none"
              id="emailId"
              name="emailId"
              type="emailId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.emailId}
              placeholder="Email Id"
            />

            <label className="font-semibold" htmlFor="password">
              <sup>*</sup>Password
            </label>

            <div className="min-w-full flex justify-center items-center">
              <input
                className="block border-2 p-2 w-[90%] border-text border-r-0 focus:outline-none"
                id="password"
                name="password"
                type={`${!visible ? "password" : "text"}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="Password"
              />
              <div
                onMouseDown={() => setVisible(!visible)}
                onTouchStart={() => setVisible(!visible)}
                onTouchEnd={() => setVisible(!visible)}
                onMouseUp={() => setVisible(!visible)}
                className="flex bg-brand-white cursor-pointer items-center min-h-full border-2 border-l-0 border-text justify-center w-[10%]"
              >
                {!visible ? (
                  <EyeIcon className="size-4 md:size-6 text-text" />
                ) : (
                  <EyeSlashIcon className="size-4 md:size-6 text-text" />
                )}
              </div>
            </div>
            <div className="min-w-full flex gap-4">
              <label className="w-[50%] font-semibold" htmlFor="email">
                <sup>*</sup>Age
              </label>
              <label className="w-[50%] font-semibold" htmlFor="email">
                <sup>*</sup>Gender
              </label>
            </div>
            <div className="min-w-full flex gap-4 justify-between">
              <div className="w-[50%]">
                <input
                  className="h-10 box-border p-2 block border-2 border-text min-w-full focus:outline-none"
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
                  className="h-10 border-box block border-2 p-2 bg-brand-white border-text min-w-full focus:outline-none"
                  id="gender"
                  name="gender"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.gender}
                  placeholder="gender"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>
            </div>

            <label className="font-semibold" htmlFor="email">
              <sup>*</sup>Skills
              <p className="inline text-sm">(Comma separated)</p>
            </label>
            <input
              className="block border-2 p-2 border-text min-w-full focus:outline-none"
              id="skills"
              name="skills"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.skills}
              placeholder="Skills"
            />

            <label className="font-semibold" htmlFor="email">
              Image URL
            </label>
            <input
              className="block border-2 p-2 border-text min-w-full focus:outline-none"
              id="photoUrl"
              name="photoUrl"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.photoUrl}
              placeholder="Enter your image URL"
            />

            <label className="font-semibold" htmlFor="email">
              <sup>*</sup>About
            </label>
            <textarea
              className="block border-2 p-2 max-h-20 border-text min-w-full focus:outline-none"
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
              <div className="relative left-0 mt-4 mr-4">
                <div className="absolute inset-0 bg-text"></div>
                <button
                  className={`font-semibold relative block border-2 border-text p-2 bg-brand-white ${
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

              <Link to="/login" className="relative left-0 mt-4 ml-4">
                <div className="absolute inset-0 bg-text"></div>
                <div className="absolute inset-0 bg-text"></div>
                <button
                  className={`font-semibold relative block border-2 border-text p-2 bg-brand-white ${
                    isSignUpClicked
                      ? "-translate-x-0 translate-y-0"
                      : "translate-x-2 -translate-y-2"
                  }`}
                  type="button"
                  onMouseDown={() => setIsSignUpClicked(!isSignUpClicked)}
                >
                  Back to Login
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
