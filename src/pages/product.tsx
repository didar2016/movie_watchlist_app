/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { addDoc, arrayRemove, arrayUnion, collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";

// Define the interface for movie ratings
interface MovieRating {
  Source: string;
  Value: string;
}

// Define the interface for movie data
interface MovieData {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: MovieRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}



interface MovieCardProps {
  movie: MovieData | null;
  currentUser?: any;
  watchlist?: any[];
  setToggle?: React.Dispatch<React.SetStateAction<boolean>>;
  toggle?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, currentUser, watchlist,  toggle, setToggle }) => {
  // const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();
    const [Loading, setLoading] = useState(false);
  
 const notify = (mesg:any) => toast(mesg);
  // Define state for the user
  const [user, setUser] = useState<string | null>(null);

  // Get user from local storage on component mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

 const addTowatchlist = async (movie: MovieData) => {
    try {
      setLoading(true);
      const user = auth.currentUser;

      if (!user) {
        notify("Please log in to add movies to your watchlist");
        return;
      }

      const watchlistRef = collection(db, "watchlist");

      const q = query(watchlistRef, where("userid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const watchlistDoc = querySnapshot.docs[0];
        const currentData = watchlistDoc.data();

        await updateDoc(watchlistDoc.ref, {
          count: (currentData.count || 0) + 1,
          watchlist: arrayUnion(movie.imdbID),
        });
     
       notify("Movie added to watchlist successfully!");
      } else {
        const docRef = await addDoc(collection(db, "watchlist"), {
          userid: user.uid,
          count: 1,
          watchlist: [movie?.imdbID],
        });

      }

      if (setToggle) setToggle(!toggle);
      
      setLoading(false)
        // Toggle to update the watchlist
    } catch (error) {
      throw error;
    }
  };


  const removeFromWatchlist = async (movie: MovieData) => {
  try {
    setLoading(true);
    const user = auth.currentUser;

    if (!user) {
      notify("Please log in to remove movies from your watchlist");
      return;
    }

    const watchlistRef = collection(db, "watchlist");
    const q = query(watchlistRef, where("userid", "==", user.uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const watchlistDoc = querySnapshot.docs[0];
      const currentData = watchlistDoc.data();

      await updateDoc(watchlistDoc.ref, {
        count: Math.max((currentData.count || 1) - 1, 0),
        watchlist: arrayRemove(movie.imdbID),
      });

      setLoading(false);

      console.log("Movie removed from watchlist for user:", user.uid);
    } else {
      notify("No watchlist found for this user.");
    }

          if (setToggle) setToggle(!toggle); // Toggle to update the watchlist
notify("Movie removed from watchlist successfully!");
  } catch (error) {
    console.error("Error removing movie from watchlist: ", error);
    throw error;
  }
};



if(Loading) {
    (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    )
  }
  
  return (
    <>
      {movie ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <ToastContainer aria-label="Notification Toasts" />
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="p-6 md:w-2/3">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold mb-2">{movie.Title}</h2>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-gray-700 font-semibold">
                    {movie.imdbRating}/10
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {movie.Year}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {movie.Rated}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {movie.Runtime}
                </span>
              </div>

              <p className="text-gray-700 mb-4">{movie.Plot}</p>

              <div className="mb-4">
                <p className="text-gray-600">
                  <span className="font-semibold">Genre:</span> {movie.Genre}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Director:</span>{" "}
                  {movie.Director}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Actors:</span> {movie.Actors}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  // onClick={() => setShowDetails(!showDetails)}
                  onClick={() => navigate("/singleproduct/" + movie.imdbID)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition duration-150 ease-in-out"
                >
                  Show More Details
                </button>
                {currentUser && (
                  !watchlist?.includes(movie.imdbID) ? (
                     <button
                    onClick={() => addTowatchlist(movie)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition duration-150 ease-in-out"
                  >
                    Add to Watchlist
                  </button>
                  ) : 
                  (
                    <button
                    onClick={() => removeFromWatchlist(movie)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition duration-150 ease-in-out"
                  >
                    Remove from Watchlist
                  </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg shadow-md overflow-hidden mb-6 p-12 text-center">
          <svg
            className="w-16 h-16 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            ></path>
          </svg>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            No movies found
          </h3>
          <p className="text-gray-500">
            Try searching for another title or check your spelling.
          </p>
        </div>
      )}
    </>
  );
};


interface ProductProps {
  currentUser?: any;
  toggle?: boolean;
  setToggle?: React.Dispatch<React.SetStateAction<boolean>>;
  watchlist?: any[];
}
const ProductPage: React.FC<ProductProps> = ({ currentUser, toggle, setToggle, watchlist }) => {
  // State for search input and results
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<MovieData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log("Current User--------------- ", watchlist);

  // Debounce function
  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Fetch movie data from API
  const fetchMovieData = async (title: string) => {
    if (!title.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?t=${title}&apikey=7e55802f`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setSearchResults(data);
        console.log(data);
        setError(null);
      } else {
        setError(data.Error || "Movie not found");
        setSearchResults(null);
      }
    } catch (err) {
      setError("Failed to fetch movie data");
      setSearchResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Create debounced search function
  const debouncedSearch = React.useCallback(
    debounce((term: string) => fetchMovieData(term), 1000),
    []
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Movie Collection</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search movies..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          onChange={handleSearchChange}
        />
      </div>

      <div>
        {!isLoading && !error && <MovieCard movie={searchResults} currentUser={currentUser} watchlist={watchlist} setToggle={setToggle} toggle={toggle}/>}
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default ProductPage;
