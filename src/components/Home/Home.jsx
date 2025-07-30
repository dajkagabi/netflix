import React from "react";
import Hero from "../Hero/Hero";
import MovieRow from "../MovieRow/MovieRow";

const Home = () => {
  return (
    <div className="bg-black min-h-screen">
      <Hero />

      <div className="pt-24 md:pt-32">
        <MovieRow title="Felkapott most" fetchUrl="/trending/all/week" autoScroll={true} scrollInterval={6000} />
        <MovieRow
          title="Akció és Kaland"
          fetchUrl="/discover/movie?with_genres=28"
          autoScroll={true} scrollInterval={6000}
        />
        <MovieRow
          title="Vígjátékok"
          fetchUrl="/discover/movie?with_genres=35"
          autoScroll={true} scrollInterval={6000}
        />
        <MovieRow title="Horror" fetchUrl="/discover/movie?with_genres=27" autoScroll={true} scrollInterval={6000} />
        <MovieRow title="Sci-Fi" fetchUrl="/discover/movie?with_genres=878" autoScroll={true} scrollInterval={6000} />
        <MovieRow
          title="Romantikus"
          fetchUrl="/discover/movie?with_genres=10749"
          autoScroll={true} scrollInterval={6000}
        />
      </div>
    </div>
  );
};

export default Home;
