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
    <>

      <header className="fixed top-0 left-0 w-full bg-gradient-to-b from-black/70 to-transparent text-white px-6 py-4 z-50">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto relative">
          <Link to="/" className="flex items-center z-40 space-x-3">
            <img src={logo} alt="Netflix-logo" className="h-25 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link to="/" className="hover:text-gray-300 transition">Kezdőlap</Link>
            <Link to="/sorozatok" className="hover:text-gray-300 transition">Sorozatok</Link>
            <Link to="/filmek" className="hover:text-gray-300 transition">Filmek</Link>
            <Link to="/uj" className="hover:text-gray-300 transition">Újdonságok</Link>
            <Link to="/lista" className="hover:text-gray-300 transition">Saját listám</Link>
          </nav>

          <div className="flex items-center gap-4 text-lg z-40">
            <FaSearch className="cursor-pointer hidden md:inline" />
            <FaBell className="cursor-pointer hidden md:inline" />

            {/* Profil*/}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="bg-red-600 text-white rounded-full p-2 text-sm hover:bg-red-700 transition"
              >
                <FaUser />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-black text-white rounded shadow-lg text-sm overflow-hidden border border-gray-700 z-50">
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-700">Profilok kezelése</button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-700">Fiókom</button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-700">Súgóközpont</button>
                  <hr className="border-gray-600" />
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-700 text-red-400">Kijelentkezés</button>
                </div>
              )}
            </div>

            {/* Hamburger */}
            <button
              type="button"
              onClick={toggleMenu}
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-300 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <span className="sr-only">{menuOpen ? "Menü bezárása" : "Menü megnyitása"}</span>
              {menuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

   
      {menuOpen && (
        <>
          
          <div
            onClick={toggleMenu}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          ></div>

          {/* Slide-in jobb oldalról */}
          <aside className="fixed top-0 right-0 h-full w-64 bg-black/70 backdrop-blur-md shadow-lg z-50 transition-transform duration-300 translate-x-0">
            <div className="p-6 space-y-4 text-white font-medium text-sm">
              <Link
                to="/"
                onClick={toggleMenu}
                className="block px-3 py-2 rounded hover:bg-white/20 hover:backdrop-blur-sm hover:text-white transition"
              >
                Kezdőlap
              </Link>
              <Link
                to="/sorozatok"
                onClick={toggleMenu}
                className="block px-3 py-2 rounded hover:bg-white/20 hover:backdrop-blur-sm hover:text-white transition"
              >
                Sorozatok
              </Link>
              <Link
                to="/filmek"
                onClick={toggleMenu}
                className="block px-3 py-2 rounded hover:bg-white/20 hover:backdrop-blur-sm hover:text-white transition"
              >
                Filmek
              </Link>
              <Link
                to="/uj"
                onClick={toggleMenu}
                className="block px-3 py-2 rounded hover:bg-white/20 hover:backdrop-blur-sm hover:text-white transition"
              >
                Újdonságok
              </Link>
              <Link
                to="/lista"
                onClick={toggleMenu}
                className="block px-3 py-2 rounded hover:bg-white/20 hover:backdrop-blur-sm hover:text-white transition"
              >
                Saját listám
              </Link>
            </div>
          </aside>
        </>
      )}
    </>
  );
}

export default Navbar;
