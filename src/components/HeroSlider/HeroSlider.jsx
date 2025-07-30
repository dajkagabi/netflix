//Series tartozik csak elbasztam

import React, { useState, useEffect } from 'react';

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
const API_KEY = 'bbc3e7667feec0318a7b4ab40b629cdc';
const BASE_URL = 'https://api.themoviedb.org/3';

const HeroSlider = ({ onSelectSeries }) => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=hu-HU`
        );
        if (!response.ok) {
          throw new Error(`HTTP hiba! Státusz: ${response.status}`);
        }
        const data = await response.json();
        setMovies(data.results.filter(movie => movie.backdrop_path).slice(0, 5));
      } catch (err) {
        console.error('Hiba a népszerű sorozatok lekérése során:', err);
        setError('Nem sikerült betölteni a kiemelt sorozatokat.');
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
      }, 5000); // 5 másodpercenként vált

      return () => clearInterval(interval);
    }
  }, [movies, currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 bg-gray-900 text-white text-2xl">
        Kiemelt sorozatok betöltése...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-96 bg-gray-900 text-red-500 text-2xl">
        Hiba: {error}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="flex justify-center items-center h-96 bg-gray-900 text-gray-400 text-xl">
        Nincsenek kiemelt sorozatok.
      </div>
    );
  }

  const currentMovie = movies[currentIndex];
  const backgroundImageUrl = `${TMDB_IMAGE_BASE_URL}${currentMovie.backdrop_path}`;

  return (
    <div
      className="relative h-[60vh] bg-cover bg-center transition-opacity duration-1000 ease-in-out"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-transparent"></div>

      <button
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white text-4xl p-2 rounded-r-lg hover:bg-opacity-75 transition-opacity duration-300 z-10"
        aria-label="Előző"
      >
        &#8249; 
      </button>
      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white text-4xl p-2 rounded-l-lg hover:bg-opacity-75 transition-opacity duration-300 z-10"
        aria-label="Következő"
      >
        &#8250; 
      </button>

      <div className="absolute bottom-0 left-0 p-8 text-white max-w-xl">
        <h2 className="text-5xl font-bold mb-4">
          {currentMovie.title || currentMovie.name}
        </h2>
        <p className="text-lg mb-6 line-clamp-3">
          {currentMovie.overview || 'Nincs leírás elérhető.'}
        </p>
        <button
          onClick={() => onSelectSeries(currentMovie)}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300"
        >
          Részletek
        </button>
      </div>

      <div className="absolute bottom-4 right-4 flex space-x-2">
        {movies.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-white' : 'bg-gray-500'
            } focus:outline-none`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ugrás a ${index + 1}. sorozatra`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;