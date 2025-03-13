import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserProfile } from "../../API";
import { Footer } from "../../components";
import uuid from "react-uuid";



const Profile = () => {
  const [profile, setProfile] = useState({
});

  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [stars, setStars] = useState(0);
  const { username } = useParams();
  const [newPhoto, setNewPhoto] = useState("");

  useEffect(() => {
    // Fetch profile and rewards from local storage or API
    const storedProfile = JSON.parse(localStorage.getItem("profile")) || profile;
    const storedStars = JSON.parse(localStorage.getItem("stars")) || 0;
    setProfile(storedProfile);
    setStars(storedStars);
  }, []);

  const getUser = (username) => {
    getUserProfile(username)
      .then((res) => {
        setUser(res.data[username] || {});
      })
      .catch(() => {
        setUser({});
      });
  };

  const calc_followers = (followers) => {
    if (followers > 10000 && followers < 1000000) {
      return (followers / 1000).toFixed(2) + "K";
    } else if (followers >= 1000000) {
      return (followers / 1000000).toFixed(2) + "M";
    } else {
      return Number(followers).toLocaleString();
    }
  };

  const handleMutualFollowers = () => {
    if (user.edge_mutual_followed_by?.edges?.length) {
      return user.edge_mutual_followed_by.edges.map((account, index) => (
        <span key={uuid()} className={"text-dark-" + index}>
          {account}
          {index !== user.edge_mutual_followed_by.edges.length - 1 ? " and " : ""}
        </span>
      ));
    }
    return null;
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updatedProfile = { ...profile, profilePhoto: newPhoto || profile.profilePhoto };
    localStorage.setItem("profile", JSON.stringify(updatedProfile));
    setProfile(updatedProfile);
    setIsEditing(false);
  };

  useEffect(() => {
    getUser(username);
  }, [username]);

  return (
    <>
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-100 to-purple-300 shadow-2xl p-10 rounded-3xl mt-16 border-2 border-purple-500">
        <h2 className="text-purple-900 text-3xl font-bold text-center mb-6">My Profile</h2>
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <div className="flex flex-col items-center mb-6">
            <img
              src={user.profilePhoto || "default-profile.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-purple-500 shadow-md"
            />
            {isEditing && (
              <input type="file" accept="image/*" onChange={handlePhotoChange} className="mt-3" />
            )}
          </div>
          {isEditing ? (
            <>
              <input
                type="text"
                name="Username"
                value={user.name || ""}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg mb-3 shadow-sm"
                placeholder="Enter your name"
              />
              <input
                type="email"
                name="email"
                value={user.email || ""}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg mb-3 shadow-sm"
                placeholder="Enter your email"
              />
              <input
                type="text"
                name="First Name"
                value={user.Fname || ""}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg mb-3 shadow-sm"
                placeholder="Enter your contact number"
              />
              <input
                type="text"
                name="Last Name"
                value={user.Lname || ""}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg mb-3 shadow-sm"
                placeholder="Enter your account number"
              />
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-5 py-2 rounded-lg mt-3 hover:bg-green-700 transition-all"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <p className="text-lg font-semibold text-gray-700">Username: {user.name}</p>
              <p className="text-lg font-semibold  text-gray-700">Email: {user.email}</p>
              <p className="text-lg font-semibold text-gray-700">First Name: {user.Fname}</p>
              <p className="text-lg font-semibold text-gray-700">Last Name: {user.Lname}</p> <button
                onClick={() => setIsEditing(true)}
                className="bg-purple-600 text-white px-5 py-2 rounded-lg mt-3 hover:bg-purple-700 transition-all"
              >
                Edit
              </button>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
