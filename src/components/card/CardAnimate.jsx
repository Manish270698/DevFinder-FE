import React, { useState, useEffect, useRef } from "react";
import Hammer from "hammerjs";

const CardAnimate = ({ id, onSwipeLeft, onSwipeRight, index, totalCards }) => {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeAnimation, setSwipeAnimation] = useState({
    active: false,
    direction: null,
  });

  useEffect(() => {
    const hammer = new Hammer(cardRef.current);
    hammer.get("pan").set({ direction: Hammer.DIRECTION_HORIZONTAL });

    hammer.on("panstart", () => {
      setIsSwiping(true);
    });

    hammer.on("panmove", (event) => {
      setPosition({
        x: event.deltaX,
        y: 0,
      });
    });

    hammer.on("panend", (event) => {
      setIsSwiping(false);

      if (event.deltaX > 100) {
        onSwipeRight(id);
      } else if (event.deltaX < -100) {
        onSwipeLeft(id);
      } else {
        setPosition({ x: 0, y: 0 });
      }
    });

    return () => {
      hammer.destroy();
    };
  }, [id, onSwipeLeft, onSwipeRight]);

  const handleSwipe = (direction) => {
    if (direction === "left") {
      setSwipeAnimation({ active: true, direction: "left" });
      setTimeout(() => {
        onSwipeLeft(id);
        setSwipeAnimation({ active: false, direction: null });
      }, 300); // Match this duration with the CSS transition duration
    } else {
      setSwipeAnimation({ active: true, direction: "right" });
      setTimeout(() => {
        onSwipeRight(id);
        setSwipeAnimation({ active: false, direction: null });
      }, 300);
    }
  };

  const handleRejectClick = () => {
    handleSwipe("left");
  };

  const handleInterestedClick = () => {
    handleSwipe("right");
  };

  return (
    <div
      ref={cardRef}
      className={`absolute w-48 h-72 bg-gray-100 rounded-lg shadow-md flex flex-col items-center justify-around transition-transform duration-300 ${
        swipeAnimation.active
          ? swipeAnimation.direction === "left"
            ? "animate-swipe-left"
            : "animate-swipe-right"
          : ""
      }`}
      style={{
        zIndex: totalCards - index,
        transform: `translateX(${position.x}px) rotate(${position.x / 20}deg)`,
        transition: isSwiping ? "none" : "transform 0.3s ease",
      }}
    >
      <h3 className="text-xl font-semibold">Card {id + 1}</h3>
      <div className="flex gap-2">
        <button
          onClick={handleRejectClick}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Reject
        </button>
        <button
          onClick={handleInterestedClick}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Interested
        </button>
      </div>
    </div>
    
  );
};

const CardContainer = () => {
  const [cards, setCards] = useState([0, 1, 2, 3, 4]);

  const handleReject = (id) => {
    console.log(`Rejected card ${id + 1}`);
    setCards((prevCards) => prevCards.filter((cardId) => cardId !== id));
  };

  const handleInterested = (id) => {
    console.log(`Interested in card ${id + 1}`);
    setCards((prevCards) => prevCards.filter((cardId) => cardId !== id));
  };

  return (
    <div className="relative w-full h-80 flex items-center justify-center">
      {cards.map((id, index) => (
        <Card
          key={id}
          id={id}
          index={index}
          totalCards={cards.length}
          onSwipeLeft={handleReject}
          onSwipeRight={handleInterested}
        />
      ))}
      {cards.length === 0 && (
        <h2 className="text-2xl mt-4">All cards processed!</h2>
      )}
    </div>
  );
};

export default CardAnimate;
