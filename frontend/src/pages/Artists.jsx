import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./Artists.css";
import { initialArtists, initialPortfolios, initialTattoos } from '../config/mockData';

// Função para construir o objeto de artistas com seus portfolios e tatuagens
function buildArtistsWithPortfolios(artists, portfolios, tattoos) {
  return artists.map(artist => ({
    ...artist,
    nome: artist.name,
    foto: artist.image,
    portfolios: portfolios
      .filter(p => p.artistId === artist.id)
      .map(p => ({
        ...p,
        titulo: p.title,
        descricao: p.description,
        tattoos: tattoos
          .filter(t => t.portfolioId === p.id)
          .map(t => ({
            ...t,
            id: String(t.id),
            imageUrl: t.image,
            legenda: t.title,
            estilo: t.description || ""
          }))
      }))
  }));
}

export default function Artists() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedArtist, setSelectedArtist] = useState(null);
  const location = useLocation();
  const { artistSlug } = useParams();

  useEffect(() => {
    // Usar dados centralizados
    const mockArtists = buildArtistsWithPortfolios(initialArtists, initialPortfolios, initialTattoos);
    setArtists(mockArtists);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!artists.length) return;

    if (artistSlug) {
      const artist = artists.find(a => a.slug === artistSlug);
      if (artist) {
        setSelectedArtist(artist.id);
        window.scrollTo(0, 0);
        return;
      }
    }

    if (location.state?.selectedArtistId) {
      setSelectedArtist(location.state.selectedArtistId);
      window.scrollTo(0, 0);
    }
  }, [artistSlug, location.state, artists]);

  // Se um artista está selecionado, mostrar o portfólio dele
  if (selectedArtist) {
    const artist = artists.find(a => a.id === selectedArtist);
    if (!artist) return null;

    // Juntar todas as tatuagens de todos os portfolios
    const allTattoos = artist.portfolios?.flatMap(p => p.tattoos || []) || [];

    return (
      <section className="artists-section">
        <div className="portfolio-view">
          <button className="back-btn" onClick={() => setSelectedArtist(null)}>
            ← Voltar aos Artistas
          </button>
          
          <div className="portfolio-header">
            <div className="artist-info">
              {artist.foto && (
                <img src={artist.foto} alt={artist.nome} className="artist-photo" />
              )}
              <div>
                <h2>{artist.nome}</h2>
                <p>{artist.bio}</p>
              </div>
            </div>
          </div>

          {allTattoos.length > 0 ? (
            <div className="tattoos-gallery">
              {allTattoos.map((tattoo) => (
                <div className="tattoo-card" key={tattoo.id}>
                  <div className="tattoo-image">
                    {tattoo.imageUrl ? (
                      <img src={tattoo.imageUrl} alt={tattoo.legenda || "Tatuagem"} />
                    ) : (
                      <div className="tattoo-placeholder">🖼️</div>
                    )}
                  </div>
                  {(tattoo.legenda || tattoo.estilo) && (
                    <div className="tattoo-info">
                      {tattoo.legenda && <h4>{tattoo.legenda}</h4>}
                      {tattoo.estilo && <span className="tattoo-style">{tattoo.estilo}</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="no-tattoos">Este artista ainda não tem tatuagens no portfólio.</p>
          )}
        </div>
      </section>
    );
  }

  // Vista principal: lista de artistas
  return (
    <section className="artists-section">
      <h2>Os Nossos Artistas</h2>
      <p className="artists-subtitle">Conheça os portefólios e tatuagens do Vilares Vintage Tattoos</p>

      {loading && <p className="artists-status">A carregar artistas...</p>}
      {error && <p className="artists-status error">{error}</p>}

      {!loading && !error && (
        <div className="artists-grid">
          {artists.map((artist) => (
            <div className="artist-card" key={artist.id}>
              <div className="artist-image">
                {artist.foto ? (
                  <img src={artist.foto} alt={artist.nome} />
                ) : (
                  <div className="artist-placeholder">👤</div>
                )}
              </div>
              <div className="artist-content">
                <h3>{artist.nome}</h3>
                {artist.bio && <p className="artist-bio">{artist.bio}</p>}
                <button 
                  className="view-portfolio-btn"
                  onClick={() => setSelectedArtist(artist.id)}
                >
                  Ver Portfólio
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="artists-cta">
        <h3>Interessado em trabalhar connosco?</h3>
        <p>Estamos sempre à procura de novos talentos para juntar à nossa equipa.</p>
        <a href="/contacto" className="cta-button">Entre em Contacto</a>
      </div>
    </section>
  );
}
