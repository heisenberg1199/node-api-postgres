const Pool = require('pg').Pool

const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
});

const getUsers = (req, res) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (err, results) => {
        if (err) {
            throw err;
        }
        res.status(200).json(results.rows);
    })
}

const getUserById = (req, res) => {
    const userId = parseInt(req.params.id);
    pool.query(
        'SELECT * FROM users WHERE id = $1', 
        [userId], 
        (err, results) => {
            if (err) {
                throw err;
            }
            res.status(200).json(results.rows);
        }
    )
};

const createUser = (req, res) => {
    const { name, email } = req.body;
    pool.query(
        'INSERT INTO users (name, email) VALUES ($1, $2)', 
        [name, email], 
        (err, results) => {
            if (err) {
                throw err;
            }
            res.status(201).send(`User created with ID: ${results.insertId}`);
        }
    );
};

const updateUserById = (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;
    pool.query('ALTER users SET name = $1, email = $2 WHERE id = $3', 
        [name, email, id], 
        (err, results) => {
            if (err) {
                throw err;
            }
            res.status(200).send(`User modified with ID: ${userId}`);
        }
    )
};

const deleteUser = (req, res) => {
    const userId = parseInt(req.params.id);
    pool.query('DELETE FROM users WHERE id = $1', [userId], (err, results) => {
        if (err) {
            throw err;
        }
        res.status(200).send(`User deleted with ID: ${userId}`);
    })
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUser,
}
