import React, { useState, useEffect, useRef } from "react";
import FilmCard from "../FilmCard/FilmCard.jsx";
import FilmDetailsModal from "../FilmDetailsModal/FilmDetailsModal.jsx";

const API_KEY = "bbc3e7667feec0318a7b4ab40b629cdc";
const BASE_URL = "https://api.themoviedb.org/3";

const SCROLL_SPEED = 3; 
const SCROLL_INTERVAL = 20; 

const Film = () => {
  const [genres, setGenres] = useState([]);
  const [filmsByCategory, setFilmsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [genreMap, setGenreMap] = useState({});

  const scrollRefs = useRef({});
  const intervalsRef = useRef({}); 

  useEffect(() => {
    const fetchGenresAndFilms = async () => {
      try {
        const genresResponse = await fetch(
          `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=hu-HU`
        );
        if (!genresResponse.ok)
          throw new Error(`HTTP hiba! Státusz: ${genresResponse.status}`);
        const genresData = await genresResponse.json();
        setGenres(genresData.genres);

        const newGenreMap = {};
        genresData.genres.forEach((genre) => {
          newGenreMap[genre.id] = genre.name;
        });
        setGenreMap(newGenreMap);

        const filmDataPromises = genresData.genres.map(async (genre) => {
          const filmsResponse = await fetch(
            `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=hu-HU&sort_by=popularity.desc&with_genres=${genre.id}`
          );
          if (!filmsResponse.ok)
            throw new Error(
              `HTTP hiba! Státusz: ${filmsResponse.status} a ${genre.name} műfajhoz`
            );
          const films = await filmsResponse.json();
          return { genreId: genre.id, films: films.results.slice(0, 15) };
        });

        const allFilmsData = await Promise.all(filmDataPromises);

        const categorizedFilms = {};
        allFilmsData.forEach(({ genreId, films }) => {
          categorizedFilms[genreId] = films;
        });
        setFilmsByCategory(categorizedFilms);
      } catch (err) {
        console.error("Hiba az adatok lekérése során:", err);
        setError("Nem sikerült betölteni a filmeket. Kérjük, próbálja újra később.");
      } finally {
        setLoading(false);
      }
    };

    fetchGenresAndFilms();
  }, []);

  const handleSelectFilm = (film) => {
    const genreNames = film.genre_ids
      ? film.genre_ids.map((id) => genreMap[id]).filter(Boolean)
      : [];
    setSelectedFilm({ ...film, genre_ids: genreNames });
  };

  const handleCloseModal = () => setSelectedFilm(null);

  // Folymatos automatikus scroll beállítása (setInterval)
  useEffect(() => {
    // Csak akkor indítsd el, ha vannak filmek
    if (genres.length === 0) return;

    // Töröld az esetleges régi interval-eket
    Object.values(intervalsRef.current).forEach(clearInterval);
    intervalsRef.current = {};

    genres.forEach((genre) => {
      const container = scrollRefs.current[genre.id];
      if (!container) return;

      intervalsRef.current[genre.id] = setInterval(() => {
        // Ha elértük az scroll végét, ugorjunk vissza az elejére
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

    return () => {
      Object.values(intervalsRef.current).forEach(clearInterval);
    };
  }, [genres, filmsByCategory]);

  // Manuális görgetés nyilakkal
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
        intervalsRef.current[genreId] = setInterval(() => {
          if (
            container.scrollLeft >=
            container.scrollWidth - container.clientWidth - SCROLL_SPEED
          ) {
            container.scrollLeft = 0;
          } else {
            container.scrollLeft += SCROLL_SPEED;
          }
        }, SCROLL_INTERVAL);
      }
    }, 3000);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white text-2xl">
        Filmek betöltése...
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
        <h1 className="text-4xl font-bold mb-10 text-center">
          Filmek kategóriák szerint
        </h1>

        {genres.map((genre) => (
          <div key={genre.id} className="mb-8 relative">
            <h2 className="text-2xl font-semibold mb-4 ml-4">{genre.name}</h2>

            <button
              onClick={() => manualScroll(genre.id, "left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/60 text-white text-3xl p-2 rounded-r-lg hover:bg-opacity-75 transition z-10 hidden md:block"
              aria-label="Előző film"
            >
              &#8249;
            </button>

            <div
              ref={(el) => (scrollRefs.current[genre.id] = el)}
              className="flex overflow-x-scroll no-scrollbar px-4 pb-4 scroll-smooth space-x-4"
            >
              {filmsByCategory[genre.id]?.length > 0 ? (
                filmsByCategory[genre.id].map((film) => (
                  <FilmCard key={film.id} film={film} onClick={handleSelectFilm} />
                ))
              ) : (
                <p className="text-gray-400 ml-4">
                  Nincsenek filmek ebben a kategóriában.
                </p>
              )}
            </div>

            <button
              onClick={() => manualScroll(genre.id, "right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/60 text-white text-3xl p-2 rounded-l-lg hover:bg-opacity-75 transition z-10 hidden md:block"
              aria-label="Következő film"
            >
              &#8250;
            </button>
          </div>
        ))}
      </div>

      {selectedFilm && <FilmDetailsModal film={selectedFilm} onClose={handleCloseModal} />}
    </div>
  );
};

export default Film;
