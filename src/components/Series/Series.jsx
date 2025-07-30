// src/components/Series.jsx
import React, { useState, useEffect } from 'react';
import SeriesCard from  '../SeriesCard/SeriesCard.jsx';
import SeriesDetailsModal from '../SeriesDetailsModal/SeriesDetailsModal.jsx';

const API_KEY = 'bbc3e7667feec0318a7b4ab40b629cdc';
const BASE_URL = 'https://api.themoviedb.org/3';

const Series = () => {
  const [genres, setGenres] = useState([]);
  const [seriesByCategory, setSeriesByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [genreMap, setGenreMap] = useState({});

  useEffect(() => {
    const fetchGenresAndSeries = async () => {
      try {
        const genresResponse = await fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=hu-HU`);
        if (!genresResponse.ok) {
          throw new Error(`HTTP hiba! Státusz: ${genresResponse.status}`);
        }
        const genresData = await genresResponse.json();
        setGenres(genresData.genres);

        const newGenreMap = {};
        genresData.genres.forEach(genre => {
          newGenreMap[genre.id] = genre.name;
        });
        setGenreMap(newGenreMap);

        const seriesDataPromises = genresData.genres.map(async (genre) => {
          const seriesResponse = await fetch(
            `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=hu-HU&sort_by=popularity.desc&with_genres=${genre.id}`
          );
          if (!seriesResponse.ok) {
            throw new Error(`HTTP hiba! Státusz: ${seriesResponse.status} a ${genre.name} műfajhoz`);
          }
          const series = await seriesResponse.json();
          return { genreId: genre.id, series: series.results.slice(0, 10) };
        });

        const allSeriesData = await Promise.all(seriesDataPromises);

        const categorizedSeries = {};
        allSeriesData.forEach(({ genreId, series }) => {
          categorizedSeries[genreId] = series;
        });
        setSeriesByCategory(categorizedSeries);

      } catch (err) {
        console.error('Hiba az adatok lekérése során:', err);
        setError('Nem sikerült betölteni a sorozatokat. Kérjük, próbálja újra később.');
      } finally {
        setLoading(false);
      }
    };

    fetchGenresAndSeries();
  }, []);

  const handleCardClick = (series) => {
    const genreNames = series.genre_ids ? series.genre_ids.map(id => genreMap[id]).filter(Boolean) : [];
    setSelectedSeries({ ...series, genre_ids: genreNames });
  };

  const handleCloseModal = () => {
    setSelectedSeries(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white text-2xl">
        Betöltés...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-red-500 text-2xl">
        Hiba: {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white pt-35 pb-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-10 text-center">Sorozatok kategóriák szerint</h1>

        {genres.map((genre) => (
          <div key={genre.id} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 ml-4">{genre.name}</h2>
            <div className="flex overflow-x-scroll no-scrollbar px-4 pb-4">
              {seriesByCategory[genre.id] && seriesByCategory[genre.id].length > 0 ? (
                seriesByCategory[genre.id].map((series) => (
                  <SeriesCard key={series.id} series={series} onClick={handleCardClick} />
                ))
              ) : (
                <p className="text-gray-400 ml-4">Nincsenek sorozatok ebben a kategóriában.</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedSeries && <SeriesDetailsModal series={selectedSeries} onClose={handleCloseModal} />}
    </div>
  );
};

export default Series;