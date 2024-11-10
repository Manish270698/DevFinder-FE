import PropTypes from "prop-types";

const ConnectionCard = ({ connection }) => {
  const { photoUrl, firstName, lastName, age, about } = connection;
  return (
    <div className="flex justify-center text-sm md:text-lg lg:lg:text-xl mt-6">
      <div className="w-[100%] relative">
        <div className="absolute inset-0 bg-text w-[100%] z-0"></div>
        <div className="flex relative flex-wrap justify-center border-2 translate-x-2 -translate-y-2 border-text z-10 bg-brand p-4">
          <div className=" w-[15%] flex justify-center items-start">
            <img
              className="h-10 w-10 md:w-14 md:h-14 border-2 border-text rounded-full rounded-full object-cover"
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
        </div>
      </div>
    </div>
  );
};

ConnectionCard.propTypes = {
  connection: PropTypes.object.isRequired,
};

export default ConnectionCard;
