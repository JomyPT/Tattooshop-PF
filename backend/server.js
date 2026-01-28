const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Criar diretórios necessários
const uploadsDir = path.join(__dirname, 'uploads');
const agendamentosDir = path.join(uploadsDir, 'agendamentos');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
if (!fs.existsSync(agendamentosDir)) {
  fs.mkdirSync(agendamentosDir);
}

// Configuração de upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, agendamentosDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Apenas imagens PNG e JPEG são permitidas!'));
    }
  }
});

// Dados mock para artistas
const mockArtists = [
  {
    id: 1,
    nome: "Sérgio Vilares",
    slug: "sergio-vilares",
    especialidade: "Traditional & Neo-Traditional",
    bio: "Especialista em tatuagens tradicionais com mais de 15 anos de experiência.",
    imagem: "/portfolio/sergio-vilares/profile.jpg"
  },
  {
    id: 2,
    nome: "Renato",
    slug: "renato",
    especialidade: "Realismo & Blackwork",
    bio: "Focado em realismo e trabalhos em preto e cinza.",
    imagem: "/portfolio/renato/profile.jpg"
  },
  {
    id: 3,
    nome: "Beatriz",
    slug: "beatriz",
    especialidade: "Fine Line & Delicate",
    bio: "Especializada em tatuagens delicadas e traços finos.",
    imagem: "/portfolio/beatriz/profile.jpg"
  }
];

// Array para armazenar agendamentos (em produção, usar base de dados)
let agendamentos = [];
let agendamentoIdCounter = 1;

// Rotas

// GET /api/artists - Listar todos os artistas
app.get('/api/artists', (req, res) => {
  res.json(mockArtists);
});

// GET /api/artists/:slug - Obter artista por slug
app.get('/api/artists/:slug', (req, res) => {
  const artist = mockArtists.find(a => a.slug === req.params.slug);
  if (artist) {
    res.json(artist);
  } else {
    res.status(404).json({ error: 'Artista não encontrado' });
  }
});

// POST /api/agendamentos - Criar novo agendamento
app.post('/api/agendamentos', upload.array('imagens', 5), (req, res) => {
  try {
    const {
      nome,
      email,
      telefone,
      data,
      estilo,
      localizacao,
      tamanho,
      horarioPreferencial,
      descricao
    } = req.body;

    // Validação básica
    if (!nome || !email || !telefone || !data) {
      return res.status(400).json({
        error: 'Campos obrigatórios em falta (nome, email, telefone, data)'
      });
    }

    // Processar imagens enviadas
    const imagensPaths = req.files ? req.files.map(file => `/uploads/agendamentos/${file.filename}`) : [];

    // Criar agendamento
    const novoAgendamento = {
      id: agendamentoIdCounter++,
      nome,
      email,
      telefone,
      data,
      estilo: estilo || 'Não especificado',
      localizacao: localizacao || 'Não especificado',
      tamanho: tamanho || 'Não especificado',
      horarioPreferencial: horarioPreferencial || 'Não especificado',
      descricao: descricao || '',
      imagens: imagensPaths,
      dataCriacao: new Date().toISOString(),
      status: 'pendente'
    };

    agendamentos.push(novoAgendamento);

    console.log(`✅ Novo agendamento recebido: ${nome} - ${email}`);
    
    res.status(201).json({
      message: 'Agendamento criado com sucesso!',
      agendamento: novoAgendamento
    });

  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    res.status(500).json({
      error: 'Erro ao processar agendamento',
      details: error.message
    });
  }
});

// GET /api/agendamentos - Listar todos os agendamentos (para admin)
app.get('/api/agendamentos', (req, res) => {
  res.json(agendamentos);
});

// GET /api/agendamentos/:id - Obter agendamento específico
app.get('/api/agendamentos/:id', (req, res) => {
  const agendamento = agendamentos.find(a => a.id === parseInt(req.params.id));
  if (agendamento) {
    res.json(agendamento);
  } else {
    res.status(404).json({ error: 'Agendamento não encontrado' });
  }
});

// DELETE /api/agendamentos/:id - Deletar agendamento
app.delete('/api/agendamentos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = agendamentos.findIndex(a => a.id === id);
  
  if (index !== -1) {
    agendamentos.splice(index, 1);
    res.json({ message: 'Agendamento deletado com sucesso' });
  } else {
    res.status(404).json({ error: 'Agendamento não encontrado' });
  }
});

// Servir arquivos estáticos (uploads)
app.use('/uploads', express.static(uploadsDir));

// Rota de teste
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Vilares Vintage Tattoos API está funcionando!',
    timestamp: new Date().toISOString()
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`✅ API endpoints disponíveis:`);
  console.log(`   GET  /api/health`);
  console.log(`   GET  /api/artists`);
  console.log(`   GET  /api/artists/:slug`);
  console.log(`   POST /api/agendamentos`);
  console.log(`   GET  /api/agendamentos`);
});
