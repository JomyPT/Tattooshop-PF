import "./Hero.css";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">
      {/* dark overlay for text contrast */}
      <div className="overlay" aria-hidden="true"></div>

      {/* hero text + buttons */}
      <div className="content">
        <h1>
          VILARES VINTAGE<br />
          TATTOOS
        </h1>
        <div className="actions">
          <Link to="/trabalhos" className="btn btn-primary">Ver Trabalhos</Link>
          <Link to="/agendamento" className="btn btn-secondary">Agendar</Link>
        </div>
      </div>
    </section>
  );
}
