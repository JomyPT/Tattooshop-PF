import { useNavigate } from "react-router-dom";
import "./Works.css";
import { initialArtists, initialPortfolios, initialTattoos } from '../config/mockData';

// Construir lista de tatuagens com informações do artista
const buildTattoosList = () => {
  return initialTattoos.map(tattoo => {
    const portfolio = initialPortfolios.find(p => p.id === tattoo.portfolioId);
    const artist = initialArtists.find(a => a.id === portfolio?.artistId);
    return {
      ...tattoo,
      src: tattoo.image,
      artist: artist?.name || 'Desconhecido',
      artistId: artist?.id,
      slug: artist?.slug
    };
  });
};

const tattoos = buildTattoosList();

export default function Works() {
  const navigate = useNavigate();

  const handleCardClick = (slug) => {
    navigate(`/artistas/${slug}`);
  };

  return (
    <section className="works-section">
      <div className="works-container">
        <h2>Trabalhos Recentes</h2>
        <p className="works-subtitle">Conheça os portefólios e tatuagens do Vilares Vintage Tattoos</p>

        <div className="works-gallery">
          {tattoos.map((tattoo, idx) => (
            <div 
              className="work-card" 
              key={idx}
              onClick={() => handleCardClick(tattoo.slug)}
            >
              <div className="work-image">
                <img src={tattoo.src} alt={`Tatuagem por ${tattoo.artist}`} />
              </div>
              <div className="work-info">
                <span className="work-artist">feito por {tattoo.artist}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
