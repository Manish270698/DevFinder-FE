import { useEffect, useState } from "react";
import ConnectionCard from "./ConnectionCard";
import { BASE_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Connections = () => {
  const navigate = useNavigate();
  const [connections, setConnections] = useState(null);

  const conns = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      setConnections(res.data.data);
      console.log(connections);
    } catch (err) {
      navigate("/error");
    }
  };

  useEffect(() => {
    conns();
  }, []);

  return (
    <div className="flex justify-center items-center text-brand-light">
      <div className="w-[90%] relative sm:w-3/5 lg:w-1/2 xl:w-2/5 mt-10 md:mt-16 min-h-dvh">
        <div className="relative items-center">
          <div className="absolute inset-0 bg-text"></div>
          <h1 className="relative p-4 bg-brand text-text font-bold text-lg lg:text-2xl translate-x-2 -translate-y-2 border-2 border-text">
            Your Connections
          </h1>
        </div>
        {connections && connections.length != 0 ? (
          <div>
            {connections.map((connection) => (
              <div key={connection._id}>
                <ConnectionCard connection={connection} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center mt-6 ">
            <p>You don't have any connections!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Connections;
