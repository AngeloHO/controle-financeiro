// Importando pool para acessar o banco de dados
const pool = require('../config/db');

const usuarioController = {
    getAllUsers: async (req, res) => {
        try {
            const result = await pool.query('SELECT * FROM USUARIOS');
            res.status(200).json(result.rows);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    createUser: async (req, res) => {
        const { nome, email, senha, telefone, cpf, data_nascimento } = req.body;
        if (!nome || !email || !senha || !telefone || !cpf || !data_nascimento) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }
        try {
            const result = await pool.query(
                `INSERT INTO USUARIOS (nome, email, senha, telefone, cpf, data_nascimento)
                 VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
                [nome, email, senha, telefone, cpf, data_nascimento]
            );
            res.status(201).json(result.rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteUser: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await pool.query('DELETE FROM USUARIOS WHERE id = $1 RETURNING *', [id]);
            if (result.rowCount === 0) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            res.status(200).json({ message: 'Usuário deletado com sucesso', usuario: result.rows[0] });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = usuarioController;