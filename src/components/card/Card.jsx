import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Hammer from "hammerjs";
import { XMarkIcon, CheckIcon } from "@heroicons/react/16/solid";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../../utils/feedSlice";

const Card = ({ user }) => {
  const cardRef = useRef(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isRejected, setIsRejected] = useState(false);
  const [isInterested, setIsInterested] = useState(false);
  let feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  useEffect(() => {
    const hammer = new Hammer(cardRef.current);
    hammer.get("pan").set({ direction: Hammer.DIRECTION_ALL });
    hammer.on(
      "panstart",
      () => {
        setIsSwiping(true);
        console.log(isSwiping);
      },
      []
    );

    hammer.on("panmove", (event) => {
      setPosition({
        x: event.deltaX,
        y: event.deltaY,
      });
    });

    hammer.on("panend", (event) => {
      setIsSwiping(false);
      console.log(event.deltaX, event.deltaY);
      // choose based on pan position
      if (event.deltaX < -100) {
        cardRef.current.animate(
          [
            {
              transform: `translateX(${event.deltaX}px) translateY(${
                event.deltaY
              }px) rotate(${event.deltaX / 20}deg)`,
            },
            {
              transform: `translateX(${-1200}px) translateY(${
                event.deltaY
              }px) rotate(${event.deltaX / 20}deg)`,
            },
          ],
          {
            duration: 300,
            fill: "forwards",
            easing: "ease-out",
          }
        );
        feed = feed?.filter((card) => card._id !== user._id);
        dispatch(addFeed(feed));
      } else if (event.deltaX > 100) {
        cardRef.current.animate(
          [
            {
              transform: `translateX(${event.deltaX}px) translateY(${
                event.deltaY
              }px) rotate(${event.deltaX / 20}deg)`,
            },
            {
              transform: `translateX(${1200}px) translateY(${
                event.deltaY
              }px) rotate(${event.deltaX / 20}deg)`,
            },
          ],
          {
            duration: 300,
            fill: "forwards",
            easing: "ease-out",
          }
        );
        feed = feed?.filter((card) => card._id !== user._id);
        dispatch(addFeed(feed));
      } else {
        setPosition({
          x: 0,
          y: 0,
        });
      }
    });

    return () => {
      hammer.destroy();
    };
  }, []);
  return (
    <div
      ref={cardRef}
      className={`relative w-[80%] h-[70%] lg:h-[75%] sm:w-[50%] md:w-[40%] lg:w-[30%] xl:w-[22%]  md:w-[35%] ${
        isRejected
          ? "animate-swipe-left"
          : isInterested
          ? "animate-swipe-right"
          : ""
      }`}
      style={{
        transform: `translateX(${position.x}px) translateY(${
          position.y
        }px)  rotate(${position.x / 20}deg)`,
        transition: isSwiping ? "none" : "transform 0.3s ease",
      }}
    >
      <div className="absolute inset-0 min-w-full bg-text"></div>
      <div className="w-[100%] h-[100%] border-2 border-text relative translate-x-2 -translate-y-2">
        <div className="h-[80%] relative">
          <img
            src={user.photoUrl}
            alt="Profile image"
            className="absolute z-0 h-[100%] w-[100%] object-cover bg-brand-light"
          />
          <div className="flex justify-center items-center h-[75%] w-[100%]">
            {position.x < -100 ? (
              <XMarkIcon className="absolute size-60 text-brand-reject" />
            ) : position.x > 100 ? (
              <CheckIcon className="absolute size-60 text-brand-accept" />
            ) : (
              ""
            )}
          </div>
          <div className="absolute h-[25%] w-[100%] bg-gradient-to-t from-text"></div>
          <div className="h-[25%] w-[100%] flex flex-col items-start justify-end gap-2 pb-4 px-4 relative text-brand-white">
            <div className="w-[100%]">
              <p className="">
                {user?.firstName + " " + user?.lastName + ", " + user?.age}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {user?.skills.map((skill, index) => (
                <p
                  key={index}
                  className="inline-block text-sm lg:text-lg px-1 border-2 border-brand-white"
                >
                  {skill}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-brand h-[20%] w-[100%] flex items-center justify-center p-4">
          <div className="w-[100%] relative flex flex-wrap justify-between">
            <Link className="relative left-0">
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
                  feed = feed?.filter((card) => card._id !== user._id);
                  dispatch(addFeed(feed));
                }}
              >
                Ignore
              </button>
            </Link>
            <Link className="relative left-0">
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
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Card;
