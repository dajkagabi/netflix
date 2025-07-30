import React, { useState } from "react"; 
import Hero from "../Hero/Hero";
import MovieRow from "../MovieRow/MovieRow";
import MovieDetailsModal from '../MovieDetailsModal/MovieDetailsModal.jsx'; 

const Home = () => {
  const [selectedMovie, setSelectedMovie] = useState(null); 

  // Függvény a modális ablak megnyitásához
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    //Megakadályozhatjuk a görgetést, amíg a modal nyitva van
    document.body.style.overflow = 'hidden'; 
  };

  // Függvény a modális ablak bezárásához
  const handleCloseModal = () => {
    setSelectedMovie(null);
    document.body.style.overflow = 'unset'; // Visszaállítjuk a görgetést
  };

  return (
    <div className="bg-black min-h-screen">
      <Hero />

      <div className="pt-24 md:pt-32">
        {/* A onMovieClick prop  */}
        <MovieRow
          title="Felkapott most"
          fetchUrl="/trending/all/week"
          autoScroll={true}
          scrollInterval={6000}
          onMovieClick={handleMovieClick} 
        />
        <MovieRow
          title="Akció és Kaland"
          fetchUrl="/discover/movie?with_genres=28"
          autoScroll={true}
          scrollInterval={6000}
          onMovieClick={handleMovieClick} 
        />
        <MovieRow
          title="Vígjátékok"
          fetchUrl="/discover/movie?with_genres=35"
          autoScroll={true}
          scrollInterval={6000}
          onMovieClick={handleMovieClick} 
        />
        <MovieRow
          title="Horror"
          fetchUrl="/discover/movie?with_genres=27"
          autoScroll={true}
          scrollInterval={6000}
          onMovieClick={handleMovieClick} 
        />
        <MovieRow
          title="Sci-Fi"
          fetchUrl="/discover/movie?with_genres=878"
          autoScroll={true}
          scrollInterval={6000}
          onMovieClick={handleMovieClick} 
        />
        <MovieRow
          title="Romantikus"
          fetchUrl="/discover/movie?with_genres=10749"
          autoScroll={true}
          scrollInterval={6000}
          onMovieClick={handleMovieClick} 
        />
      </div>

      {/*Modális ablak*/}
      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Home;