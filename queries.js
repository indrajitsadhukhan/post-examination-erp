const Pool = require('pg').Pool;
const pool = new Pool({
	user : 'riom',
	host : 'localhost',
	database: 'iiests_project_3',
	password: 'acad1520',
	port: 5432,
});

const getProgramme  = (request,response) => {
	pool.query('SELECT * FROM programme', (error,results) => {
		if (error) {
			throw error
		}
		response.status(200).json(results.rows)
	})
}

const createProgramme = (request,response) => {
	const { name, code } = request.body

	pool.query('INSERT INTO programme (name,code) VALUES ($1,$2) RETURNING id', [name,code] , (error, results) => {
		if (error) {
			throw error
		}
		response.status(201).send(`Programme added with ID: ${results.rows[0].id}`)
	})
}

module.exports = {
	getProgramme,
	createProgramme
}

