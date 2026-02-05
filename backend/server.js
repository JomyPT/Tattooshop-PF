const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql2/promise');
require('dotenv').config();

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

// Configuração da base de dados MySQL
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'vilares_vintage_tattoos'
};

let dbPool;

async function initDatabase() {
  dbPool = mysql.createPool({
    ...dbConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  const createTableSql = `
    CREATE TABLE IF NOT EXISTS agendamentos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(120) NOT NULL,
      email VARCHAR(160) NOT NULL,
      telefone VARCHAR(40),
      data_agendamento DATE NOT NULL,
      estilo VARCHAR(120) DEFAULT 'Não especificado',
      localizacao VARCHAR(120) DEFAULT 'Não especificado',
      tamanho VARCHAR(120) DEFAULT 'Não especificado',
      horario_preferencial VARCHAR(120) DEFAULT 'Não especificado',
      descricao TEXT,
      imagens JSON,
      data_criacao DATETIME NOT NULL,
      status VARCHAR(30) DEFAULT 'pendente'
    )
  `;

  await dbPool.execute(createTableSql);
}

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
app.post('/api/agendamentos', upload.array('imagens', 5), async (req, res) => {
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

    // Criar agendamento na base de dados
    const dataCriacao = new Date();
    const insertSql = `
      INSERT INTO agendamentos
        (nome, email, telefone, data_agendamento, estilo, localizacao, tamanho, horario_preferencial, descricao, imagens, data_criacao, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await dbPool.execute(insertSql, [
      nome,
      email,
      telefone || null,
      data,
      estilo || 'Não especificado',
      localizacao || 'Não especificado',
      tamanho || 'Não especificado',
      horarioPreferencial || 'Não especificado',
      descricao || '',
      JSON.stringify(imagensPaths),
      dataCriacao,
      'pendente'
    ]);

    const novoAgendamento = {
      id: result.insertId,
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
      dataCriacao: dataCriacao.toISOString(),
      status: 'pendente'
    };

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
  const listSql = 'SELECT * FROM agendamentos ORDER BY data_criacao DESC';
  dbPool.execute(listSql)
    .then(([rows]) => {
      const formatted = rows.map(row => ({
        id: row.id,
        nome: row.nome,
        email: row.email,
        telefone: row.telefone,
        data: row.data_agendamento,
        estilo: row.estilo,
        localizacao: row.localizacao,
        tamanho: row.tamanho,
        horarioPreferencial: row.horario_preferencial,
        descricao: row.descricao,
        imagens: row.imagens ? JSON.parse(row.imagens) : [],
        dataCriacao: row.data_criacao,
        status: row.status
      }));
      res.json(formatted);
    })
    .catch((error) => {
      console.error('Erro ao listar agendamentos:', error);
      res.status(500).json({ error: 'Erro ao listar agendamentos' });
    });
});

// GET /api/agendamentos/:id - Obter agendamento específico
app.get('/api/agendamentos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const getSql = 'SELECT * FROM agendamentos WHERE id = ? LIMIT 1';

  dbPool.execute(getSql, [id])
    .then(([rows]) => {
      if (!rows.length) {
        return res.status(404).json({ error: 'Agendamento não encontrado' });
      }

      const row = rows[0];
      res.json({
        id: row.id,
        nome: row.nome,
        email: row.email,
        telefone: row.telefone,
        data: row.data_agendamento,
        estilo: row.estilo,
        localizacao: row.localizacao,
        tamanho: row.tamanho,
        horarioPreferencial: row.horario_preferencial,
        descricao: row.descricao,
        imagens: row.imagens ? JSON.parse(row.imagens) : [],
        dataCriacao: row.data_criacao,
        status: row.status
      });
    })
    .catch((error) => {
      console.error('Erro ao obter agendamento:', error);
      res.status(500).json({ error: 'Erro ao obter agendamento' });
    });
});

// DELETE /api/agendamentos/:id - Deletar agendamento
app.delete('/api/agendamentos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const deleteSql = 'DELETE FROM agendamentos WHERE id = ?';
  dbPool.execute(deleteSql, [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Agendamento não encontrado' });
      }
      res.json({ message: 'Agendamento deletado com sucesso' });
    })
    .catch((error) => {
      console.error('Erro ao deletar agendamento:', error);
      res.status(500).json({ error: 'Erro ao deletar agendamento' });
    });
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
initDatabase()
  .then(() => {
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
  })
  .catch((error) => {
    console.error('❌ Erro ao iniciar a base de dados:', error);
    process.exit(1);
  });
