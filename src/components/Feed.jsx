import axios from "axios";
import Card from "./card/Card";
import { BASE_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import { addUser } from "../utils/userSlice";
import CardShimmer from "./card/CardShimmer";

const Feed = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const UserFeed = async () => {
    try {
      const user = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      if (user) {
        dispatch(addUser(user.data.user));
        const res = await axios.get(BASE_URL + "/user/feed", {
          withCredentials: true,
        });
        dispatch(addFeed(res?.data));
      }
    } catch (err) {
      if (err.status === 401) {
        try {
          const res = await axios.get(BASE_URL + "/user/open/feed", {
            withCredentials: true,
          });
          dispatch(addFeed(res?.data));
        } catch (err) {
          navigate("/error");
        }
      } else {
        navigate("/error");
      }
    }
  };

  useEffect(() => {
    UserFeed();
  }, []);
  return feed && feed.length === 0 ? (
    <>
      <div className="flex h-screen justify-center items-center text-xl text-text border-">
        <p className="flex w-[80%] h-[75%] sm:w-[45%] lg:w-[35%] xl:w-[22%] justify-center items-center text-center">
          Wow!!! you swiped everyone. Come back later.
        </p>
      </div>
    </>
  ) : feed ? (
    <div className="h-screen w-[100%] relative">
      {feed.map((card, index) => {
        return (
          <div
            key={card._id}
            className="text-text flex absolute h-[100%] w-[100%] justify-center items-center"
            style={{
              zIndex: feed.length - index, // Higher zIndex for cards at the top of the stack
            }}
          >
            <Card user={card} />
          </div>
        );
      })}
    </div>
  ) : (
    <div className="text-text flex h-screen justify-center items-center">
      <CardShimmer />
    </div>
  );
};

export default Feed;
