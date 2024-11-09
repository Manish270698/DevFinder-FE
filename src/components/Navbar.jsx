import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isImageClicked, setIsImageClicked] = useState(false);
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const [isSignOutClicked, setIsSignOutClicked] = useState(false);

  const handleSignOut = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      setIsSignOutClicked(false);
      setIsImageClicked(!isImageClicked);
      console.log("from Navbar");
      navigate("/login");
    } catch (err) {
      navigate("/error");
    }
  };

  const handleProfile = () => {
    navigate("/profile");
    setIsProfileClicked(false);
    setIsImageClicked(!isImageClicked);
  };

  return (
    <div
      className="text-text bg-brand"
      onClick={(event) => {
        setIsImageClicked(false);
        event.stopPropagation();
      }}
    >
      <div className="p-4 flex text-xl items-center justify-between px-6 border-b-2 border-black">
        <div className="cursor-pointer font-bold">
          <Link to="/" className="">
            DevFinder
          </Link>
        </div>
        <div className="flex items-center gap-10 text-base font-semibold">
          <div className="cursor-pointer">
            <a>Connections</a>
          </div>
          <div className="cursor-pointer">
            <a>Requests</a>
          </div>
          <div className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
          </div>
          {user && (
            <div className="relative">
              <img
                className="cursor-pointer rounded-full border-2 border-black w-10 h-10 object-cover"
                src={user.photoUrl}
                alt="Profile pic"
                onClick={(event) => {
                  setIsImageClicked(!isImageClicked);
                  event.stopPropagation();
                }}
              />
              {isImageClicked && (
                <ul className="absolute z-10 right-0 mt-1 before:absolute before:bg-text before:min-w-full before:min-h-full before:-translate-x-2 before:translate-y-2">
                  <li
                    className={`cursor-pointer relative hover:bg-brand whitespace-nowrap p-2 bg-brand-body border-2 border-text ${
                      isProfileClicked ? "-translate-x-2 translate-y-2" : ""
                    }`}
                    onClick={(event) => {
                      setIsSignOutClicked(false);
                      setIsProfileClicked(true);
                      handleProfile();
                      event.stopPropagation();
                    }}
                  >
                    <p className="">Profile</p>
                  </li>
                  <li
                    className={`cursor-pointer relative hover:bg-brand whitespace-nowrap p-2 bg-brand-body border-2 border-text ${
                      isSignOutClicked ? "-translate-x-2 translate-y-2" : ""
                    }`}
                    onClick={(event) => {
                      setIsSignOutClicked(true);
                      setIsProfileClicked(false);
                      handleSignOut();
                      event.stopPropagation();
                    }}
                  >
                    <p>SignOut</p>
                  </li>
                </ul>
              )}
            </div>
          )}
          {!user && (
            <div className="cursor-pointer">
              <Link to="/login">Login/Sign-Up</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
