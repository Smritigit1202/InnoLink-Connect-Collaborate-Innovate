import { Link, NavLink } from "react-router-dom";
import MenuDropdown from "./dropdowns/menu-dropdown";
import ActivityDropdown from "./dropdowns/activity-dropdown";
import { RecentSearches } from "./search/search";

import "./style.scss";
import logo from "../../assets/images/logo-sm.gif";

const Header = () => {
  return (
    <header className="header bg-white flex justify-center w-full fixed z-10 top-0 left-0">
      <nav className="navbar flex justify-between items-center px-5 w-full">
        <div className="flex-[0_0_auto] w-1/3">
          <Link to="/" className="flex items-center mt-0.5 space-x-2">
            <img src={logo} alt="Innolink" className="w-10 h-auto" />
            <span className="text-lg font-semibold text-purple-800">Innolink</span>
          </Link>
        </div>
        
        <div className="header-search flex items-center relative">
          <RecentSearches />
        </div>
        
        <div className="flex-[0_0_auto] w-1/3">
          <div className="flex items-center justify-end pl-5">
            <NavLink
              to="/"
              end
              className="action-item"
              children={({ isActive }) => (
                <>
                  {isActive ? (
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <path
                        d="M22 23h-6.001a1 1 0 01-1-1v-5.455a2.997 2.997 0 10-5.993 0V22a1 1 0 01-1 1H2a1 1 0 01-1-1V11.543a1.002 1.002 0 01.31-.724l10-9.543a1.001 1.001 0 011.38 0l10 9.543a1.002 1.002 0 01.31.724V22a1 1 0 01-1 1z"
                        fill="purple"
                      ></path>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <path
                        d="M9.005 16.545a2.997 2.997 0 012.997-2.997h0A2.997 2.997 0 0115 16.545V22h7V11.543L12 2 2 11.543V22h7.005z"
                        fill="purple"
                        stroke="purple"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      ></path>
                    </svg>
                  )}
                </>
              )}
            />
            
            <NavLink
              to="/direct/inbox/"
              end
              className="action-item"
              children={({ isActive }) => (
                <>
                  {isActive ? (
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <path
                        d="M22.91 2.388a.69.69 0 00-.597-.347l-20.625.002a.687.687 0 00-.482 1.178L7.26 9.16a.686.686 0 00.778.128l7.612-3.657a.723.723 0 01.937.248.688.688 0 01-.225.932l-7.144 4.52a.69.69 0 00-.3.743l2.102 8.692a.687.687 0 00.566.518.655.655 0 00.103.008.686.686 0 00.59-.337L22.903 3.08a.688.688 0 00.007-.692"
                        fill="purple"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <line
                        fill="none"
                        stroke="purple"
                        strokeLinejoin="round"
                        strokeWidth="2px"
                        x1="22"
                        x2="9.218"
                        y1="3"
                        y2="10.083"
                      ></line>
                      <polygon
                        fill="none"
                        points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                        stroke="purple"
                        strokeLinejoin="round"
                        strokeWidth="2px"
                      ></polygon>
                    </svg>
                  )}
                </>
              )}
            />
            <Link to="/" className="action-item activity-feed relative">
              <ActivityDropdown />
            </Link>
           
            
            <div className="action-item user-profile relative">
              <MenuDropdown />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
