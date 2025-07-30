import React from 'react';

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const FilmCard = ({ film, onClick }) => {

  const imageUrl = film.poster_path
    ? `${TMDB_IMAGE_BASE_URL}${film.poster_path}`
    : ''; 

  return (
    <div
      className="flex-none w-48 mr-4 bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer"
      onClick={() => onClick(film)} 
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={film.title || film.name} 
          className="w-full h-72 object-cover"
        />
      ) : (
        <div className="w-full h-72 bg-gray-700 flex items-center justify-center text-gray-400 text-center">
          Nincs kép
        </div>
      )}
      <div className="p-3">
        <h3 className="text-lg font-semibold text-white truncate">{film.title || film.name}</h3>
        <p className="text-sm text-gray-400 mt-1">{film.vote_average ? `Értékelés: ${film.vote_average.toFixed(1)}` : ''}</p>
      </div>
    </div>
  );
};

export default FilmCard;