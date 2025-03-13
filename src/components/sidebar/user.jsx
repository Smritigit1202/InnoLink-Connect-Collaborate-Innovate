import axios from "axios"; // Import axios for API calls
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.scss";

const User = () => {
  const [user, setUser] = useState(null); // State to store user info

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/user/profile/", {
      withCredentials: true, // Ensures cookies are sent
      headers: {
        Authorization: `Token YOUR_AUTH_TOKEN`, // If using Token Auth
      },
    })
    .then((response) => {
      console.log("✅ API Response:", response.data);
      setUser(response.data);
    })
    .catch((error) => {
      console.error("❌ Error fetching user:", error);
    });
  }, []);

  return (
    <div className="flex items-center mt-4 mb-2.5">
      <div className="mr-4">
        <Link
          to="/profile/"
          className="block rounded-full border border-slate-200 overflow-hidden"
        >
          <img
            className="w-14 h-14"
            src={user?.profile_picture || "/images/users/default.png"} // Show profile picture or default
            alt="Profile"
          />
        </Link>
      </div>
      <div className="flex flex-col grow">
        <Link to="/profile/" className="font-medium text-purple-800">
          {user?.username || "My Profile"} 
        </Link>
        <span className="text-purple-400 mt-0.5">Let's Innolink</span>
      </div>
    </div>
  );
};

export default User;
