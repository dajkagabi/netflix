import React, { useState } from 'react';
import { FaPlay, FaPlus, FaThumbsUp, FaChevronDown } from 'react-icons/fa';

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);


  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w342"; 

  const placeholderImage = "https://via.placeholder.com/200x300?text=Kép+Nincs"; 

  const getRatingColor = (rating) => {
    if (rating >= 7) return 'text-green-500';
    if (rating >= 5) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div
   
      className="relative flex-none w-40 md:w-48 lg:w-56 cursor-pointer 
                 transform hover:scale-110 transition-transform duration-300 ease-out 
                 z-20 hover:z-30 group overflow-hidden rounded-md shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ minWidth: '160px', aspectRatio: '2 / 3' }} 
    >
      <img
        src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : placeholderImage}
        alt={movie.title || movie.name}
        className="w-full h-full object-cover" 
      />

      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-90 rounded-md 
                        flex flex-col justify-between p-3 opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300 ease-in-out">
          <div>
            <h3 className="text-white text-md md:text-lg font-bold mb-1">
              {movie.title || movie.name}
            </h3>
            <div className="flex items-center text-sm md:text-base mb-2">
              <span className={`${getRatingColor(movie.vote_average)} font-semibold mr-2`}>
                {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
              </span>
              <span className="text-gray-400">
                {movie.release_date ? movie.release_date.substring(0, 4) : (movie.first_air_date ? movie.first_air_date.substring(0, 4) : 'N/A')}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-auto">
            <div className="flex space-x-2">
              <button className="bg-white text-black rounded-full p-2 hover:bg-gray-300 transition-colors">
                <FaPlay className="text-base md:text-lg" />
              </button>
              <button className="border border-gray-500 text-white rounded-full p-2 hover:border-white transition-colors">
                <FaPlus className="text-base md:text-lg" />
              </button>
              <button className="border border-gray-500 text-white rounded-full p-2 hover:border-white transition-colors">
                <FaThumbsUp className="text-base md:text-lg" />
              </button>
            </div>
            <button className="border border-gray-500 text-white rounded-full p-2 hover:border-white transition-colors">
              <FaChevronDown className="text-base md:text-lg" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;