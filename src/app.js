const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3000;

// Configuração para o PostgreSQL (substitua com suas próprias credenciais)
const pool = new Pool({
   user: 'postgres',
   host: 'localhost',
   database: 'postgres',
   password: 'postgres',
   port: 5432,
});

app.use(express.json('public'));

// Defina uma rota para responder a solicitações GET em /register-action
app.get('/register-action', (req, res) => {
   res.sendFile(__dirname + '/public/index.html');
});

// Rota para a página de cadastro de justificativas de falta
app.get('/cadastrar-justificativas', (req, res) => {
   res.sendFile(__dirname + '/public/cadastro_justificativas.html');
});


app.get('/cadastrar-cargo', (req, res) => {
   res.sendFile(__dirname + '/public/cadastro_cargos.html');
});

app.get('/cadastrar-funcionario', (req, res) => {
   res.sendFile(__dirname + '/public/cadastro_funcionarios.html');
});

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/public/cadastro_cargos.html');
});

app.post('/register-action', async (req, res) => {
   const { action } = req.body;

   if (!action) {
       res.status(400).send('Ação do usuário não especificada.');
       return;
   }

   const query = {
       text: 'INSERT INTO user_actions (action) VALUES ($1)',
       values: [action],
   };

   try {
       await pool.query(query);
       res.status(201).send('Ação do usuário registrada com sucesso.');
   } catch (error) {
       console.error(error);
       res.status(500).send('Erro ao registrar ação do usuário.');
   }
});

// Rota para receber dados de cadastro de cargo
app.post('/cadastrar-cargo', async (req, res) => {
    const { nome_cargo, descricao_cargo, salario, beneficios } = req.body;

    const query = {
        text: 'INSERT INTO cargos (nome_cargo, descricao_cargo, salario, beneficios) VALUES ($1, $2, $3, $4)',
        values: [nome_cargo, descricao_cargo, salario, beneficios],
    };

    try {
        await pool.query(query);
        res.status(201).send('Cargo cadastrado com sucesso.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao cadastrar cargo.');
    }
});

// Rota para o cadastro de funcionários
app.post('/cadastrar-funcionario', async (req, res) => {
   const {
       usuario,
       nome_comple,
       senha,
       rg,
       cpf,
       email,
       telefone,
       id_cargo,
   } = req.body;

   // Implemente a lógica para inserir os dados do funcionário no banco de dados
   try {
       const query = {
           text: `INSERT INTO login_funcionario (usuario, nome_completo, senha, rg, cpf, email, telefone, id_cargo)
                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
           values: [usuario, nome_comple, senha, rg, cpf, email, telefone, id_cargo],
       };

       await pool.query(query);

       res.status(201).send('Funcionário cadastrado com sucesso');
   } catch (error) {
       console.error(error);
       res.status(500).send('Erro ao cadastrar funcionário');
   }
});

// Rota para buscar os cargos
app.get('/cargos', async (req, res) => {
   console.log('Rota /cargos foi acessada'); // Adicione este log de console
   try {
       const query = 'SELECT id_cargo, nome_cargo FROM cargos';
       const result = await pool.query(query);

       res.json(result.rows);
   } catch (error) {
       console.error(error);
       res.status(500).send('Erro ao buscar cargos');
   }
});

// Rota para receber dados de cadastro de justificativas de falta
app.post('/cadastrar-justificativas', async (req, res) => {
    const { id_funcionario, data_falta, motivo, aprovada, data_aprovacao, observacoes } = req.body;

    // Implemente a lógica para inserir os dados de justificativas de falta no banco de dados
    try {
        const query = {
            text: `INSERT INTO justificativa_faltas (id_funcionario, data_falta, motivo, aprovada, data_aprovacao, observacoes)
                   VALUES ($1, $2, $3, $4, $5, $6)`,
            values: [id_funcionario, data_falta, motivo, aprovada, data_aprovacao, observacoes],
        };

        await pool.query(query);

        res.status(201).send('Justificativa de falta cadastrada com sucesso');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao cadastrar justificativa de falta');
    }
});


// Rota para buscar funcionários cadastrados
app.get('/funcionarios', async (req, res) => {
    console.log('Rota /funcionarios foi acessada');
    try {
        // Realize uma consulta no banco de dados para buscar funcionários cadastrados
        const query = 'SELECT id_funcionario, nome_completo FROM login_funcionario';
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro na busca de funcionários cadastrados');
    }
});


app.listen(port, () => {
   console.log(`Servidor rodando na porta ${port}`);
});
