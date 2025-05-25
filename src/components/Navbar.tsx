import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../auth/context";
import { useNavigate } from "react-router-dom";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { BiLogOut } from "react-icons/bi";


interface NavbarProps {
  currentUser?: any;
  toggle?: boolean;
  setToggle?: React.Dispatch<React.SetStateAction<boolean>>; 
  count?: number;  
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, count }) => {
  const navigate = useNavigate();

  console.log("Current user in Navbar:", currentUser);
  const handleLogout = async () => {
    console.log("Logging out user:", currentUser);
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      navigate('/')

      window.location.reload(); // Reload the page to reflect the logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };


  const WatchlistIcon = ({count=0} ) => (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 inline-block mr-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
      {count > 0 && (
        <span className="absolute -top-1 -right-[2px] text-black bg-white text-[11px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
          {count}
        </span>
      )}
    </div>
  );







  

  return (
    <nav className="navbar flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="flex items-center gap-4">
        <Link to="/">Home</Link>
        {currentUser && <Link to="/watchlist">Watchlist</Link>}
      </div>

      <div className="flex items-center gap-4">
        <div>
          <Link to="/watchlist">
            <WatchlistIcon count={count}/>
          </Link>
        </div>
        <div>
          {currentUser ? (
            <BiLogOut onClick={handleLogout} />
          ) : (
            <Link to="/login">
              <LuLogIn />
            </Link>
          )}
        </div> 
      </div>
    </nav>
  );
};

export default Navbar;
