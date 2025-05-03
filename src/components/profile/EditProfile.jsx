import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../utils/userSlice";
import ProfileCard from "./ProfileCard";
import Toast from "./Toast";

const EditProfile = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [error, setError] = useState(null);
  const [seeToast, setSeeToast] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      emailId: user.emailId,
      age: user.age,
      gender: user.gender,
      skills: Array.isArray(user.skills)
        ? user.skills
        : user.skills
        ? user.skills.split(",")
        : [],
      photoUrl: user.photoUrl,
      about: user.about,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        let { firstName, lastName, age, gender, skills, photoUrl, about } =
          values;
        const res = await axios.patch(
          BASE_URL + "/profile/edit",
          {
            firstName,
            lastName,
            age,
            gender,
            skills,
            photoUrl,
            about,
          },
          { withCredentials: true }
        );
        setError(null);
        dispatch(addUser(res.data.loggedInUser));
        setSeeToast(true);
        setTimeout(() => setSeeToast(false), 3000);
      } catch (err) {
        setError(err.response?.data?.ERROR);
      }
    },
  });
  return (
    <div className="flex flex-wrap justify-center gap-x-8 text-brand-light">
      {seeToast && <Toast />}
      <div className="flex justify-center text-sm md:text-md lg:text-xl mt-10 md:mt-16 min-h-dvh w-[90%] md:w-1/3 xl:w-2/5">
        <div className="">
          <div className="relative items-center">
            <div className="absolute inset-0 w-[60%] bg-text"></div>
            <h1 className="relative p-2 lg:p-4 w-[60%] bg-brand text-text font-bold text-lg lg:text-2xl translate-x-2 -translate-y-2 border-2 border-text">
              Your Profile
            </h1>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-text"></div>
            <form
              className="relative bg-brand border-2 translate-x-2 -translate-y-2 gap-3 flex flex-wrap mt-10 p-5 md:p-10 border-text"
              onSubmit={formik.handleSubmit}
            >
              <label className="font-semibold" htmlFor="email">
                <sup>*</sup>First Name
              </label>
              <input
                className="block border-2 p-1 md:p-2 border-text min-w-full focus:outline-none bg-brand-white"
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
                className="block border-2 p-1 md:p-2 border-text min-w-full focus:outline-none bg-brand-white"
                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                placeholder="Last Name"
              />

              <label className=" font-semibold" htmlFor="email">
                Email Address
              </label>
              <input
                className="block border-2 p-1 md:p-2 text-text-light border-text bg-brand-white min-w-full focus:outline-none"
                id="emailId"
                name="emailId"
                type="emailId"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.emailId}
                placeholder="Email Id"
                readOnly
              />

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
                    className="h-10 box-border p-1 md:p-2 block border-2 border-text min-w-full focus:outline-none bg-brand-white"
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
                    className="h-10 border-box block bg-brand-white border-2 p-1 md:p-2 border-text min-w-full focus:outline-none"
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

              <label className=" font-semibold" htmlFor="email">
                <sup>*</sup>Skills
                <p className="inline text-sm">(Comma separated)</p>
              </label>
              <input
                className="block border-2 p-1 md:p-2 border-text min-w-full focus:outline-none bg-brand-white"
                id="skills"
                name="skills"
                type="text"
                onChange={(e) => {
                  // Split skills string into an array when the input changes
                  formik.setFieldValue(
                    "skills",
                    e.target.value.split(",").map((skill) => skill.trim())
                  );
                }}
                onBlur={formik.handleBlur}
                value={formik.values.skills}
                placeholder="Skills"
              />

              <label className=" font-semibold" htmlFor="email">
                Image URL
              </label>
              <input
                className="block border-2 p-1 md:p-2 border-text min-w-full focus:outline-none bg-brand-white"
                id="photoUrl"
                name="photoUrl"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.photoUrl}
                placeholder="Enter your image URL"
              />

              <label className=" font-semibold" htmlFor="email">
                <sup>*</sup>About
              </label>
              <textarea
                className="block border-2 p-1 md:p-2 max-h-20 border-text min-w-full focus:outline-none bg-brand-white"
                id="about"
                name="about"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.about}
                placeholder="Write something about yourself"
              />
              <div className="block min-w-full text-text-error">{error}</div>

              <div className="flex min-w-full max-w-full items-center justify-center">
                <div className="relative left-0 mt-4">
                  <div className="absolute inset-0 bg-text"></div>
                  <button
                    className={`font-semibold relative  block border-2 border-text p-2 bg-brand-white ${
                      isClicked
                        ? "-translate-x-0 translate-y-0"
                        : "translate-x-2 -translate-y-2"
                    }`}
                    type="submit"
                    onMouseDown={() => setIsClicked(true)}
                    onMouseUp={() => setIsClicked(false)}
                    onMouseLeave={() => setIsClicked(false)}
                  >
                    Save Profile
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ProfileCard user={formik.values} />
    </div>
  );
};

export default EditProfile;
