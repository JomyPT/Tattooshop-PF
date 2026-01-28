import { useState } from 'react';
import './Admin.css';

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('artists');

  // Estados para artistas
  const [artists, setArtists] = useState([
    { id: 1, name: 'Sérgio Vilares', bio: 'Especialista em tatuagens tradicionais com mais de 15 anos de experiência.', image: '/portfolio/sergio-vilares/profile.jpg' },
    { id: 2, name: 'Renato', bio: 'Focado em realismo e trabalhos em preto e cinza.', image: '/portfolio/renato/profile.jpg' },
    { id: 3, name: 'Beatriz', bio: 'Especializada em tatuagens delicadas e traços finos.', image: '/portfolio/beatriz/profile.jpg' }
  ]);
  const [newArtist, setNewArtist] = useState({ name: '', bio: '', image: '' });
  const [editingArtist, setEditingArtist] = useState(null);

  // Estados para portfolios
  const [portfolios, setPortfolios] = useState([
    { id: 1, artistId: 1, title: 'Traditional', description: 'Tatuagens tradicionais' }
  ]);
  const [newPortfolio, setNewPortfolio] = useState({ artistId: '', title: '', description: '' });
  const [editingPortfolio, setEditingPortfolio] = useState(null);

  // Estados para tatuagens
  const [tattoos, setTattoos] = useState([
    { id: 1, portfolioId: 1, title: 'Rosa Tradicional', image: '', description: 'Rosa vermelha estilo tradicional' }
  ]);
  const [newTattoo, setNewTattoo] = useState({ portfolioId: '', title: '', image: '', description: '' });
  const [editingTattoo, setEditingTattoo] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Credenciais inválidas');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  // Funções para artistas
  const handleAddArtist = (e) => {
    e.preventDefault();
    if (newArtist.name && newArtist.bio) {
      setArtists([...artists, { ...newArtist, id: Date.now() }]);
      setNewArtist({ name: '', bio: '', image: '' });
    }
  };

  const handleUpdateArtist = (e) => {
    e.preventDefault();
    if (editingArtist.name && editingArtist.bio) {
      setArtists(artists.map(a => a.id === editingArtist.id ? editingArtist : a));
      setEditingArtist(null);
      setNewArtist({ name: '', bio: '', image: '' });
    }
  };

  const handleDeleteArtist = (id) => {
    if (confirm('Tem certeza que deseja eliminar este artista?')) {
      setArtists(artists.filter(a => a.id !== id));
    }
  };

  // Funções para portfolios
  const handleAddPortfolio = (e) => {
    e.preventDefault();
    if (newPortfolio.artistId && newPortfolio.title) {
      setPortfolios([...portfolios, { ...newPortfolio, id: Date.now() }]);
      setNewPortfolio({ artistId: '', title: '', description: '' });
    }
  };

  const handleUpdatePortfolio = (e) => {
    e.preventDefault();
    if (editingPortfolio.artistId && editingPortfolio.title) {
      setPortfolios(portfolios.map(p => p.id === editingPortfolio.id ? editingPortfolio : p));
      setEditingPortfolio(null);
      setNewPortfolio({ artistId: '', title: '', description: '' });
    }
  };

  const handleDeletePortfolio = (id) => {
    if (confirm('Tem certeza que deseja eliminar este portfolio?')) {
      setPortfolios(portfolios.filter(p => p.id !== id));
    }
  };

  // Funções para tatuagens
  const handleAddTattoo = (e) => {
    e.preventDefault();
    if (newTattoo.portfolioId && newTattoo.title && newTattoo.image) {
      setTattoos([...tattoos, { ...newTattoo, id: Date.now() }]);
      setNewTattoo({ portfolioId: '', title: '', image: '', description: '' });
    }
  };

  const handleUpdateTattoo = (e) => {
    e.preventDefault();
    if (editingTattoo.portfolioId && editingTattoo.title && editingTattoo.image) {
      setTattoos(tattoos.map(t => t.id === editingTattoo.id ? editingTattoo : t));
      setEditingTattoo(null);
      setNewTattoo({ portfolioId: '', title: '', image: '', description: '' });
    }
  };

  const handleDeleteTattoo = (id) => {
    if (confirm('Tem certeza que deseja eliminar esta tatuagem?')) {
      setTattoos(tattoos.filter(t => t.id !== id));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-container">
        <div className="login-box">
          <h2>Painel Administrativo</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Utilizador</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite o utilizador"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a password"
                required
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="login-btn">Entrar</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-panel">
        <div className="admin-header">
          <h1>Painel Administrativo</h1>
          <button onClick={handleLogout} className="logout-btn">Sair</button>
        </div>

        <div className="admin-tabs">
          <button 
            className={`tab-btn ${activeTab === 'artists' ? 'active' : ''}`}
            onClick={() => setActiveTab('artists')}
          >
            Artistas
          </button>
          <button 
            className={`tab-btn ${activeTab === 'portfolios' ? 'active' : ''}`}
            onClick={() => setActiveTab('portfolios')}
          >
            Portfolios
          </button>
          <button 
            className={`tab-btn ${activeTab === 'tattoos' ? 'active' : ''}`}
            onClick={() => setActiveTab('tattoos')}
          >
            Tatuagens
          </button>
        </div>
        
        <div className="admin-content">
          {/* Gestão de Artistas */}
          {activeTab === 'artists' && (
            <div className="admin-section">
              <h2>Gestão de Artistas</h2>
              
              {/* Formulário de Adicionar/Editar */}
              <form onSubmit={editingArtist ? handleUpdateArtist : handleAddArtist} className="admin-form">
                <h3>{editingArtist ? 'Editar Artista' : 'Adicionar Artista'}</h3>
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Nome do artista"
                    value={editingArtist ? editingArtist.name : newArtist.name}
                    onChange={(e) => editingArtist 
                      ? setEditingArtist({...editingArtist, name: e.target.value})
                      : setNewArtist({...newArtist, name: e.target.value})}
                    required
                  />
                  <input
                    type="text"
                    placeholder="URL da imagem"
                    value={editingArtist ? editingArtist.image : newArtist.image}
                    onChange={(e) => editingArtist 
                      ? setEditingArtist({...editingArtist, image: e.target.value})
                      : setNewArtist({...newArtist, image: e.target.value})}
                  />
                </div>
                <textarea
                  placeholder="Biografia do artista"
                  value={editingArtist ? editingArtist.bio : newArtist.bio}
                  onChange={(e) => editingArtist 
                    ? setEditingArtist({...editingArtist, bio: e.target.value})
                    : setNewArtist({...newArtist, bio: e.target.value})}
                  required
                />
                <div className="form-actions">
                  <button type="submit" className="btn-primary">
                    {editingArtist ? 'Atualizar' : 'Adicionar'}
                  </button>
                  {editingArtist && (
                    <button type="button" className="btn-secondary" onClick={() => setEditingArtist(null)}>
                      Cancelar
                    </button>
                  )}
                </div>
              </form>

              {/* Lista de Artistas */}
              <div className="items-list">
                <h3>Artistas Cadastrados</h3>
                {artists.map(artist => (
                  <div key={artist.id} className="item-card">
                    <div className="item-info">
                      <h4>{artist.name}</h4>
                      <p>{artist.bio}</p>
                      {artist.image && <span className="item-meta">Imagem: {artist.image}</span>}
                    </div>
                    <div className="item-actions">
                      <button onClick={() => setEditingArtist(artist)} className="btn-edit">Editar</button>
                      <button onClick={() => handleDeleteArtist(artist.id)} className="btn-delete">Eliminar</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gestão de Portfolios */}
          {activeTab === 'portfolios' && (
            <div className="admin-section">
              <h2>Gestão de Portfolios</h2>
              
              <form onSubmit={editingPortfolio ? handleUpdatePortfolio : handleAddPortfolio} className="admin-form">
                <h3>{editingPortfolio ? 'Editar Portfolio' : 'Adicionar Portfolio'}</h3>
                <div className="form-row">
                  <select
                    value={editingPortfolio ? editingPortfolio.artistId : newPortfolio.artistId}
                    onChange={(e) => editingPortfolio 
                      ? setEditingPortfolio({...editingPortfolio, artistId: Number(e.target.value)})
                      : setNewPortfolio({...newPortfolio, artistId: Number(e.target.value)})}
                    required
                  >
                    <option value="">Selecione um artista</option>
                    {artists.map(artist => (
                      <option key={artist.id} value={artist.id}>{artist.name}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Título do portfolio"
                    value={editingPortfolio ? editingPortfolio.title : newPortfolio.title}
                    onChange={(e) => editingPortfolio 
                      ? setEditingPortfolio({...editingPortfolio, title: e.target.value})
                      : setNewPortfolio({...newPortfolio, title: e.target.value})}
                    required
                  />
                </div>
                <textarea
                  placeholder="Descrição do portfolio"
                  value={editingPortfolio ? editingPortfolio.description : newPortfolio.description}
                  onChange={(e) => editingPortfolio 
                    ? setEditingPortfolio({...editingPortfolio, description: e.target.value})
                    : setNewPortfolio({...newPortfolio, description: e.target.value})}
                />
                <div className="form-actions">
                  <button type="submit" className="btn-primary">
                    {editingPortfolio ? 'Atualizar' : 'Adicionar'}
                  </button>
                  {editingPortfolio && (
                    <button type="button" className="btn-secondary" onClick={() => setEditingPortfolio(null)}>
                      Cancelar
                    </button>
                  )}
                </div>
              </form>

              <div className="items-list">
                <h3>Portfolios Cadastrados</h3>
                {portfolios.map(portfolio => {
                  const artist = artists.find(a => a.id === portfolio.artistId);
                  return (
                    <div key={portfolio.id} className="item-card">
                      <div className="item-info">
                        <h4>{portfolio.title}</h4>
                        <span className="item-meta">Artista: {artist?.name}</span>
                        <p>{portfolio.description}</p>
                      </div>
                      <div className="item-actions">
                        <button onClick={() => setEditingPortfolio(portfolio)} className="btn-edit">Editar</button>
                        <button onClick={() => handleDeletePortfolio(portfolio.id)} className="btn-delete">Eliminar</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Gestão de Tatuagens */}
          {activeTab === 'tattoos' && (
            <div className="admin-section">
              <h2>Gestão de Tatuagens</h2>
              
              <form onSubmit={editingTattoo ? handleUpdateTattoo : handleAddTattoo} className="admin-form">
                <h3>{editingTattoo ? 'Editar Tatuagem' : 'Adicionar Tatuagem'}</h3>
                <div className="form-row">
                  <select
                    value={editingTattoo ? editingTattoo.portfolioId : newTattoo.portfolioId}
                    onChange={(e) => editingTattoo 
                      ? setEditingTattoo({...editingTattoo, portfolioId: Number(e.target.value)})
                      : setNewTattoo({...newTattoo, portfolioId: Number(e.target.value)})}
                    required
                  >
                    <option value="">Selecione um portfolio</option>
                    {portfolios.map(portfolio => {
                      const artist = artists.find(a => a.id === portfolio.artistId);
                      return (
                        <option key={portfolio.id} value={portfolio.id}>
                          {artist?.name} - {portfolio.title}
                        </option>
                      );
                    })}
                  </select>
                  <input
                    type="text"
                    placeholder="Título da tatuagem"
                    value={editingTattoo ? editingTattoo.title : newTattoo.title}
                    onChange={(e) => editingTattoo 
                      ? setEditingTattoo({...editingTattoo, title: e.target.value})
                      : setNewTattoo({...newTattoo, title: e.target.value})}
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="URL da imagem"
                  value={editingTattoo ? editingTattoo.image : newTattoo.image}
                  onChange={(e) => editingTattoo 
                    ? setEditingTattoo({...editingTattoo, image: e.target.value})
                    : setNewTattoo({...newTattoo, image: e.target.value})}
                  required
                />
                <textarea
                  placeholder="Descrição da tatuagem"
                  value={editingTattoo ? editingTattoo.description : newTattoo.description}
                  onChange={(e) => editingTattoo 
                    ? setEditingTattoo({...editingTattoo, description: e.target.value})
                    : setNewTattoo({...newTattoo, description: e.target.value})}
                />
                <div className="form-actions">
                  <button type="submit" className="btn-primary">
                    {editingTattoo ? 'Atualizar' : 'Adicionar'}
                  </button>
                  {editingTattoo && (
                    <button type="button" className="btn-secondary" onClick={() => setEditingTattoo(null)}>
                      Cancelar
                    </button>
                  )}
                </div>
              </form>

              <div className="items-list">
                <h3>Tatuagens Cadastradas</h3>
                {tattoos.map(tattoo => {
                  const portfolio = portfolios.find(p => p.id === tattoo.portfolioId);
                  const artist = artists.find(a => a.id === portfolio?.artistId);
                  return (
                    <div key={tattoo.id} className="item-card">
                      <div className="item-info">
                        <h4>{tattoo.title}</h4>
                        <span className="item-meta">
                          {artist?.name} - {portfolio?.title}
                        </span>
                        <p>{tattoo.description}</p>
                        {tattoo.image && <span className="item-meta">Imagem: {tattoo.image}</span>}
                      </div>
                      <div className="item-actions">
                        <button onClick={() => setEditingTattoo(tattoo)} className="btn-edit">Editar</button>
                        <button onClick={() => handleDeleteTattoo(tattoo.id)} className="btn-delete">Eliminar</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
