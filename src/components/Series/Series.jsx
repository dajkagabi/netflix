import React, { useState, useEffect, useRef } from 'react';
import SeriesCard from '../SeriesCard/SeriesCard.jsx';
import SeriesDetailsModal from '../SeriesDetailsModal/SeriesDetailsModal.jsx';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const API_KEY = 'bbc3e7667feec0318a7b4ab40b629cdc';
const BASE_URL = 'https://api.themoviedb.org/3';

const Series = () => {
  const [genres, setGenres] = useState([]);
  const [seriesByCategory, setSeriesByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [genreMap, setGenreMap] = useState({});
  const scrollRefs = useRef({});
  const intervals = useRef({});

  useEffect(() => {
    const fetchGenresAndSeries = async () => {
      try {
        const genresRes = await fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=hu-HU`);
        const genresData = await genresRes.json();
        setGenres(genresData.genres);

        const genreNameMap = {};
        genresData.genres.forEach(genre => {
          genreNameMap[genre.id] = genre.name;
        });
        setGenreMap(genreNameMap);

        const promises = genresData.genres.map(async (genre) => {
          const res = await fetch(
            `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=hu-HU&sort_by=popularity.desc&with_genres=${genre.id}`
          );
          const data = await res.json();
          return { genreId: genre.id, series: data.results.slice(0, 12) };
        });

        const all = await Promise.all(promises);
        const categorized = {};
        all.forEach(({ genreId, series }) => {
          categorized[genreId] = series;
        });
        setSeriesByCategory(categorized);
      } catch (err) {
        console.error('Hiba:', err);
        setError('Nem sikerült betölteni az adatokat.');
      } finally {
        setLoading(false);
      }
    };

    fetchGenresAndSeries();
  }, []);

  useEffect(() => {
    genres.forEach((genre) => {
      const scroll = () => {
        const container = scrollRefs.current[genre.id];
        if (!container) return;
        const cardWidth = container.querySelector('.group')?.clientWidth || 160;
        const { scrollLeft, scrollWidth, clientWidth } = container;

        if (scrollLeft + clientWidth + cardWidth >= scrollWidth) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: cardWidth + 16, behavior: 'smooth' });
        }
      };

      clearInterval(intervals.current[genre.id]);
      intervals.current[genre.id] = setInterval(scroll, 3000);
    });

    return () => {
      Object.values(intervals.current).forEach(clearInterval);
    };
  }, [genres, seriesByCategory]);

  const handleCardClick = (series) => {
    const genreNames = series.genre_ids?.map(id => genreMap[id]) || [];
    setSelectedSeries({ ...series, genre_ids: genreNames });
  };

  const handleScroll = (genreId, direction) => {
    const container = scrollRefs.current[genreId];
    const cardWidth = container?.querySelector('.group')?.clientWidth || 160;
    container.scrollBy({
      left: direction === 'left' ? -(cardWidth + 16) * 2 : (cardWidth + 16) * 2,
      behavior: 'smooth',
    });

    clearInterval(intervals.current[genreId]);
    intervals.current[genreId] = setTimeout(() => {
      const scroll = () => {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        if (scrollLeft + clientWidth + cardWidth >= scrollWidth) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: cardWidth + 16, behavior: 'smooth' });
        }
      };
      intervals.current[genreId] = setInterval(scroll, 3000);
    }, 5000);
  };

  if (loading) return <div className="text-white p-8">Betöltés...</div>;
  if (error) return <div className="text-red-500 p-8">{error}</div>;

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-24 pb-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-10 text-center">Sorozatok kategóriák szerint</h1>

        {genres.map((genre) => (
          <div key={genre.id} className="mb-12 relative group">
            <h2 className="text-2xl font-semibold mb-4 ml-4">{genre.name}</h2>

            <div className="relative">
              <div
                ref={el => (scrollRefs.current[genre.id] = el)}
                className="flex overflow-x-scroll no-scrollbar space-x-4 scroll-smooth px-4"
              >
                {(seriesByCategory[genre.id] || []).map((series) => (
                  <SeriesCard key={series.id} series={series} onClick={handleCardClick} />
                ))}
              </div>

             
              <button
                onClick={() => handleScroll(genre.id, 'left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-80 text-white p-3 rounded-r-lg shadow-lg hidden group-hover:flex transition duration-300 z-10"
              >
                <FaChevronLeft />
              </button>

              
              <button
                onClick={() => handleScroll(genre.id, 'right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-80 text-white p-3 rounded-l-lg shadow-lg hidden group-hover:flex transition duration-300 z-10"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        ))}

        {selectedSeries && (
          <SeriesDetailsModal series={selectedSeries} onClose={() => setSelectedSeries(null)} />
        )}
      </div>
    </div>
  );
};

export default Series;
