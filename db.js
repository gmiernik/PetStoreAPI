const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.DB_USER || 'luke',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'my_data',
    password: process.env.DB_PASS || 'secret',
    port: process.env.DB_PORT || '5432'
});

const getPets = (request, response) => {
    pool.query('SELECT * FROM pets ORDER BY id ASC', (error, results) => {
        if (error) {
            response.status(500).send(error);
        } else {
            response.status(200).json(results.rows)
        }
    })
};
const getPetById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM pets WHERE id = $1', [id], (error, results) => {
        if (error) {
            response.status(500).send(error);
        } else {
            response.status(200).json(results.rows)
        }
    });
};

const createPet = (request, response) => {
    const { name, description } = request.body

    pool.query('INSERT INTO pets (name, description) VALUES ($1, $2) RETURNING *', [name, description], (error, results) => {
        if (error) {
            response.status(500).send(error);
        } else {
            response.status(201).json(results.rows[0])
        }
    })
}

const updatePet = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, description } = request.body

    pool.query(
        'UPDATE pets SET name = $1, description = $2 WHERE id = $3 RETURNING *',
        [name, description, id],
        (error, results) => {
            if (error) {
                response.status(500).send(error);
            } else {
                response.status(200).json(results.rows[0])
            }
        }
    )
};

const deletePet = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM pets WHERE id = $1', [id], (error, results) => {
        if (error) {
            response.status(500).send(error);
        } else {
            response.status(200).json({ msg: `Pet deleted with ID: ${id}` })
        }
    })
}

module.exports = {
    getPets,
    getPetById,
    createPet,
    updatePet,
    deletePet,
    pool
};