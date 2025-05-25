import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  arrayRemove,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";

interface WatchProps {
  currentUser?: any;
  toggle?: boolean;
  setToggle?: React.Dispatch<React.SetStateAction<boolean>>;
  watchlist?: string[];
}

const Watchlist: React.FC<WatchProps> = ({
  currentUser,
  toggle,
  setToggle,
  watchlist,
}) => {
    const [Loading, setLoading] = useState(false);

  const [movielist, setMovielist] = useState<any>([]);
  const notify = (mesg: any) => toast(mesg);
  const OMDB_API_KEY = "7e55802f";
  const OMDB_API_URL = "https://www.omdbapi.com/";

  async function fetchMoviesFromWatchlist(watchlist: string[]): Promise<any[]> {
    if (!watchlist || watchlist.length === 0) return [];

    const requests = watchlist.map((id) =>
      fetch(`${OMDB_API_URL}?i=${id}&apikey=${OMDB_API_KEY}`).then((res) =>
        res.json()
      )
    );

    const movies = await Promise.all(requests);
    // Optionally filter out any failed responses
    return movies.filter((movie) => movie && movie.Response === "True");
  }

  

  // Dummy navigate function (replace with your router's navigate if needed)
  function navigate(url: string) {
    window.location.href = url;
  }

  const removeFromWatchlist = async (movie: any) => {
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
        notify("Movie removed from watchlist successfully");
      } else {
        notify("No watchlist found for this user.");
      }

      if (setToggle) setToggle(!toggle);
      // Toggle to update the watchlist
          setLoading(false);

      window.location.reload();
    } catch (error) {
      console.error("Error removing movie from watchlist: ", error);
      throw error;
    }
  };

  useEffect(() => {
    if (watchlist && watchlist.length > 0) {
      fetchMoviesFromWatchlist(watchlist).then((movies) => {
        console.log("Fetched movies from watchlist:", movies);
        setMovielist([...movies]); // Set the fetched movies to state
        // You can set the fetched movies to state or do something else with them
      });
    }
  }, [watchlist]);


  if(Loading) {
    (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    )
  }

  return (
    <>
      {movielist && movielist.length > 0 ? (
        <div className="container mx-auto px-4 py-8">
          <ToastContainer aria-label="Notification Toasts" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {movielist.map((movie: any) => (
              <div
                key={movie.imdbID}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                <div className="relative">
                  <img
                    src={
                      movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"
                    }
                    alt={movie.Title}
                    className="w-full h-72 object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                    {movie.Year}
                  </span>
                  <span className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {movie.imdbRating}/10
                  </span>
                </div>
                <div className="flex-1 flex flex-col p-6">
                  <h2 className="text-xl font-bold mb-2 text-gray-800 truncate">
                    {movie.Title}
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                      {movie.Rated}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                      {movie.Runtime}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                      {movie.Genre}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {movie.Plot}
                  </p>
                  <div className="mb-4">
                    <p className="text-gray-500 text-xs">
                      <span className="font-semibold">Director:</span>{" "}
                      {movie.Director}
                    </p>
                    <p className="text-gray-500 text-xs">
                      <span className="font-semibold">Actors:</span>{" "}
                      {movie.Actors}
                    </p>
                  </div>
                  <div className="mt-auto flex gap-2">
                    <button
                      onClick={() => navigate("/singleproduct/" + movie.imdbID)}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out"
                    >
                      Show Details
                    </button>
                    {currentUser &&
                      (
                        <button
                          onClick={() => removeFromWatchlist(movie)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out"
                        >
                          Remove
                        </button>
                      )}
                  </div>
                </div>
              </div>
            ))}
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
            No movies found in the watchlist
          </h3>
          {/* <p className="text-gray-500">
            Try searching for another title or check your spelling.
          </p> */}
        </div>
      )}
    </>
  );
};

export default Watchlist;
