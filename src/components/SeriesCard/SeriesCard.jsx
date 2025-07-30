// src/components/SeriesCard.jsx
import React from 'react';

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const SeriesCard = ({ series, onClick }) => {
  const imageUrl = series.poster_path
    ? `${TMDB_IMAGE_BASE_URL}${series.poster_path}`
    : 'https://via.placeholder.com/200x300?text=No+Image';

  return (
    <div
      className="flex-none w-48 mr-4 bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer"
      onClick={() => onClick(series)}
    >
      <img
        src={imageUrl}
        alt={series.title || series.name}
        className="w-full h-72 object-cover"
      />
      <div className="p-3">
        <h3 className="text-lg font-semibold text-white truncate">{series.title || series.name}</h3>
        <p className="text-sm text-gray-400 mt-1">{series.vote_average ? `Értékelés: ${series.vote_average.toFixed(1)}` : ''}</p>
      </div>
    </div>
  );
};

export default SeriesCard;