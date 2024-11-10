import { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RequestCard from "./RequestCard";

const Requests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState(null);

  const conns = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log("requests :", res.data.data);
      setRequests(res.data.data);
    } catch (err) {
      navigate("/error");
    }
  };

  useEffect(() => {
    conns();
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="w-[90%] relative sm:w-3/5 lg:w-1/2 xl:w-2/5 mt-10 md:mt-16 min-h-dvh">
        <div className="relative items-center">
          <div className="absolute inset-0 bg-text"></div>
          <h1 className="relative p-4 bg-brand text-text font-bold text-lg lg:text-2xl translate-x-2 -translate-y-2 border-2 border-text">
            Requests received
          </h1>
        </div>
        {requests && requests.length != 0 ? (
          <div>
            {requests.map((request) => (
              <div key={request._id}>
                <RequestCard request={request} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center mt-6">
            <p>You don't have any connection requests!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;
