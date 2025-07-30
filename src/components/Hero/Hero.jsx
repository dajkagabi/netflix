import React from "react";
import { FaPlay } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";
import hero from "../../assets/hero-bg.jpg"; 


const Hero = () => {
  return (
    <div className="relative h-[60vh] md:h-[80vh] bg-black flex items-end pb-10">
      <div className="absolute inset-0 w-full h-full bg-gray-700 flex items-center justify-center">
        <div className="text-gray-400 text-6xl">
          <img src={hero} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

      <div className="relative z-10 text-white p-4 md:p-8 lg:p-12 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Stranger Things
        </h1>
        <p className="text-base md:text-lg mb-8 drop-shadow-md">
         Amikor a 12 éves Will Byers rejtélyesen eltűnik, barátai, családja és a helyi rendőrség elkezdi keresni. A nyomozás során egy titokzatos, telekinetikus képességekkel rendelkező kislány, Tizenegy (Eleven) tűnik fel, aki elszökött egy helyi laborból.
        </p>
        <div className="flex space-x-4">
          <button className="flex items-center bg-white text-black px-6 py-2 rounded-md font-semibold text-lg hover:bg-gray-300 transition-colors">
            <FaPlay className="mr-2" /> Lejátszás
          </button>
          <button className="flex items-center bg-gray-600 text-white px-6 py-2 rounded-md font-semibold text-lg bg-opacity-70 hover:bg-opacity-90 transition-colors">
            <IoInformationCircleOutline className="mr-2 text-2xl" /> Több infó
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
