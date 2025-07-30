import React from 'react';

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const FilmDetailsModal = ({ movie, onClose }) => {
  if (!movie) return null;

  const backdropUrl = movie.backdrop_path ? `${TMDB_IMAGE_BASE_URL}${movie.backdrop_path}` : '';
  const posterUrl = movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : '';

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose} 
    >
      <div
        className="bg-gray-800 rounded-lg shadow-lg w-full max-w-3xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl hover:text-gray-400 transition-colors duration-200 z-10"
        >
          &times;
        </button>

        {backdropUrl && (
          <img
            src={backdropUrl}
            alt={movie.title || movie.name}
            className="w-full h-48 object-cover object-top"
          />
        )}

        <div className="p-6 text-white">
          <div className="flex -mt-24 mb-4">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={movie.title || movie.name}
                className="w-40 h-60 object-cover rounded-md border-4 border-gray-800 shadow-lg"
              />
            ) : (
              <div className="w-40 h-60 bg-gray-700 flex items-center justify-center text-gray-400 text-center rounded-md border-4 border-gray-800 shadow-lg">
                Nincs kép
              </div>
            )}
            <div className="ml-6 flex-1">
              <h2 className="text-4xl font-bold mb-2">{movie.title || movie.name}</h2>
              <p className="text-lg text-gray-400 mb-2">
                {movie.genre_ids && movie.genre_ids.length > 0
                  ? movie.genre_ids.join(', ') 
                  : 'Nincs műfaj'}
              </p>
              <p className="text-md text-gray-300">
                Értékelés: {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} / 10
              </p>
              <p className="text-md text-gray-300">
                Megjelenés éve: {movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}
              </p>
            </div>
          </div>
          
          <p className="text-lg leading-relaxed mt-4">{movie.overview || 'Nincs leírás elérhető.'}</p>
        </div>
      </div>
    </div>
  );
};

export default FilmDetailsModal;