import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Hammer from "hammerjs";

const Card = () => {
  const cardRef = useRef(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isRejected, setIsRejected] = useState(false);
  const [isInterested, setIsInterested] = useState(false);
  let a = 10;

  useEffect(() => {
    const hammer = new Hammer(cardRef.current);
    console.log(isRejected);
    hammer.get("pan").set({ direction: Hammer.DIRECTION_ALL });
    hammer.on("panstart", () => {
      setIsSwiping(true);
      console.log(isSwiping);
    });

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
      if (event.deltaX < -180) {
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
      } else if (event.deltaX > 180) {
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
      className={`relative w-[80%] h-[80%] sm:w-[45%] lg:w-[35%] xl:w-[22%] ${
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
        {/* <p>Wow! You swiped everyone</p> */}
        <div className="h-[80%] relative">
          <img
            src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRLtXMA-xdlwapKJYWwk-nPxd6SgznCPjD0q8xHDxAzoa8qqTHX"
            alt="Profile image"
            className="absolute z-0 h-[100%] w-[100%] object-cover"
          />
          <div className=" z-10 h-[75%] w-[100%]"></div>
          <div className="absolute h-[25%] w-[100%] bg-gradient-to-t from-text"></div>
          <div className="h-[25%] w-[100%] flex flex-col items-start justify-end gap-2 pb-4 pl-4 relative text-brand-white">
            <div className="w-[100%]">
              <p className="">Manish Kumar, 27</p>
            </div>
            <p className="w-[100%] block">
              React, NodeJS, Express, React, NodeJS, Express
            </p>
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
                }}
              >
                Reject
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

// var hammertime = new Hammer(Card);

export default Card;
