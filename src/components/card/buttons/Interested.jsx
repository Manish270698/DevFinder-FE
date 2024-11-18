import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const Interested = ({_id}) => {
    let feed = useSelector((store) => store.feed);
  const [isInterested, setIsInterested] = useState(false);
  return (
    <div className="relative left-0">
      <div className="absolute inset-0 min-w-full bg-text"></div>
      <button
        className={`font-semibold relative text-lg md:text-xl min-w-full border-2 border-text p-2 bg-brand-accept ${
          isInterested
            ? "-translate-x-0 translate-y-0"
            : "translate-x-2 -translate-y-2"
        }`}
        type="button"
        onClick={() => {
          setIsInterested(!isInterested);
          setIsInterested(!isInterested);
          feed = feed?.filter((card) => card._id !== user._id);
          dispatch(addFeed(feed));
        }}
      >
        Interested
      </button>
    </div>
  );
};

export default Interested;
