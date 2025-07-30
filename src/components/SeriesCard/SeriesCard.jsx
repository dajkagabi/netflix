import React from "react";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const SeriesCard = ({ series, onClick }) => {
  const imageUrl = series.poster_path
    ? `${TMDB_IMAGE_BASE_URL}${series.poster_path}`
    : "";

  return (
    <div
      className="flex-none w-48 mr-4 bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer"
      onClick={() => onClick(series)}
    >
      {imageUrl ? (
        <div className="relative w-full h-72">
          <img
            src={imageUrl}
            alt={series.title || series.name}
            className="w-full h-full object-cover"
          />
          
        </div>
      ) : (
        <div className="w-full h-72 bg-gray-700 flex items-center justify-center text-gray-400 text-center px-2">
          Nincs kép
        </div>
      )}

      <div className="p-3">
        <h3 className="text-base font-semibold text-white truncate">
          {series.title || series.name}
        </h3>
        <p className="text-sm text-gray-400 mt-1">
          {series.vote_average
            ? `Értékelés: ${series.vote_average.toFixed(1)}`
            : "Nincs értékelés"}
        </p>
      </div>
    </div>
  );
};

export default SeriesCard;
