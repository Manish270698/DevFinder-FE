import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const Reject = ({ _id }) => {
    let feed = useSelector((store) => store.feed);
  const [isRejected, setIsRejected] = useState(false);
  return (
    <div className="relative left-0">
      <div className="absolute inset-0 min-w-full bg-text"></div>
      <button
        className={`font-semibold relative text-lg md:text-xl min-w-full border-2 border-text p-2 bg-brand-reject ${
          isRejected
            ? "-translate-x-0 translate-y-0"
            : "translate-x-2 -translate-y-2"
        }`}
        type="button"
        onClick={() => {
          setIsRejected(!isRejected);
          setIsRejected(!isRejected);
          feed = feed?.filter((card) => card._id !== _id);
          dispatch(addFeed(feed));
        }}
      >
        Ignore
      </button>
    </div>
  );
};

export default Reject;
