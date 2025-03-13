import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useClickOutside from "../../../hooks/useOutsideClick";
import { useAuth } from "../../../contexts/Auth";
import { Dropdown } from "./dropdown";
import captureImage from "../../../assets/Capture.PNG";

const MenuDropdown = () => {
  const [isActive, setIsActive] = useState(false);
  const menuButton = useRef(null);
  const menuDropdown = useRef(null);
  const { toggleAuth } = useAuth();
  const navigate = useNavigate();

  const handleActiveDropdown = () => {
    setIsActive((prev) => !prev);
  };

  const handleLogOut = () => {
    toggleAuth();
    navigate("/accounts/login/", { replace: true });
  };
  useClickOutside(menuButton, menuDropdown, setIsActive);
  return (
    <>
      {isActive && <div className="active-border"></div>}

      <button
        className="h-6 w-6 rounded-full border border-slate-200 overflow-hidden"
        onClick={handleActiveDropdown}
        ref={menuButton}
      >
        <img className="" src={captureImage} alt="User Icon" />
        </button>

      <Dropdown
        class="menu-dropdown"
        active={isActive}
        dropdownRef={menuDropdown}
      >
        <ul>
        <li className="menu-item hover:bg-gray-50 active:bg-gray-100">
  <Link to="/Pitch/" className="flex py-2.5 px-4">
    {/* Lightbulb Icon for Pitch an Idea */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="purple"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18h6"></path>
      <path d="M10 22h4"></path>
      <path d="M12 2a7 7 0 0 1 7 7c0 2.6-1.4 4.8-3.5 6a3.5 3.5 0 0 0-3.5 3.5V19"></path>
    </svg>
    <span className="ml-3 text-purple-900">Pitch an Idea</span>
  </Link>
</li>

<li className="menu-item flex hover:bg-gray-50 active:bg-gray-100">
  <Link to="" className="flex py-2.5 px-4">
    {/* Pen Icon for Post Something */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="purple"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9"></path>
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
    </svg>
    <span className="ml-3 text-purple-900">Post Something</span>
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

export default MenuDropdown;
