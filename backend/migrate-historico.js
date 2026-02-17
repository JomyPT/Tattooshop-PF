const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'vilares_vintage_tattoos'
};

async function migrateDatabase() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Conectado à base de dados');

    // Verificar se as colunas já existem
    const [columns] = await connection.execute(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'historico_atividades'
    `, [dbConfig.database]);

    const columnNames = columns.map(col => col.COLUMN_NAME);
    
    // Adicionar nome_cliente se não existir
    if (!columnNames.includes('nome_cliente')) {
      await connection.execute(`
        ALTER TABLE historico_atividades 
        ADD COLUMN nome_cliente VARCHAR(120) NOT NULL DEFAULT 'Cliente desconhecido'
      `);
      console.log('✅ Coluna nome_cliente adicionada');
    }

    // Adicionar email_cliente se não existir
    if (!columnNames.includes('email_cliente')) {
      await connection.execute(`
        ALTER TABLE historico_atividades 
        ADD COLUMN email_cliente VARCHAR(160)
      `);
      console.log('✅ Coluna email_cliente adicionada');
    }

    // Remover foreign key constraint se existir
    const [constraints] = await connection.execute(`
      SELECT CONSTRAINT_NAME
      FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
      WHERE TABLE_SCHEMA = ? 
        AND TABLE_NAME = 'historico_atividades'
        AND CONSTRAINT_TYPE = 'FOREIGN KEY'
    `, [dbConfig.database]);

    for (const constraint of constraints) {
      await connection.execute(`
        ALTER TABLE historico_atividades 
        DROP FOREIGN KEY ${constraint.CONSTRAINT_NAME}
      `);
      console.log(`✅ Foreign key ${constraint.CONSTRAINT_NAME} removida`);
    }

    // Alterar agendamento_id para aceitar NULL
    await connection.execute(`
      ALTER TABLE historico_atividades 
      MODIFY COLUMN agendamento_id INT NULL
    `);
    console.log('✅ Coluna agendamento_id alterada para aceitar NULL');

    // Adicionar índice se não existir
    const [indexes] = await connection.execute(`
      SHOW INDEX FROM historico_atividades WHERE Key_name = 'idx_agendamento'
    `);

    if (indexes.length === 0) {
      await connection.execute(`
        CREATE INDEX idx_agendamento ON historico_atividades(agendamento_id)
      `);
      console.log('✅ Índice idx_agendamento criado');
    }

    console.log('🎉 Migração concluída com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro na migração:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Conexão fechada');
    }
  }
}

migrateDatabase();
