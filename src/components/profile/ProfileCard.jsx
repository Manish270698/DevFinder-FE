import { Link } from "react-router-dom";

import PropTypes from "prop-types";

const ProfileCard = ({ user }) => {
  const { firstName, lastName, age, skills, photoUrl } = user;
  return (
    <div className="flex justify-start md:justify-center text-sm md:text-lg lg:text-xl mt-10 md:mt-16 min-h-dvh w-[90%] md:w-2/5">
      <div className="w-[70%] sm:w-[50%] md:w-[90%] lg:w-[70%] xl:w-[55%]">
        <div className="relative items-center">
          <div className="absolute inset-0 w-[50%] bg-text"></div>
          <p className="relative p-2 lg:p-4 w-[50%] bg-brand text-text font-bold text-lg lg:text-2xl translate-x-2 -translate-y-2 border-2 border-text">
            Preview
          </p>
        </div>
        <div className="relative h-[80%] md:h-[60%] lg:h-[55%]">
          <div className="absolute inset-0 min-w-52 bg-text"></div>
          <div className="w-[100%] h-[100%] mt-10 border-2 border-text relative translate-x-2 -translate-y-2">
            <div className="h-[80%] relative">
              <img
                src={photoUrl}
                alt="Profile image"
                className="absolute aspect-auto z-0 h-[100%] w-[100%] object-cover bg-brand-light"
              />
              <div className="flex justify-center items-center h-[75%] w-[100%]"></div>
              <div className="absolute h-[25%] w-[100%] bg-gradient-to-t from-text"></div>
              <div className="h-[25%] w-[100%] flex flex-col items-start justify-end gap-2 pb-4 px-4 relative text-brand-white">
                <div className="w-[100%]">
                  <p className="">{firstName + " " + lastName + ", " + age}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map(
                    (skill, index) =>
                      skill.trim().length > 0 && (
                        <p
                          key={index}
                          className="inline-block text-sm lg:text-lg px-1 border-2 border-brand-white"
                        >
                          {skill.trim().charAt(0).toUpperCase() +
                            skill.trim().slice(1).toLowerCase()}
                        </p>
                      )
                  )}
                </div>
              </div>
            </div>
            <div className="bg-brand h-[20%] w-[100%] flex items-center justify-center p-4">
              <div className="w-[100%] relative flex flex-wrap justify-between">
                <Link className="relative left-0">
                  <div className="absolute inset-0 min-w-full bg-text"></div>
                  <button
                    className="font-semibold relative p-1 md:p-2 text-lg md:text-xl translate-x-2 -translate-y-2 min-w-full border-2 border-text bg-brand-reject "
                    type="button"
                  >
                    Ignore
                  </button>
                </Link>
                <Link className="relative left-0">
                  <div className="absolute inset-0 min-w-full bg-text"></div>
                  <button
                    className="font-semibold relative p-1 md:p-2 text-lg md:text-xl min-w-full translate-x-2 -translate-y-2 border-2 border-text bg-brand-accept"
                    type="button"
                  >
                    Interested
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ProfileCard;
