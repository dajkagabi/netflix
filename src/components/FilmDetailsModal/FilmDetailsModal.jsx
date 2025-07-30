import React from 'react';

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

const FilmDetailsModal = ({ film, onClose }) => {
  if (!film) return null;

  const backdropUrl = film.backdrop_path
    ? `${TMDB_IMAGE_BASE_URL}${film.backdrop_path}`
    : '';
  const posterUrl = film.poster_path
    ? `${TMDB_IMAGE_BASE_URL}${film.poster_path}`
    : '';

  const genreNames = film.genreNames || [];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-gray-900 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-4xl hover:text-red-500 transition duration-300 z-20"
          aria-label="Bezárás"
        >
          &times;
        </button>

        {backdropUrl && (
          <img
            src={backdropUrl}
            alt={film.title || film.name}
            className="w-full max-h-[60vh] object-contain rounded-t-lg"
          />
        )}

        <div className="flex flex-col md:flex-row p-6 gap-6">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={film.title || film.name}
              className="w-40 md:w-48 h-auto rounded-md border-4 border-gray-800 shadow-lg flex-shrink-0"
            />
          ) : (
            <div className="w-40 md:w-48 h-60 bg-gray-700 flex items-center justify-center text-gray-400 rounded-md border-4 border-gray-800 shadow-lg flex-shrink-0">
              Nincs kép
            </div>
          )}

          <div className="flex-1 text-white">
            <h2 className="text-4xl font-bold mb-3">{film.title || film.name}</h2>

            <p className="text-gray-400 mb-1">
              {genreNames.length > 0 ? genreNames.join(', ') : 'Nincs műfaj'}
            </p>

            <p className="text-gray-300 mb-1">
              Értékelés: {film.vote_average ? film.vote_average.toFixed(1) : 'N/A'} / 10
            </p>

            <p className="text-gray-300 mb-4">
              Megjelenés éve: {film.release_date ? film.release_date.substring(0, 4) : 'N/A'}
            </p>

            <p className="leading-relaxed whitespace-pre-line">
              {film.overview || 'Nincs leírás elérhető.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmDetailsModal;