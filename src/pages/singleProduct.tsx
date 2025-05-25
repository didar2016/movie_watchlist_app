/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  serverTimestamp,
  count,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Watchlist from "./watchlist";
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

interface MovieDetailPageProps {
  watchlist?: string[];
  currentUser?: unknown;
  toggle?: boolean;
  setToggle?: React.Dispatch<React.SetStateAction<boolean>>;
}

const MovieDetailPage: React.FC<MovieDetailPageProps> = ({
  watchlist,
  currentUser,
  toggle,
  setToggle,
}) => {
  const notify = (mesg: any) => toast(mesg);
    const [Loading, setLoading] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [movieData, setMovieData] = useState<MovieData>();
  const navigate = useNavigate();

  // Get movie ID from route parameters
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    // Make API call to fetch movie details
    const fetchMovieDetails = async () => {
      try {
        if (!id) return;

        const response = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=7e55802f`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (data.Response === "True") {
          setMovieData(data);
        } else {
          console.error("Error fetching movie:", data.Error);
        }
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  // Check if movie is in watchlist
  useEffect(() => {
    if (watchlist && movieData?.imdbID) {
      setIsInWatchlist(watchlist.includes(movieData.imdbID));
    }
  }, [watchlist, movieData]);

  const addTowatchlist = async (movie: MovieData) => {
    try {
          setLoading(true);

      const user = auth.currentUser;

      if (!user) {
        alert("Please log in to add movies to your watchlist");
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

        console.log("Watchlist updated for user:", user.uid);
      } else {
        const docRef = await addDoc(collection(db, "watchlist"), {
          userid: user.uid,
          count: 1,
          watchlist: [movieData?.imdbID],
        });

        console.log("New watchlist created with ID:", docRef.id);
      }

      notify("Added into the watchlist!");

      if (setToggle) setToggle(!toggle);
          setLoading(false);
 // Toggle to update the watchlist
    } catch (error) {
      console.error("Error adding movie to watchlist: ", error);
      throw error;
    }
  };

  const removeFromWatchlist = async (movie: MovieData) => {
    try {
          setLoading(true);

      const user = auth.currentUser;

      if (!user) {
        alert("Please log in to remove movies from your watchlist");
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

        notify("Movie removed from your watchlist!");
      } else {
        alert("No watchlist found for this user.");
      }

      if (setToggle) setToggle(!toggle); // Toggle to update the watchlist

          setLoading(false);

    } catch (error) {
      console.error("Error removing movie from watchlist: ", error);
      throw error;
    }
  };

  const handleGoBack = () => {
    navigate(-1);
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
      {movieData && (
        <div className="bg-gray-50 min-h-screen py-8">
          <div className="container mx-auto px-4">
            {/* Back button */}
            <button
              onClick={handleGoBack}
              className="mb-6 flex items-center text-gray-600 hover:text-indigo-600"
            >
              <svg
                className="w-5 h-5 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to movies
            </button>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Movie header with backdrop */}
              <div
                className="h-64 bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${movieData.Poster})`,
                }}
              >
                <div className="flex h-full items-end p-6">
                  <div className="flex flex-col md:flex-row items-center md:items-end">
                    <img
                      src={movieData.Poster}
                      alt={movieData.Title}
                      className="w-32 h-auto rounded-md shadow-lg -mb-16 md:-mb-8 border-4 border-white"
                    />
                    <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                      <h1 className="text-3xl font-bold text-white">
                        {movieData.Title}
                      </h1>
                      <div className="flex flex-wrap justify-center md:justify-start items-center text-sm text-white opacity-90 mt-1">
                        <span>{movieData.Year}</span>
                        <span className="mx-2">•</span>
                        <span>{movieData.Rated}</span>
                        <span className="mx-2">•</span>
                        <span>{movieData.Runtime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main content */}
              <div className="p-6 pt-20 md:pt-12">
                <div className="flex flex-wrap items-center justify-between mb-6">
                  {/* Rating */}
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="flex items-center bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full">
                      <svg
                        className="w-5 h-5 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-bold">
                        {movieData.imdbRating}/10
                      </span>
                    </div>
                    <span className="ml-3 text-gray-600">
                      {movieData.imdbVotes} votes
                    </span>
                  </div>

                  <div>
                    {" "}
                    {Boolean(currentUser) &&
                      (!watchlist?.includes(movieData.imdbID) ? (
                        <button
                          onClick={() => addTowatchlist(movieData)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition duration-150 ease-in-out"
                        >
                          Add to Watchlist
                        </button>
                      ) : (
                        <button
                          onClick={() => removeFromWatchlist(movieData)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition duration-150 ease-in-out"
                        >
                          Remove from Watchlist
                        </button>
                      ))}
                  </div>
                </div>

                {/* Genre tags */}
                <div className="mb-6">
                  {movieData.Genre.split(", ").map((genre, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                {/* Plot */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-2">Synopsis</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {movieData.Plot}
                  </p>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Details</h2>
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 text-gray-600 font-medium">
                            Director
                          </td>
                          <td className="py-2">{movieData.Director}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 text-gray-600 font-medium">
                            Writers
                          </td>
                          <td className="py-2">{movieData.Writer}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 text-gray-600 font-medium">
                            Actors
                          </td>
                          <td className="py-2">{movieData.Actors}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 text-gray-600 font-medium">
                            Release Date
                          </td>
                          <td className="py-2">{movieData.Released}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 text-gray-600 font-medium">
                            Box Office
                          </td>
                          <td className="py-2">{movieData.BoxOffice}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-4">Ratings</h2>
                    <div className="space-y-4">
                      {movieData.Ratings.map((rating, index) => (
                        <div key={index} className="bg-gray-100 p-4 rounded-lg">
                          <div className="text-sm text-gray-600">
                            {rating.Source}
                          </div>
                          <div className="text-2xl font-semibold">
                            {rating.Value}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <div className="flex items-center">
                        <div className="text-gray-600 font-medium mr-2">
                          Awards:
                        </div>
                        <div>{movieData.Awards}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional information */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h2 className="text-lg font-semibold mb-2">
                    Additional Information
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-600 font-medium">
                        Language:
                      </span>{" "}
                      {movieData.Language}
                    </div>
                    <div>
                      <span className="text-gray-600 font-medium">
                        Country:
                      </span>{" "}
                      {movieData.Country}
                    </div>
                    <div>
                      <span className="text-gray-600 font-medium">
                        Metascore:
                      </span>{" "}
                      {movieData.Metascore}
                    </div>
                    <div>
                      <span className="text-gray-600 font-medium">Type:</span>{" "}
                      {movieData.Type}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer aria-label={undefined} />
        </div>
      )}
    </>
  );
};

export default MovieDetailPage;
