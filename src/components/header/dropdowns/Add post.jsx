import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useClickOutside from "../../../hooks/useOutsideClick";
import { useAuth } from "../../../contexts/Auth";
import { Dropdown } from "./dropdown";

const AddPost = () => {
  const [isActive, setIsActive] = useState(false);
  const AddPost = useRef(null);
  const menuDropdown = useRef(null);
  const { toggleAuth } = useAuth();
  const navigate = useNavigate();

  const handleActiveDropdown = () => {
    setIsActive((prev) => !prev);
    console.log("Dropdown Active:", !isActive);
  };

  const handleLogOut = () => {
    toggleAuth();
    navigate("/accounts/login/", { replace: true });
  };

  useClickOutside(AddPost, menuDropdown, setIsActive);

  return (
    <>
      {isActive && <div className="active-border"></div>}

      <button
        className="h-6 w-6 rounded-full border border-slate-200 overflow-hidden"
        onClick={handleActiveDropdown}
        ref={AddPost}
      >
        <img className="" src="/images/users/default.png" alt="User" />
      </button>

      <Dropdown
  className="menu-dropdown"
  active={isActive}
  dropdownRef={menuDropdown}
  style={{
    position: "absolute",
    top: "100%", // Ensure it appears below the header
    zIndex: 1100, // Higher than header
    background: "white",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Add some shadow
  }}
>

        <ul>
          <li className="menu-item hover:bg-gray-50 active:bg-gray-100">
            <Link to="/profiles/" className="flex py-2.5 px-4">
              <svg height="16" viewBox="0 0 24 24" width="16">
                <circle
                  cx="12.004"
                  cy="12.004"
                  fill="none"
                  r="10.5"
                  stroke="purple"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="2"
                ></circle>
                <circle
                  cx="12.006"
                  cy="9.718"
                  fill="none"
                  r="4.109"
                  stroke="purple"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="2"
                ></circle>
              </svg>
              <span className="ml-3 text-purple-900">Post Something</span>
            </Link>
          </li>
          <li className="menu-item flex hover:bg-gray-50 active:bg-gray-100">
            <Link to="" className="flex py-2.5 px-4">
              <svg height="16" viewBox="0 0 24 24" width="16">
                <circle
                  cx="12"
                  cy="12"
                  fill="none"
                  r="8.635"
                  stroke="purple"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></circle>
              </svg>
              <span className="ml-3 text-purple-900">Pitch Idea</span>
            </Link>
          </li>
          <li className="menu-item flex border-t hover:bg-gray-50 active:bg-gray-100">
            <form className="grow" onSubmit={handleLogOut}>
              <button
                className="py-2.5 px-4 mb-1 w-full text-left text-purple-900"
                type="submit"
              >
                Log Out
              </button>
            </form>
          </li>
        </ul>
      </Dropdown>
    </>
  );
};

export default AddPost;
