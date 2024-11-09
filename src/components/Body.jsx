import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import { BASE_URL } from "../constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const dispatch = useDispatch();
  const loggedInUser = useSelector((store) => store.user);
  const fetchUser = async () => {
    try {
      if (!(currentPath === "/")) {
        const user = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        if (user) {
          dispatch(addUser(user.data.user));
        }
      }
    } catch (err) {
      if (err.status === 401) {
        console.log("from Body");
        navigate("/login");
      } else {
        navigate("/error");
      }
    }
  };

  useEffect(() => {
    !loggedInUser && fetchUser();
  }, []);

  return (
    <>
      <div className="bg-gradient min-w-full min-h-dvh font-mono">
        <Navbar />
        <ScrollToTop />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default Body;
