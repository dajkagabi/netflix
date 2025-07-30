import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './components/Home/Home.jsx';
import Series from './components/Series/Series.jsx';
import Film from './components/Film/Film.jsx';
import Footer from './components/Footer/Footer.jsx'; 

function App() {
  return (
    <Router>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/sorozatok" element={<Series />} />
        <Route path="/filmek" element={<Film />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;