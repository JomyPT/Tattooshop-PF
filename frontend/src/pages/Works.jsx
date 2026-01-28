import { useNavigate } from "react-router-dom";
import "./Works.css";

const tattoos = [
  { src: "/portfolio/sergio-vilares/11.png", artist: "Sérgio Vilares", artistId: 1, slug: "sergio-vilares" },
  { src: "/portfolio/sergio-vilares/22.png", artist: "Sérgio Vilares", artistId: 1, slug: "sergio-vilares" },
  { src: "/portfolio/sergio-vilares/33.png", artist: "Sérgio Vilares", artistId: 1, slug: "sergio-vilares" },
  { src: "/portfolio/renato/111.png", artist: "Renato", artistId: 4, slug: "renato" },
  { src: "/portfolio/renato/222.png", artist: "Renato", artistId: 4, slug: "renato" },
  { src: "/portfolio/renato/333.png", artist: "Renato", artistId: 4, slug: "renato" },
  { src: "/portfolio/beatriz/1.png", artist: "Beatriz", artistId: 5, slug: "beatriz" },
  { src: "/portfolio/beatriz/2.png", artist: "Beatriz", artistId: 5, slug: "beatriz" },
  { src: "/portfolio/beatriz/3.png", artist: "Beatriz", artistId: 5, slug: "beatriz" }
];

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
