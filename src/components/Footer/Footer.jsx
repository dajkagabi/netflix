import React from 'react';
import { Link } from 'react-router-dom'; // Importáljuk a Link komponenst
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-10 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex space-x-6 mb-8 text-2xl">
          {/* Közösségi média ikonokhoz továbbra is <a> taget használunk külső linkekhez */}
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <FaFacebookF />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <FaInstagram />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <FaTwitter />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <FaYoutube />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-8">
          <div>
            <ul>
              <li className="mb-2"><Link to="/audio-description" className="hover:underline">Hangos leírás</Link></li>
              <li className="mb-2"><Link to="/help-center" className="hover:underline">Súgó</Link></li>
              <li className="mb-2"><Link to="/gift-cards" className="hover:underline">Ajándékkártyák</Link></li>
              <li className="mb-2"><Link to="/media-center" className="hover:underline">Média központ</Link></li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="mb-2"><Link to="/investor-relations" className="hover:underline">Befektetői kapcsolatok</Link></li>
              <li className="mb-2"><Link to="/jobs" className="hover:underline">Állás</Link></li>
              <li className="mb-2"><Link to="/terms-of-use" className="hover:underline">Felhasználási feltételek</Link></li>
              <li className="mb-2"><Link to="/privacy" className="hover:underline">Adatvédelem</Link></li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="mb-2"><Link to="/legal-notices" className="hover:underline">Jogi nyilatkozatok</Link></li>
              <li className="mb-2"><Link to="/cookie-preferences" className="hover:underline">Süti beállítások</Link></li>
              <li className="mb-2"><Link to="/corporate-information" className="hover:underline">Vállalati információk</Link></li>
              <li className="mb-2"><Link to="/contact-us" className="hover:underline">Kapcsolat</Link></li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="mb-2"><Link to="/account" className="hover:underline">Fiók</Link></li>
              <li className="mb-2"><Link to="/redeem-gift-cards" className="hover:underline">Ajándékkártyák beváltása</Link></li>
              <li className="mb-2"><Link to="/buy-gift-cards" className="hover:underline">Ajándékkártyák vásárlása</Link></li>
              <li className="mb-2"><Link to="/ways-to-watch" className="hover:underline">Megtekintési módok</Link></li>
            </ul>
          </div>
        </div>

        <button className="border border-gray-500 text-gray-400 px-3 py-2 text-sm mb-8 hover:text-white hover:border-white transition-colors">
          Szolgáltatási kód
        </button>

        <p className="text-xs text-gray-500">
          © 2024 Netflix Klón. Ez egy demo projekt.
        </p>
      </div>
    </footer>
  );
};

export default Footer;