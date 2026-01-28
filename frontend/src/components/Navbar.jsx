import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="logo">
        <span>Vilares</span>VintageTattoos
      </Link>

      <nav>
        <Link to="/">Início</Link>
        <Link to="/artistas">Artistas</Link>
        <Link to="/trabalhos">Trabalhos</Link>
        <Link to="/contacto">Contacto</Link>
      </nav>

      <Link to="/agendamento" className="btn-agendar">Agendar</Link>
    </header>
  );
}
