import { useState } from 'react';
import './Admin.css';
import { initialArtists, initialPortfolios, initialTattoos } from '../config/mockData';

// Componente Modal Reutilizável
function Modal({ isOpen, title, onClose, children }) {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

function CustomSelect({ value, options, placeholder, onChange }) {
  const [open, setOpen] = useState(false);
  const selected = options.find((opt) => opt.value === value);

  return (
    <div
      className={`custom-select ${open ? 'open' : ''}`}
      tabIndex={0}
      onBlur={() => setOpen(false)}
    >
      <button
        type="button"
        className="custom-select-trigger"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={`custom-select-text ${selected ? '' : 'placeholder'}`}>
          {selected ? selected.label : placeholder}
        </span>
        <span className="custom-select-arrow">▾</span>
      </button>
      {open && (
        <div className="custom-select-menu">
          {options.map((opt) => (
            <button
              type="button"
              key={String(opt.value)}
              className={`custom-select-option ${opt.value === value ? 'selected' : ''} ${opt.value === '' ? 'placeholder' : ''}`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('artists');

  // Estados para artistas
  const [artists, setArtists] = useState(initialArtists);
  const [newArtist, setNewArtist] = useState({ name: '', bio: '', image: '', slug: '' });
  const [editingArtist, setEditingArtist] = useState(null);
  const [showArtistModal, setShowArtistModal] = useState(false);

  // Função auxiliar para gerar slug
  const generateSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  // Estados para portfolios
  const [portfolios, setPortfolios] = useState(initialPortfolios);
  const [newPortfolio, setNewPortfolio] = useState({ artistId: '', title: '', description: '' });
  const [editingPortfolio, setEditingPortfolio] = useState(null);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);

  // Estados para tatuagens
  const [tattoos, setTattoos] = useState(initialTattoos);
  const [newTattoo, setNewTattoo] = useState({ portfolioId: '', title: '', image: '', description: '' });
  const [editingTattoo, setEditingTattoo] = useState(null);
  const [showTattooModal, setShowTattooModal] = useState(false);

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
    if (newArtist.name && newArtist.bio && newArtist.image) {
      const slug = generateSlug(newArtist.name);
      setArtists([...artists, { ...newArtist, slug, id: Date.now() }]);
      setNewArtist({ name: '', bio: '', image: '', slug: '' });
      setShowArtistModal(false);
    }
  };

  const handleUpdateArtist = (e) => {
    e.preventDefault();
    if (editingArtist.name && editingArtist.bio && editingArtist.image) {
      const slug = generateSlug(editingArtist.name);
      setArtists(artists.map(a => a.id === editingArtist.id ? {...editingArtist, slug} : a));
      setEditingArtist(null);
      setNewArtist({ name: '', bio: '', image: '', slug: '' });
      setShowArtistModal(false);
    }
  };

  const handleDeleteArtist = (id) => {
    if (confirm('Tem certeza que deseja eliminar este artista?')) {
      setArtists(artists.filter(a => a.id !== id));
    }
  };

  const openArtistModal = (artist = null) => {
    if (artist) {
      setEditingArtist(artist);
    } else {
      setEditingArtist(null);
      setNewArtist({ name: '', bio: '', image: '', slug: '' });
    }
    setShowArtistModal(true);
  };

  const closeArtistModal = () => {
    setShowArtistModal(false);
    setEditingArtist(null);
    setNewArtist({ name: '', bio: '', image: '', slug: '' });
  };

  // Funções para portfolios
  const handleAddPortfolio = (e) => {
    e.preventDefault();
    if (newPortfolio.artistId && newPortfolio.title) {
      setPortfolios([...portfolios, { ...newPortfolio, id: Date.now() }]);
      setNewPortfolio({ artistId: '', title: '', description: '' });
      setShowPortfolioModal(false);
    }
  };

  const handleUpdatePortfolio = (e) => {
    e.preventDefault();
    if (editingPortfolio.artistId && editingPortfolio.title) {
      setPortfolios(portfolios.map(p => p.id === editingPortfolio.id ? editingPortfolio : p));
      setEditingPortfolio(null);
      setNewPortfolio({ artistId: '', title: '', description: '' });
      setShowPortfolioModal(false);
    }
  };

  const handleDeletePortfolio = (id) => {
    if (confirm('Tem certeza que deseja eliminar este portfolio?')) {
      setPortfolios(portfolios.filter(p => p.id !== id));
    }
  };

  const openPortfolioModal = (portfolio = null) => {
    if (portfolio) {
      setEditingPortfolio(portfolio);
    } else {
      setEditingPortfolio(null);
      setNewPortfolio({ artistId: '', title: '', description: '' });
    }
    setShowPortfolioModal(true);
  };

  const closePortfolioModal = () => {
    setShowPortfolioModal(false);
    setEditingPortfolio(null);
    setNewPortfolio({ artistId: '', title: '', description: '' });
  };

  // Funções para tatuagens
  const handleAddTattoo = (e) => {
    e.preventDefault();
    if (newTattoo.portfolioId && newTattoo.title && newTattoo.image) {
      setTattoos([...tattoos, { ...newTattoo, id: Date.now() }]);
      setNewTattoo({ portfolioId: '', title: '', image: '', description: '' });
      setShowTattooModal(false);
    }
  };

  const handleUpdateTattoo = (e) => {
    e.preventDefault();
    if (editingTattoo.portfolioId && editingTattoo.title && editingTattoo.image) {
      setTattoos(tattoos.map(t => t.id === editingTattoo.id ? editingTattoo : t));
      setEditingTattoo(null);
      setNewTattoo({ portfolioId: '', title: '', image: '', description: '' });
      setShowTattooModal(false);
    }
  };

  const handleDeleteTattoo = (id) => {
    if (confirm('Tem certeza que deseja eliminar esta tatuagem?')) {
      setTattoos(tattoos.filter(t => t.id !== id));
    }
  };

  const openTattooModal = (tattoo = null) => {
    if (tattoo) {
      setEditingTattoo(tattoo);
    } else {
      setEditingTattoo(null);
      setNewTattoo({ portfolioId: '', title: '', image: '', description: '' });
    }
    setShowTattooModal(true);
  };

  const closeTattooModal = () => {
    setShowTattooModal(false);
    setEditingTattoo(null);
    setNewTattoo({ portfolioId: '', title: '', image: '', description: '' });
  };

  const portfolioArtistOptions = [
    { value: '', label: 'Selecione um artista' },
    ...artists.map((artist) => ({ value: artist.id, label: artist.name }))
  ];

  const tattooPortfolioOptions = [
    { value: '', label: 'Selecione um portfolio' },
    ...portfolios.map((portfolio) => {
      const artist = artists.find((a) => a.id === portfolio.artistId);
      return {
        value: portfolio.id,
        label: `${artist?.name ?? 'Artista'} - ${portfolio.title}`
      };
    })
  ];

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
              <div className="section-header">
                <h2>Gestão de Artistas</h2>
                <button onClick={() => openArtistModal()} className="btn-add">+ Novo Artista</button>
              </div>

              {/* Lista de Artistas */}
              <div className="items-list">
                {artists.length === 0 ? (
                  <p className="empty-list">Nenhum artista cadastrado</p>
                ) : (
                  artists.map(artist => (
                    <div key={artist.id} className="item-card">
                      <div className="item-info">
                        <h4>{artist.name}</h4>
                        <p>{artist.bio}</p>
                        {artist.image && <span className="item-meta">Imagem: {artist.image}</span>}
                      </div>
                      <div className="item-actions">
                        <button onClick={() => openArtistModal(artist)} className="btn-edit">Editar</button>
                        <button onClick={() => handleDeleteArtist(artist.id)} className="btn-delete">Eliminar</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Modal para Artistas */}
          <Modal 
            isOpen={showArtistModal} 
            title={editingArtist ? '✎ Editar Artista' : '+ Novo Artista'}
            onClose={closeArtistModal}
          >
            <form onSubmit={editingArtist ? handleUpdateArtist : handleAddArtist} className="modal-form">
              <div className="form-group">
                <label>Nome do Artista *</label>
                <input
                  type="text"
                  placeholder="Digite o nome do artista"
                  value={editingArtist ? editingArtist.name : newArtist.name}
                  onChange={(e) => editingArtist 
                    ? setEditingArtist({...editingArtist, name: e.target.value})
                    : setNewArtist({...newArtist, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>URL da Imagem *</label>
                <input
                  type="text"
                  placeholder="Ex: /portfolio/nome/profile.jpg"
                  value={editingArtist ? editingArtist.image : newArtist.image}
                  onChange={(e) => editingArtist 
                    ? setEditingArtist({...editingArtist, image: e.target.value})
                    : setNewArtist({...newArtist, image: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Biografia</label>
                <textarea
                  placeholder="Digite a biografia do artista"
                  value={editingArtist ? editingArtist.bio : newArtist.bio}
                  onChange={(e) => editingArtist 
                    ? setEditingArtist({...editingArtist, bio: e.target.value})
                    : setNewArtist({...newArtist, bio: e.target.value})}
                  rows="4"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingArtist ? 'Atualizar' : 'Adicionar'}
                </button>
                <button type="button" className="btn-secondary" onClick={closeArtistModal}>
                  Cancelar
                </button>
              </div>
            </form>
          </Modal>

          {/* Gestão de Portfolios */}
          {activeTab === 'portfolios' && (
            <div className="admin-section">
              <div className="section-header">
                <h2>Gestão de Portfolios</h2>
                <button onClick={() => openPortfolioModal()} className="btn-add">+ Novo Portfolio</button>
              </div>

              <div className="items-list">
                {portfolios.length === 0 ? (
                  <p className="empty-list">Nenhum portfolio cadastrado</p>
                ) : (
                  portfolios.map(portfolio => {
                    const artist = artists.find(a => a.id === portfolio.artistId);
                    return (
                      <div key={portfolio.id} className="item-card">
                        <div className="item-info">
                          <h4>{portfolio.title}</h4>
                          <span className="item-meta">Artista: {artist?.name}</span>
                          <p>{portfolio.description}</p>
                        </div>
                        <div className="item-actions">
                          <button onClick={() => openPortfolioModal(portfolio)} className="btn-edit">Editar</button>
                          <button onClick={() => handleDeletePortfolio(portfolio.id)} className="btn-delete">Eliminar</button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* Modal para Portfolios */}
          <Modal 
            isOpen={showPortfolioModal} 
            title={editingPortfolio ? '✎ Editar Portfolio' : '+ Novo Portfolio'}
            onClose={closePortfolioModal}
          >
            <form onSubmit={editingPortfolio ? handleUpdatePortfolio : handleAddPortfolio} className="modal-form">
              <div className="form-group">
                <label>Artista *</label>
                <CustomSelect
                  value={editingPortfolio ? editingPortfolio.artistId : newPortfolio.artistId}
                  options={portfolioArtistOptions}
                  placeholder="Selecione um artista"
                  onChange={(value) => editingPortfolio 
                    ? setEditingPortfolio({ ...editingPortfolio, artistId: value === '' ? '' : Number(value) })
                    : setNewPortfolio({ ...newPortfolio, artistId: value === '' ? '' : Number(value) })}
                />
              </div>

              <div className="form-group">
                <label>Título do Portfolio *</label>
                <input
                  type="text"
                  placeholder="Digite o título do portfolio"
                  value={editingPortfolio ? editingPortfolio.title : newPortfolio.title}
                  onChange={(e) => editingPortfolio 
                    ? setEditingPortfolio({...editingPortfolio, title: e.target.value})
                    : setNewPortfolio({...newPortfolio, title: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Descrição</label>
                <textarea
                  placeholder="Digite a descrição do portfolio"
                  value={editingPortfolio ? editingPortfolio.description : newPortfolio.description}
                  onChange={(e) => editingPortfolio 
                    ? setEditingPortfolio({...editingPortfolio, description: e.target.value})
                    : setNewPortfolio({...newPortfolio, description: e.target.value})}
                  rows="4"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingPortfolio ? 'Atualizar' : 'Adicionar'}
                </button>
                <button type="button" className="btn-secondary" onClick={closePortfolioModal}>
                  Cancelar
                </button>
              </div>
            </form>
          </Modal>

          {/* Gestão de Tatuagens */}
          {activeTab === 'tattoos' && (
            <div className="admin-section">
              <div className="section-header">
                <h2>Gestão de Tatuagens</h2>
                <button onClick={() => openTattooModal()} className="btn-add">+ Nova Tatuagem</button>
              </div>

              <div className="items-list">
                {tattoos.length === 0 ? (
                  <p className="empty-list">Nenhuma tatuagem cadastrada</p>
                ) : (
                  tattoos.map(tattoo => {
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
                          <button onClick={() => openTattooModal(tattoo)} className="btn-edit">Editar</button>
                          <button onClick={() => handleDeleteTattoo(tattoo.id)} className="btn-delete">Eliminar</button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* Modal para Tatuagens */}
          <Modal 
            isOpen={showTattooModal} 
            title={editingTattoo ? '✎ Editar Tatuagem' : '+ Nova Tatuagem'}
            onClose={closeTattooModal}
          >
            <form onSubmit={editingTattoo ? handleUpdateTattoo : handleAddTattoo} className="modal-form">
              <div className="form-group">
                <label>Portfolio *</label>
                <CustomSelect
                  value={editingTattoo ? editingTattoo.portfolioId : newTattoo.portfolioId}
                  options={tattooPortfolioOptions}
                  placeholder="Selecione um portfolio"
                  onChange={(value) => editingTattoo 
                    ? setEditingTattoo({ ...editingTattoo, portfolioId: value === '' ? '' : Number(value) })
                    : setNewTattoo({ ...newTattoo, portfolioId: value === '' ? '' : Number(value) })}
                />
              </div>

              <div className="form-group">
                <label>Título da Tatuagem *</label>
                <input
                  type="text"
                  placeholder="Digite o título da tatuagem"
                  value={editingTattoo ? editingTattoo.title : newTattoo.title}
                  onChange={(e) => editingTattoo 
                    ? setEditingTattoo({...editingTattoo, title: e.target.value})
                    : setNewTattoo({...newTattoo, title: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>URL da Imagem *</label>
                <input
                  type="text"
                  placeholder="Ex: /portfolio/artist/1.png"
                  value={editingTattoo ? editingTattoo.image : newTattoo.image}
                  onChange={(e) => editingTattoo 
                    ? setEditingTattoo({...editingTattoo, image: e.target.value})
                    : setNewTattoo({...newTattoo, image: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Descrição</label>
                <textarea
                  placeholder="Digite a descrição da tatuagem"
                  value={editingTattoo ? editingTattoo.description : newTattoo.description}
                  onChange={(e) => editingTattoo 
                    ? setEditingTattoo({...editingTattoo, description: e.target.value})
                    : setNewTattoo({...newTattoo, description: e.target.value})}
                  rows="4"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingTattoo ? 'Atualizar' : 'Adicionar'}
                </button>
                <button type="button" className="btn-secondary" onClick={closeTattooModal}>
                  Cancelar
                </button>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Admin;
