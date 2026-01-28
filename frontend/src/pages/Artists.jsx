import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./Artists.css";

// Dados mockados temporários
const mockArtists = [
  {
    id: 1,
    slug: "sergio-vilares",
    nome: "Sérgio Vilares",
    bio: "Especialista em tatuagens vintage e tradicionais com mais de 10 anos de experiência",
    foto: "",
    portfolios: [
      {
        id: 1,
        titulo: "Portefólio",
        descricao: "Tatuagens de Sérgio Vilares",
        tattoos: [
          { id: "s1", imageUrl: "/portfolio/sergio-vilares/11.png", legenda: "Tattoo 1", estilo: "" },
          { id: "s2", imageUrl: "/portfolio/sergio-vilares/22.png", legenda: "Tattoo 2", estilo: "" },
          { id: "s3", imageUrl: "/portfolio/sergio-vilares/33.png", legenda: "Tattoo 3", estilo: "" }
        ]
      }
    ]
  },
  {
    id: 4,
    slug: "renato",
    nome: "Renato",
    bio: "Portefólio atualizado com os últimos trabalhos do Renato.",
    foto: "",
    portfolios: [
      {
        id: 5,
        titulo: "Portefólio",
        descricao: "Tatuagens do Renato",
        tattoos: [
          { id: "r1", imageUrl: "/portfolio/renato/111.png", legenda: "Tattoo 1", estilo: "" },
          { id: "r2", imageUrl: "/portfolio/renato/222.png", legenda: "Tattoo 2", estilo: "" },
          { id: "r3", imageUrl: "/portfolio/renato/333.png", legenda: "Tattoo 3", estilo: "" }
        ]
      }
    ]
  },
  {
    id: 5,
    slug: "beatriz",
    nome: "Beatriz",
    bio: "Portefólio atualizado com os últimos trabalhos da Beatriz.",
    foto: "",
    portfolios: [
      {
        id: 6,
        titulo: "Portefólio",
        descricao: "Tatuagens da Beatriz",
        tattoos: [
          { id: "b1", imageUrl: "/portfolio/beatriz/1.png", legenda: "Tattoo 1", estilo: "" },
          { id: "b2", imageUrl: "/portfolio/beatriz/2.png", legenda: "Tattoo 2", estilo: "" },
          { id: "b3", imageUrl: "/portfolio/beatriz/3.png", legenda: "Tattoo 3", estilo: "" }
        ]
      }
    ]
  }
];

export default function Artists() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedArtist, setSelectedArtist] = useState(null);
  const location = useLocation();
  const { artistSlug } = useParams();

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        // Tentar buscar da API primeiro
        const res = await fetch("/api/artists");
        if (!res.ok) throw new Error("API indisponível");
        const data = await res.json();
        setArtists(data.slice(0, 3));
      } catch (err) {
        // Se falhar, usar dados mockados
        console.log("Usando dados mockados:", err.message);
        setArtists(mockArtists);
        setError(""); // Não mostrar erro se temos dados mockados
      } finally {
        setLoading(false);
      }
    };
    fetchArtists();
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

      // Se a API não devolver o slug, forçar fallback para mock e tentar de novo
      const mockMatch = mockArtists.find(a => a.slug === artistSlug);
      if (mockMatch && artists !== mockArtists) {
        setArtists(mockArtists);
        setSelectedArtist(mockMatch.id);
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
                <div className="artist-placeholder">👤</div>
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
