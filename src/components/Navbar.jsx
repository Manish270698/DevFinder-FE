import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
import { BellIcon, LinkIcon } from "@heroicons/react/24/outline";

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
      setIsImageClicked(false);
      navigate("/login");
    } catch (err) {
      navigate("/error");
    }
  };

  const handleProfile = () => {
    navigate("/profile");
    setIsProfileClicked(false);
    setIsImageClicked(false);
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
          {user && (
            <Link
              to="/connections"
              title="connections"
              className="cursor-pointer"
            >
              <LinkIcon className="size-6 text-text" />
            </Link>
          )}
          {user && (
            <Link to="/requests" title="requests" className="cursor-pointer">
              <BellIcon className="size-6 text-text" />
            </Link>
          )}
          {user && (
            <div className="relative">
              <img
                className="cursor-pointer rounded-full border-2 border-black w-10 h-10 object-cover"
                src={user.photoUrl}
                alt="Profile pic"
                onClick={(event) => {
                  setIsImageClicked(true);
                  event.stopPropagation();
                }}
              />
              {isImageClicked && (
                <ul
                  onMouseLeave={() => {
                    setIsImageClicked(false);
                  }}
                  className="absolute z-20 right-0 mt-1 before:absolute before:bg-text before:min-w-full before:min-h-full before:-translate-x-2 before:translate-y-2"
                >
                  <li
                    className={`cursor-pointer relative hover:bg-brand whitespace-nowrap p-2 bg-brand-body border-2 border-text ${
                      isProfileClicked ? "-translate-x-2 translate-y-2" : ""
                    }`}
                    onClick={(e) => {
                      setIsProfileClicked(true);
                      handleProfile();
                      e.stopPropagation();
                    }}
                  >
                    <p className="">Profile</p>
                  </li>
                  <li
                    className={`cursor-pointer relative hover:bg-brand whitespace-nowrap p-2 bg-brand-body border-2 border-text ${
                      isSignOutClicked ? "-translate-x-2 translate-y-2" : ""
                    }`}
                    onClick={(e) => {
                      setIsSignOutClicked(true);
                      handleSignOut();
                      e.stopPropagation();
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
