import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import { useState } from "react";

const RequestCard = ({ request }) => {
  const [accept, setAccept] = useState(false);
  const [reject, setReject] = useState(false);

  const { photoUrl, firstName, lastName, age, about } = request.fromUserId;
  return (
    <div className="flex justify-center text-sm md:text-lg lg:lg:text-xl mt-6">
      <div className="w-[100%] relative">
        <div className="absolute inset-0 bg-text w-[100%] z-0"></div>
        <div className="flex relative flex-wrap justify-center border-2 translate-x-2 -translate-y-2 border-text z-10 bg-brand">
          <div className=" w-[15%] flex justify-center items-start p-2">
            <img
              className="h-10 w-10 md:w-14 md:h-14 border-2 border-text rounded-full object-cover"
              src={photoUrl}
              alt="connection image"
            />
          </div>
          <div className="w-[75%] p-2">
            <div className="font-bold">
              <p>{firstName + " " + lastName + ", " + age}</p>
            </div>
            <div className="">
              <p>{about}</p>
            </div>
          </div>
          <div className="w-[10%] border-l-2 border-text">
            <button
              title="accept"
              type="submit"
              className="w-[100%] h-1/2 border-b-2 border-text flex justify-center items-center hover:bg-brand-accept"
              onMouseDown={() => setAccept(true)}
              onMouseUp={() => setAccept(false)}
              onMouseLeave={() => setAccept(false)}
            >
              <CheckCircleIcon
                className={`p-2 ${accept ? "size-10" : "size-11"}`}
              />
            </button>
            <button
              title="reject"
              type="submit"
              className="w-[100%] h-1/2 flex justify-center items-center hover:bg-brand-reject"
              onMouseDown={() => setReject(true)}
              onMouseUp={() => setReject(false)}
              onMouseLeave={() => setReject(false)}
            >
              <XCircleIcon
                className={`p-2 ${reject ? "size-10" : "size-11"}`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

RequestCard.propTypes = {
  request: PropTypes.object.isRequired,
};

export default RequestCard;
