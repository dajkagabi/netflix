// src/components/SeriesDetailsModal.jsx
import React from 'react';

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

const SeriesDetailsModal = ({ series, onClose }) => {
  if (!series) {
    return null;
  }

  const imageUrl = series.backdrop_path
    ? `${TMDB_IMAGE_BASE_URL}${series.backdrop_path}`
    : series.poster_path
    ? `${TMDB_IMAGE_BASE_URL}${series.poster_path}`
    : 'https://via.placeholder.com/1280x720?text=No+Image';

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-lg shadow-2xl max-w-4xl w-full mx-auto overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative h-64 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white text-3xl font-bold bg-gray-900 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
            aria-label="Bezár"
          >
            &times;
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-3xl font-bold text-white mb-3">{series.title || series.name}</h2>
          <p className="text-gray-400 text-sm mb-4">
            {series.first_air_date ? `Első adás: ${series.first_air_date.substring(0, 4)}` : ''}
            {series.vote_average ? ` | Értékelés: ${series.vote_average.toFixed(1)}/10` : ''}
          </p>
          <p className="text-gray-300 text-base leading-relaxed mb-4">
            {series.overview || 'Nincs leírás elérhető.'}
          </p>
          {series.genre_ids && series.genre_ids.length > 0 && (
            <p className="text-gray-400 text-sm">
              Műfajok: {series.genre_ids.join(', ')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeriesDetailsModal;