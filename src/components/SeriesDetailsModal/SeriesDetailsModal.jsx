import React from 'react';

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w780';

const SeriesDetailsModal = ({ series, onClose }) => {
  if (!series) return null;

  const imageUrl = series.backdrop_path
    ? `${TMDB_IMAGE_BASE_URL}${series.backdrop_path}`
    : series.poster_path
    ? `${TMDB_IMAGE_BASE_URL}${series.poster_path}`
    : 'https://via.placeholder.com/780x439?text=Nincs+kép';

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 text-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bezáró gomb */}
        <button
          className="absolute top-3 right-3 text-white text-2xl bg-black/50 hover:bg-black/80 rounded-full w-10 h-10 flex items-center justify-center z-10"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Nagyobb kép */}
        <img
          src={imageUrl}
          alt={series.title || series.name}
          className="w-full h-[300px] md:h-[400px] object-cover rounded-t-lg"
        />

        {/* Tartalom */}
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-2">{series.title || series.name}</h2>
          <p className="text-sm text-gray-400 mb-4">
            {series.first_air_date ? `Első adás: ${series.first_air_date}` : ''}
            {series.vote_average && ` | Értékelés: ${series.vote_average.toFixed(1)}/10`}
          </p>
          <p className="text-gray-300 leading-relaxed mb-4 text-base">
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
