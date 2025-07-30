import React, { useState, useEffect, useRef } from "react";
import SeriesCard from "../SeriesCard/SeriesCard.jsx";
import SeriesDetailsModal from "../SeriesDetailsModal/SeriesDetailsModal.jsx";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const API_KEY = "bbc3e7667feec0318a7b4ab40b629cdc";
const BASE_URL = "https://api.themoviedb.org/3";

const SCROLL_SPEED = 1.5; // pixel/iteráció
const SCROLL_INTERVAL = 16; // ms (kb. 60fps)

const Series = () => {
  const [genres, setGenres] = useState([]);
  const [seriesByCategory, setSeriesByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [genreMap, setGenreMap] = useState({});

  const scrollRefs = useRef({});
  const intervalsRef = useRef({});

  // Fetch műfajok és sorozatok
  useEffect(() => {
    const fetchGenresAndSeries = async () => {
      try {
        const genresRes = await fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=hu-HU`);
        if (!genresRes.ok) throw new Error(`HTTP hiba: ${genresRes.status}`);
        const genresData = await genresRes.json();
        setGenres(genresData.genres);

        const genreNameMap = {};
        genresData.genres.forEach((genre) => {
          genreNameMap[genre.id] = genre.name;
        });
        setGenreMap(genreNameMap);

        const promises = genresData.genres.map(async (genre) => {
          const res = await fetch(
            `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=hu-HU&sort_by=popularity.desc&with_genres=${genre.id}`
          );
          if (!res.ok) throw new Error(`HTTP hiba: ${res.status} műfaj: ${genre.name}`);
          const data = await res.json();
          return { genreId: genre.id, series: data.results.slice(0, 15) };
        });

        const all = await Promise.all(promises);
        const categorized = {};
        all.forEach(({ genreId, series }) => {
          categorized[genreId] = series;
        });
        setSeriesByCategory(categorized);
      } catch (err) {
        console.error(err);
        setError("Nem sikerült betölteni az adatokat.");
      } finally {
        setLoading(false);
      }
    };

    fetchGenresAndSeries();
  }, []);

  // Automatikus, folyamatos scroll - useEffect + setInterval
  useEffect(() => {
    if (genres.length === 0) return;

    // Töröljük a korábbi intervallumokat
    Object.values(intervalsRef.current).forEach(clearInterval);
    intervalsRef.current = {};

    genres.forEach((genre) => {
      const container = scrollRefs.current[genre.id];
      if (!container) return;

      intervalsRef.current[genre.id] = setInterval(() => {
        if (
          container.scrollLeft >=
          container.scrollWidth - container.clientWidth - SCROLL_SPEED
        ) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += SCROLL_SPEED;
        }
      }, SCROLL_INTERVAL);
    });

    // Cleanup
    return () => {
      Object.values(intervalsRef.current).forEach(clearInterval);
    };
  }, [genres, seriesByCategory]);

  // Kattintásra megállítja 3 másodpercre az automatikus scrollt, majd újraindul
  const manualScroll = (genreId, direction) => {
    const container = scrollRefs.current[genreId];
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });

    clearInterval(intervalsRef.current[genreId]);
    intervalsRef.current[genreId] = null;

    setTimeout(() => {
      if (!intervalsRef.current[genreId]) {
        const containerNew = scrollRefs.current[genreId];
        intervalsRef.current[genreId] = setInterval(() => {
          if (
            containerNew.scrollLeft >=
            containerNew.scrollWidth - containerNew.clientWidth - SCROLL_SPEED
          ) {
            containerNew.scrollLeft = 0;
          } else {
            containerNew.scrollLeft += SCROLL_SPEED;
          }
        }, SCROLL_INTERVAL);
      }
    }, 3000);
  };

  const handleCardClick = (series) => {
    const genreNames = series.genre_ids?.map((id) => genreMap[id]) || [];
    setSelectedSeries({ ...series, genre_ids: genreNames });
  };

  const handleCloseModal = () => setSelectedSeries(null);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white text-2xl">
        Betöltés...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-red-500 text-2xl">
        Hiba: {error}
      </div>
    );

  return (
    <div className="bg-gray-900 min-h-screen text-white pt-50 pb-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-10 text-center">Sorozatok kategóriák szerint</h1>

        {genres.map((genre) => (
          <div key={genre.id} className="mb-10 relative group">
            <h2 className="text-2xl font-semibold mb-4 ml-4">{genre.name}</h2>

            <button
              onClick={() => manualScroll(genre.id, "left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-80 text-white p-3 rounded-r-lg shadow-lg hidden group-hover:flex transition duration-300 z-10"
              aria-label="Előző sorozat"
            >
              <FaChevronLeft />
            </button>

            <div
              ref={(el) => (scrollRefs.current[genre.id] = el)}
              className="flex overflow-x-scroll no-scrollbar space-x-4 scroll-smooth px-4"
            >
              {(seriesByCategory[genre.id] || []).map((series) => (
                <SeriesCard key={series.id} series={series} onClick={handleCardClick} />
              ))}
            </div>

            <button
              onClick={() => manualScroll(genre.id, "right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-80 text-white p-3 rounded-l-lg shadow-lg hidden group-hover:flex transition duration-300 z-10"
              aria-label="Következő sorozat"
            >
              <FaChevronRight />
            </button>
          </div>
        ))}

        {selectedSeries && (
          <SeriesDetailsModal series={selectedSeries} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
};

export default Series;
