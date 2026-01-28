import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <Link to="/" className="logo" onClick={closeMenu}>
        <span>Vilares</span>VintageTattoos
      </Link>

      <button className="hamburger" onClick={toggleMenu} aria-label="Menu">
        <span className={menuOpen ? "open" : ""}></span>
        <span className={menuOpen ? "open" : ""}></span>
        <span className={menuOpen ? "open" : ""}></span>
      </button>

      <nav className={`nav-menu ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={closeMenu}>Início</Link>
        <Link to="/artistas" onClick={closeMenu}>Artistas</Link>
        <Link to="/trabalhos" onClick={closeMenu}>Trabalhos</Link>
        <Link to="/contacto" onClick={closeMenu}>Contacto</Link>
      </nav>

      <Link to="/agendamento" className={`btn-agendar ${menuOpen ? "hidden" : ""}`} onClick={closeMenu}>Agendar</Link>
    </header>
  );
}
