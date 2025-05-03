import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ConnectionCard = ({ connection }) => {
  const { _id, photoUrl, firstName, lastName, age, about } = connection;
  return (
    <div className="flex justify-center text-sm md:text-lg lg:lg:text-xl mt-6">
      <div className="w-[100%] relative">
        <div className="absolute inset-0 bg-text w-[100%] z-0"></div>
        <div className="flex relative flex-wrap justify-center border-2 translate-x-2 -translate-y-2 border-text z-10 bg-brand p-4">
          <div className="w-[15%] flex justify-center items-start">
            <img
              className="h-10 w-10 md:w-14 md:h-14 border-2 border-text rounded-full object-cover"
              src={photoUrl}
              alt="connection image"
            />
          </div>
          <div className="w-[85%]">
            <div className="font-bold">
              <p>{firstName + " " + lastName + ", " + age}</p>
            </div>
            <div className="">
              <p>{about}</p>
            </div>
          </div>
          <Link
            to={`/chat/${_id}/${firstName + "_" + lastName}`}
            className="absolute right-0 top-0 p-1"
            title="chat"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-brand-light"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

ConnectionCard.propTypes = {
  connection: PropTypes.object.isRequired,
};

export default ConnectionCard;
