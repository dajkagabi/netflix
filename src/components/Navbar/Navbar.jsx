import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaBell, FaUser, FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/icons8-netflix-96.svg";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="absolute top-0 left-0 w-full bg-gradient-to-b from-black/70 to-transparent text-white px-6 py-4 flex justify-between items-center z-50">
      <Link to="/" className="text-red-600 font-extrabold text-2xl">
        <img src={logo} alt="Netflix-logo" className="h-15 w-auto" />
      </Link>

      {/* Asztali */}
      <nav className="hidden md:flex gap-6 text-sm items-center">
        <Link to="/">Kezdőlap</Link>
        <Link to="/sorozatok">Sorozatok</Link>
        <Link to="/filmek">Filmek</Link>
        <Link to="/uj">Újdonságok</Link>
        <Link to="/lista">Saját listám</Link>
      </nav>

      <div className="hidden md:flex items-center gap-4 text-lg">
        <FaSearch className="cursor-pointer" />
        <FaBell className="cursor-pointer" />

        {/* Profil */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="bg-red-600 text-white rounded-full p-2 text-sm hover:bg-red-700 transition"
          >
            <FaUser />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-black text-white rounded shadow-lg text-sm overflow-hidden border border-gray-700 z-50">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-700">
                Profilok kezelése
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-700">
                Fiókom
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-700">
                Súgóközpont
              </button>
              <hr className="border-gray-600" />
              <button className="w-full text-left px-4 py-2 hover:bg-gray-700 text-red-400">
                Kijelentkezés a Netflixből
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hamburger */}
      <button
        className="md:hidden text-xl"
        onClick={toggleMenu}
        aria-label="Menü"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobil */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black text-white flex flex-col gap-4 p-6 md:hidden shadow-lg z-40">
          <Link to="/" onClick={toggleMenu}>
            Kezdőlap
          </Link>
          <Link to="/sorozatok" onClick={toggleMenu}>
            Sorozatok
          </Link>
          <Link to="/filmek" onClick={toggleMenu}>
            Filmek
          </Link>
          <Link to="/uj" onClick={toggleMenu}>
            Újdonságok
          </Link>
          <Link to="/lista" onClick={toggleMenu}>
            Saját listám
          </Link>

          <div className="flex gap-4 pt-4 border-t border-gray-700 mt-4 text-lg">
            <FaSearch />
            <FaBell />
            <FaUser className="bg-red-600 rounded px-2 py-1" />
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;