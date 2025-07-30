import React from "react";
import { FaPlay } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";
import hero from "../../assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative h-[70vh] md:h-[85vh] w-full text-white overflow-hidden pt-20 md:pt-24">
      {/* Háttérkép */}
      <img
        src={hero}
        alt="Hero háttér"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />

      {/* Sötét overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

      {/* Tartalom */}
      <div className="relative z-20 flex flex-col justify-end h-full max-w-2xl px-6 md:px-12 lg:px-20 pb-10 md:pb-32">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Stranger Things
          </h1>
          <p className="text-sm md:text-base text-gray-200 mb-6 drop-shadow-md leading-relaxed max-w-prose">
            Amikor a 12 éves Will Byers rejtélyesen eltűnik, barátai, családja és a helyi rendőrség elkezdi keresni. A nyomozás során egy titokzatos, telekinetikus képességekkel rendelkező kislány, Tizenegy (Eleven) tűnik fel, aki elszökött egy helyi laborból.
          </p>
        </div>

        {/* Gombok - mindig látható */}
        <div className="flex gap-4 flex-wrap">
          <button className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-md font-semibold text-sm md:text-base hover:bg-gray-300 transition-colors">
            <FaPlay /> Lejátszás
          </button>
          <button className="flex items-center gap-2 bg-white/20 text-white px-6 py-2 rounded-md font-semibold text-sm md:text-base hover:bg-white/30 transition-colors">
            <IoInformationCircleOutline className="text-xl md:text-2xl" /> Több infó
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
