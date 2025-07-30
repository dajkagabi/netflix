import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MovieCard from '../MovieCard/MovieCard.jsx';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const API_KEY = "bbc3e7667feec0318a7b4ab40b629cdc";
const BASE_URL = "https://api.themoviedb.org/3";

const MovieRow = ({ title, fetchUrl, autoScroll = false, scrollInterval = 5000 }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);
  const intervalId = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}${fetchUrl}`, {
          params: { api_key: API_KEY, language: 'hu-HU' }
        });
        setMovies(res.data.results);
      } catch  {
        setError("Nem sikerült lekérni az adatokat.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [fetchUrl]);

  useEffect(() => {
    if (autoScroll && scrollRef.current && movies.length > 0) {
      const scrollContainer = scrollRef.current;
      const scrollNext = () => {
        const { scrollLeft, clientWidth, scrollWidth } = scrollContainer;
        const cardWidth = scrollContainer.querySelector('.group')?.clientWidth || 288;

        if (scrollLeft + clientWidth + cardWidth >= scrollWidth) {
          scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollContainer.scrollBy({ left: cardWidth + 16, behavior: 'smooth' });
        }
      };

      intervalId.current = setInterval(scrollNext, scrollInterval);

      return () => clearInterval(intervalId.current);
    }
  }, [autoScroll, movies, scrollInterval]);

  const manualScroll = (direction) => {
    const scrollContainer = scrollRef.current;
    const cardWidth = scrollContainer.querySelector('.group')?.clientWidth || 288;

    scrollContainer.scrollBy({
      left: direction === 'left' ? -(cardWidth + 16) * 2 : (cardWidth + 16) * 2,
      behavior: 'smooth'
    });

    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };

  if (loading) return <div className="text-white p-4">Betöltés...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="mb-12 px-4 md:px-8 lg:px-16 relative">
      <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">{title}</h2>
      <div className="relative group">
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-scroll no-scrollbar scroll-smooth"
        >
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* Nyilak */}
        <button
          onClick={() => manualScroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 
                     bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-3 rounded-r-lg 
                     shadow-lg hidden group-hover:flex transition duration-300 z-50"
        >
          <FaChevronLeft className="text-xl" />
        </button>
        <button
          onClick={() => manualScroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 
                     bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-3 rounded-l-lg 
                     shadow-lg hidden group-hover:flex transition duration-300 z-50"
        >
          <FaChevronRight className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default MovieRow;
