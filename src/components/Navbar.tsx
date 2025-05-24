import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../auth/context";

const Navbar: React.FC = () => {
  const { currentUser } = useAuth();

  console.log("Current User:", currentUser);

  const WatchlistIcon = ({ count = 5 }) => (
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
        <span className="absolute -top-1 -right-[2px] bg-red-500 text-black bg-white text-[11px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </div>
  );
  const [searchTerm, setSearchTerm] = React.useState("");
  const [showDropdown, setShowDropdown] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Dummy search results
  const dummyResults = [
    "The Shawshank Redemption",
    "The Godfather",
    "The Dark Knight",
    "Pulp Fiction",
    "Fight Club",
  ];

  // Filter results based on search term
  const filteredResults = dummyResults.filter((movie) =>
    movie.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle click outside of dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowDropdown(true);
  };

  return (
    <nav className="navbar flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="flex items-center gap-4">
        <Link to="/">Home</Link>
        {currentUser && <Link to="/watchlist">Watchlist</Link>}
      </div>
      <div>
        <div className="flex-1 mx-4 relative">
          <input
            type="text"
            placeholder="Search movies..."
            className=" px-3 py-2 rounded text-gray-800 pl-10 bg-gray-100 w-[250px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearchChange}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {showDropdown && searchTerm && (
            <div
              ref={dropdownRef}
              className="absolute mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto z-10"
            >
              {filteredResults.length > 0 ? (
                <ul className="py-1 text-sm text-gray-700">
                  {filteredResults.map((result, index) => (
                    <Link
                      to={`/search/${result}`}
                      key={index}
                      onClick={() => {
                        setSearchTerm(result);
                        setShowDropdown(false);
                      }}
                    >
                      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer display-block">
                        {result}
                      </div>
                    </Link>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-2 text-sm text-gray-500">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div>
          <Link to="/watchlist">
            <WatchlistIcon />
          </Link>
        </div>
        <div>
          {currentUser ? (
            <button onClick={() => signOut(auth)}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
