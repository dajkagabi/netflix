import React from "react";
import { FaPlay, FaPlus, FaThumbsUp, FaTimes } from "react-icons/fa";

const IMAGE_BASE_URL_BACKDROP = "https://image.tmdb.org/t/p/original";
const IMAGE_BASE_URL_POSTER = "https://image.tmdb.org/t/p/w500";

// Ha nincs film kiválasztva, ne jelenjen meg semmi
const MovieDetailsModal = ({ movie, onClose }) => {
  if (!movie) return null;

  const getRatingColor = (rating) => {
    if (rating >= 7) return "text-green-500";
    if (rating >= 5) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[9999] p-4">
      <div className="relative bg-zinc-900 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar-modal">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white bg-zinc-800 hover:bg-zinc-700 rounded-full p-2 z-10"
        >
          <FaTimes className="text-xl" />
        </button>

        <div
          className="relative h-64 md:h-80 bg-cover bg-center rounded-t-lg"
          style={{
            backgroundImage: `url(${
              movie.backdrop_path
                ? IMAGE_BASE_URL_BACKDROP + movie.backdrop_path
                : IMAGE_BASE_URL_POSTER + movie.poster_path
            })`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
              {movie.title || movie.name}
            </h2>
          </div>
        </div>

        {/* Tartalom */}
        <div className="p-4 md:p-6 text-white flex flex-col md:flex-row gap-4 md:gap-6">
          <div className="flex-1">
            <div className="flex items-center text-lg mb-3">
              <span
                className={`${getRatingColor(
                  movie.vote_average
                )} font-semibold mr-3`}
              >
                {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}{" "}
                Pont
              </span>
              <span className="text-gray-400">
                {movie.release_date
                  ? movie.release_date.substring(0, 4)
                  : movie.first_air_date
                  ? movie.first_air_date.substring(0, 4)
                  : "N/A"}
              </span>
            </div>
            <p className="text-gray-300 text-base md:text-lg mb-6">
              {movie.overview || "Nincs leírás elérhető."}
            </p>
            <div className="flex space-x-3 mt-auto">
              <button className="flex items-center bg-white text-black px-5 py-2 rounded-md font-semibold text-base hover:bg-gray-300 transition-colors">
                <FaPlay className="mr-2" /> Lejátszás
              </button>
              <button className="border border-gray-500 text-white rounded-full p-3 hover:border-white transition-colors">
                <FaPlus className="text-base" />
              </button>
              <button className="border border-gray-500 text-white rounded-full p-3 hover:border-white transition-colors">
                <FaThumbsUp className="text-base" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;
