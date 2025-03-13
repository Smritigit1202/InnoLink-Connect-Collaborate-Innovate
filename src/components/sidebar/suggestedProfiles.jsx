import { Link } from "react-router-dom";
import { useState, useEffect, memo } from "react";
import Loadingskeleton from "./loadingSkeleton";
import { getAllRecomendedAPI } from "../../API";
import { useMemo } from "react";
import { getAllRecomendedAPIS } from "../../API";

const SuggestedProfiles = () => {
  const [users, setUsers] = useState([]);

  const getRecomended = () => {
    getAllRecomendedAPIS()

      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((error) => {
        setUsers([]);
      });
  };
  const fetchSuggestedProfiles = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/suggested-profiles/");
    const data = await response.json();
    console.log(data.suggested_profiles); // Use this data in UI
};

useEffect(() => {
    fetchSuggestedProfiles();
}, []);


  useEffect(() => {
    getRecomended();
    // setTimeout(() => {}, 2000);
  }, []);
  return (
    <div className="suggested-profiles">
      <h2 className="text-2xl font-semibold text-purple-800 mb-4">Suggested Profiles</h2>
      <div className="flex flex-col">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <img
                  src={`/images/users/${user.username}.jpg`}
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
                <Link to={`/profile/${user.username}`} className="ml-2 text-sm font-semibold">
                  {user.username}
                </Link>
              </div>
              <button className="text-sm text-blue-500">Look</button>
            </div>
          ))
        ) : (
          <Loadingskeleton type="suggested-profiles" />
        )}
      </div>
    </div>                            
  );
};

export default SuggestedProfiles;
