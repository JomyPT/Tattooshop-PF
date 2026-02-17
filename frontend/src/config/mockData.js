// Dados compartilhados entre Admin, Artists e Works

export const initialArtists = [
  { 
    id: 1, 
    name: 'Sérgio Vilares', 
    bio: 'Especialista em tatuagens tradicionais com mais de 15 anos de experiência.', 
    image: '/portfolio/sergio-vilares/profile.jpg',
    slug: 'sergio-vilares'
  },
  { 
    id: 2, 
    name: 'Renato', 
    bio: 'Focado em realismo e trabalhos em preto e cinza.', 
    image: '/portfolio/renato/profile.jpg',
    slug: 'renato'
  },
  { 
    id: 3, 
    name: 'Beatriz', 
    bio: 'Especializada em tatuagens delicadas e traços finos.', 
    image: '/portfolio/beatriz/profile.jpg',
    slug: 'beatriz'
  }
];

export const initialPortfolios = [
  { id: 1, artistId: 1, title: 'Tradicionais', description: 'Tatuagens clássicas e tradicionais' },
  { id: 3, artistId: 2, title: 'Realismo', description: 'Trabalhos em realismo preto e cinza' },
  { id: 5, artistId: 3, title: 'Delicadas', description: 'Tatuagens finas e elegantes' }
];

export const initialTattoos = [
  // Sérgio Vilares - Tradicionais
  { id: 1, portfolioId: 1, title: 'Tattoo 1', image: '/portfolio/sergio-vilares/11.png', description: '' },
  { id: 2, portfolioId: 1, title: 'Tattoo 2', image: '/portfolio/sergio-vilares/22.png', description: '' },
  { id: 3, portfolioId: 1, title: 'Tattoo 3', image: '/portfolio/sergio-vilares/33.png', description: '' },
  
  // Renato - Realismo
  { id: 7, portfolioId: 3, title: 'Tattoo 4', image: '/portfolio/renato/111.png', description: '' },
  { id: 8, portfolioId: 3, title: 'Tattoo 5', image: '/portfolio/renato/222.png', description: '' },
  { id: 9, portfolioId: 3, title: 'Tattoo 6', image: '/portfolio/renato/333.png', description: '' },
  
  // Beatriz - Delicadas
  { id: 13, portfolioId: 5, title: 'Tattoo 7', image: '/portfolio/beatriz/1.png', description: '' },
  { id: 14, portfolioId: 5, title: 'Tattoo 8', image: '/portfolio/beatriz/2.png', description: '' },
  { id: 15, portfolioId: 5, title: 'Tattoo 9', image: '/portfolio/beatriz/3.png', description: '' }
];
