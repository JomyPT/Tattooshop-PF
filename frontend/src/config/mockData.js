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
  { id: 2, artistId: 1, title: 'Modernas', description: 'Designs modernos e criativos' },
  { id: 3, artistId: 2, title: 'Realismo', description: 'Trabalhos em realismo preto e cinza' },
  { id: 4, artistId: 2, title: 'Fantasia', description: 'Tatuagens de fantasia e imaginação' },
  { id: 5, artistId: 3, title: 'Delicadas', description: 'Tatuagens finas e elegantes' },
  { id: 6, artistId: 3, title: 'Minimalistas', description: 'Designs minimalistas e simples' }
];

export const initialTattoos = [
  // Sérgio Vilares - Tradicionais
  { id: 1, portfolioId: 1, title: 'Rosa Tradicional', image: '/portfolio/sergio-vilares/11.png', description: 'Rosa vermelha estilo tradicional' },
  { id: 2, portfolioId: 1, title: 'Âncora Vintage', image: '/portfolio/sergio-vilares/22.png', description: 'Âncora clássica com rope' },
  { id: 3, portfolioId: 1, title: 'Coração Tradicional', image: '/portfolio/sergio-vilares/33.png', description: 'Coração vermelho com banner' },
  
  // Sérgio Vilares - Modernas
  { id: 4, portfolioId: 2, title: 'Geométrico', image: '/portfolio/sergio-vilares/11.png', description: 'Padrão geométrico abstrato' },
  { id: 5, portfolioId: 2, title: 'Linha Moderna', image: '/portfolio/sergio-vilares/22.png', description: 'Design de linhas minimalista' },
  { id: 6, portfolioId: 2, title: 'Composição', image: '/portfolio/sergio-vilares/33.png', description: 'Composição artística moderna' },
  
  // Renato - Realismo
  { id: 7, portfolioId: 3, title: 'Retrato Realista', image: '/portfolio/renato/111.png', description: 'Retrato em preto e cinza' },
  { id: 8, portfolioId: 3, title: 'Animal Realista', image: '/portfolio/renato/222.png', description: 'Tatuagem realista de animal' },
  { id: 9, portfolioId: 3, title: 'Paisagem', image: '/portfolio/renato/333.png', description: 'Paisagem em tons de cinza' },
  
  // Renato - Fantasia
  { id: 10, portfolioId: 4, title: 'Dragão', image: '/portfolio/renato/111.png', description: 'Dragão fantástico' },
  { id: 11, portfolioId: 4, title: 'Fênix', image: '/portfolio/renato/222.png', description: 'Fênix em chamas' },
  { id: 12, portfolioId: 4, title: 'Criatura Mística', image: '/portfolio/renato/333.png', description: 'Criatura de fantasia' },
  
  // Beatriz - Delicadas
  { id: 13, portfolioId: 5, title: 'Flor Delicada', image: '/portfolio/beatriz/1.png', description: 'Flor com traços finos' },
  { id: 14, portfolioId: 5, title: 'Borboleta', image: '/portfolio/beatriz/2.png', description: 'Borboleta elegante' },
  { id: 15, portfolioId: 5, title: 'Pássaro', image: '/portfolio/beatriz/3.png', description: 'Pássaro em voo' },
  
  // Beatriz - Minimalistas
  { id: 16, portfolioId: 6, title: 'Linha Simples', image: '/portfolio/beatriz/1.png', description: 'Uma linha contínua' },
  { id: 17, portfolioId: 6, title: 'Ponto Mínimo', image: '/portfolio/beatriz/2.png', description: 'Minimalismo puro' },
  { id: 18, portfolioId: 6, title: 'Forma Básica', image: '/portfolio/beatriz/3.png', description: 'Forma geométrica simples' }
];
