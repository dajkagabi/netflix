import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";
import hero from "../../assets/hero-bg.jpg";

const Hero = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleMoreInfo = () => setShowMore(!showMore);

  return (
    <section className="relative h-auto min-h-[70vh] md:min-h-[85vh] w-full text-white overflow-hidden pt-20 md:pt-24">
      <img
        src={hero}
        alt="Hero háttér"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

      <div className="relative z-20 max-w-2xl px-6 md:px-12 lg:px-20 py-20 md:py-32">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Stranger Things
        </h1>

        <p className="text-sm md:text-base text-gray-200 mb-6 drop-shadow-md leading-relaxed transition-all duration-300 ease-in-out">
          Amikor a 12 éves Will Byers rejtélyesen eltűnik, barátai, családja és a helyi rendőrség elkezdi keresni.
        </p>

        {/* Bővebb leírás – animált megjelenés */}
        {showMore && (
          <div className="text-sm md:text-base text-gray-300 mb-6 leading-relaxed transition-all duration-500 ease-in-out">
            <p>
              A nyomozás során egy titokzatos, telekinetikus képességekkel rendelkező kislány, Tizenegy (Eleven) tűnik fel, aki elszökött egy titkos laborból.  
              A barátai segítségével Eleven megpróbálja elkerülni az üldözőit, miközben különös, másik dimenzióbeli lények fenyegetik Hawkins kisvárosát.  
              Egyre több sötét titokra derül fény — és a valóság már nem az, aminek tűnt.
            </p>
          </div>
        )}

        {/* Gombok */}
        <div className="flex gap-4 flex-wrap">
          <button className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-md font-semibold text-sm md:text-base hover:bg-gray-300 transition-colors">
            <FaPlay /> Lejátszás
          </button>
          <button
            onClick={toggleMoreInfo}
            className="flex items-center gap-2 bg-white/20 text-white px-6 py-2 rounded-md font-semibold text-sm md:text-base hover:bg-white/30 transition-colors"
          >
            <IoInformationCircleOutline className="text-xl md:text-2xl" />
            {showMore ? "Kevesebb infó" : "Több infó"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
