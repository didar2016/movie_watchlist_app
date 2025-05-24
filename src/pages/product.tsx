import React, { useState } from 'react';

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

const movieData: MovieData[] = [{
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
},
{
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
}];

const MovieCard: React.FC<{ movie: MovieData }> = ({ movie }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
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
              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 text-gray-700 font-semibold">{movie.imdbRating}/10</span>
            </div>
          </div>
          
          <div className="mb-4">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{movie.Year}</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{movie.Rated}</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{movie.Runtime}</span>
          </div>
          
          <p className="text-gray-700 mb-4">{movie.Plot}</p>
          
          <div className="mb-4">
            <p className="text-gray-600"><span className="font-semibold">Genre:</span> {movie.Genre}</p>
            <p className="text-gray-600"><span className="font-semibold">Director:</span> {movie.Director}</p>
            <p className="text-gray-600"><span className="font-semibold">Actors:</span> {movie.Actors}</p>
          </div>
          
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition duration-150 ease-in-out"
          >
            {showDetails ? 'Hide Details' : 'Show More Details'}
          </button>
          
          {showDetails && (
            <div className="mt-4 border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">Additional Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p className="text-gray-600"><span className="font-semibold">Released:</span> {movie.Released}</p>
                <p className="text-gray-600"><span className="font-semibold">Language:</span> {movie.Language}</p>
                <p className="text-gray-600"><span className="font-semibold">Country:</span> {movie.Country}</p>
                <p className="text-gray-600"><span className="font-semibold">Box Office:</span> {movie.BoxOffice}</p>
                <p className="text-gray-600"><span className="font-semibold">Awards:</span> {movie.Awards}</p>
                <p className="text-gray-600"><span className="font-semibold">Writer:</span> {movie.Writer}</p>
              </div>
              
              <div className="mt-4">
                <h4 className="text-md font-semibold mb-2">Ratings</h4>
                <div className="flex flex-wrap gap-4">
                  {movie.Ratings.map((rating, index) => (
                    <div key={index} className="bg-gray-100 p-3 rounded">
                      <p className="text-sm font-semibold">{rating.Source}</p>
                      <p className="text-lg">{rating.Value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Movie Collection</h1>
      
      <div className="mb-6">
        <input 
          type="text" 
          placeholder="Search movies..." 
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      
      <div>
        {movieData.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;