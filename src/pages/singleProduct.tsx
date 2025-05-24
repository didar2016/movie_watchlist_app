import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

const movieData: MovieData = {
  Title: "Guardians of the Galaxy Vol. 2",
  Year: "2017",
  Rated: "PG-13",
  Released: "05 May 2017",
  Runtime: "136 min",
  Genre: "Action, Adventure, Comedy",
  Director: "James Gunn",
  Writer: "James Gunn, Dan Abnett, Andy Lanning",
  Actors: "Chris Pratt, Zoe Saldaña, Dave Bautista",
  Plot: "The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father, the ambitious celestial being Ego.",
  Language: "English",
  Country: "United States",
  Awards: "Nominated for 1 Oscar. 15 wins & 60 nominations total",
  Poster: "https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg",
  Ratings: [
    {
      Source: "Internet Movie Database",
      Value: "7.6/10"
    },
    {
      Source: "Rotten Tomatoes",
      Value: "85%"
    },
    {
      Source: "Metacritic",
      Value: "67/100"
    }
  ],
  Metascore: "67",
  imdbRating: "7.6",
  imdbVotes: "792,363",
  imdbID: "tt3896198",
  Type: "movie",
  DVD: "N/A",
  BoxOffice: "$389,813,101",
  Production: "N/A",
  Website: "N/A",
  Response: "True"
};

const MovieDetailPage: React.FC = () => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const navigate = useNavigate();
  
  // Function to handle adding to watchlist
  const handleWatchlistToggle = () => {
    setIsInWatchlist(!isInWatchlist);
    // Here you would implement actual watchlist functionality with your backend
  };
  
  // Function to handle going back
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <button 
          onClick={handleGoBack}
          className="mb-6 flex items-center text-gray-600 hover:text-indigo-600"
        >
          <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to movies
        </button>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Movie header with backdrop */}
          <div 
            className="h-64 bg-cover bg-center" 
            style={{ 
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${movieData.Poster})` 
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
                  <h1 className="text-3xl font-bold text-white">{movieData.Title}</h1>
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
                  <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-bold">{movieData.imdbRating}/10</span>
                </div>
                <span className="ml-3 text-gray-600">{movieData.imdbVotes} votes</span>
              </div>
              
              {/* Add to watchlist button */}
              <button
                onClick={handleWatchlistToggle}
                className={`flex items-center px-4 py-2 rounded-md font-medium ${
                  isInWatchlist 
                    ? 'bg-green-50 text-green-700 border border-green-300' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                } transition-colors duration-200`}
              >
                {isInWatchlist ? (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    In Watchlist
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add to Watchlist
                  </>
                )}
              </button>
            </div>
            
            {/* Genre tags */}
            <div className="mb-6">
              {movieData.Genre.split(', ').map((genre, index) => (
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
              <p className="text-gray-700 leading-relaxed">{movieData.Plot}</p>
            </div>
            
            {/* Details grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Details</h2>
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600 font-medium">Director</td>
                      <td className="py-2">{movieData.Director}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600 font-medium">Writers</td>
                      <td className="py-2">{movieData.Writer}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600 font-medium">Actors</td>
                      <td className="py-2">{movieData.Actors}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600 font-medium">Release Date</td>
                      <td className="py-2">{movieData.Released}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600 font-medium">Box Office</td>
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
                      <div className="text-sm text-gray-600">{rating.Source}</div>
                      <div className="text-2xl font-semibold">{rating.Value}</div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <div className="flex items-center">
                    <div className="text-gray-600 font-medium mr-2">Awards:</div>
                    <div>{movieData.Awards}</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional information */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h2 className="text-lg font-semibold mb-2">Additional Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600 font-medium">Language:</span> {movieData.Language}
                </div>
                <div>
                  <span className="text-gray-600 font-medium">Country:</span> {movieData.Country}
                </div>
                <div>
                  <span className="text-gray-600 font-medium">Metascore:</span> {movieData.Metascore}
                </div>
                <div>
                  <span className="text-gray-600 font-medium">Type:</span> {movieData.Type}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;