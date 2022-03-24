/*
 * File Name: query.js
 * Purpose: Actual business logic for programme module.
 * Dependency: pg-Pool
 * API:
 * 	getProgramme 			 --> 16/02/22
 * 	getRegulation 			 --> 16/02/22
 *	getProgrammeVersion 		 --> 23/02/22
 *	getProgrammeUserById 		 --> 23/02/22
 *	createProgramme 		 --> 16/02/22
 * 	createRegulation 		 --> 16/02/22
 * 	createProgrammeVersion 		 --> 16/02/22
 *	createProgrammeUser		 --> 23/02/22
 *	updateProgrammeUserEndDate 	 --> 23/02/22
 * Author: Riom Sen
 * Creation Date: 18 January, 2022
 * Modification Date: 23 February 2022
 * How To Test: Yet to finalise. As of now, run directly and check database.
 * todo: Implement the other apis of module. Finalize test.
 */


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
const getRegulation  = (request,response) => {
	pool.query('SELECT * FROM programme_regulations', (error,results) => {
		if (error) {
			throw error
		}
		response.status(200).json(results.rows)
	})
}

const getProgrammeVersion = (request,response) => {
	pool.query('SELECT * FROM programme_versions',(error,results) => {
		if(error)
		{
			throw error
		}
		response.status(200).json(results.rows)
	})
}

const getProgrammeUserById = (request, response) => {
	const id = parseInt(request.params.id)
	pool.query('SELECT first_name, programme.name , programme.id FROM programme_users,users,programme_versions,programme WHERE users.id = $1 AND programme_users.user_id = users.id AND programme_users.programme_id=programme_versions.id AND programme_versions.programme_id = programme.id', [id], (error, results) => {
		if(error) 
		{
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

const createRegulation = (request,response) => {
	const {name, data } = request.body

	pool.query('INSERT INTO programme_regulations (name,data) VALUES ($1,$2) RETURNING id', [name,data], (error,results) => {
		if(error) {
			throw error
		}
		response.status(201).send(`Regulation added with ID: ${results.rows[0].id}`)
	})
}

const createProgrammeVersion = (request,response) => {
	const {p_id,r_id,start_date} = request.body

	pool.query('INSERT INTO programme_versions (programme_id,programme_regulations_id,start_date) VALUES ($1,$2,$3) RETURNING id', [p_id,r_id,start_date], (error,results) => {
		if(error) {
			throw error
		}
		response.status(201).send({ message: `Regulation added with ID: ${results.rows[0].id}` });
	})
}

const createProgrammeUser = (request,response) => {
//It makes no sense to give end date now
	const {p_id,user_id,start_date} = request.body

	pool.query('INSERT INTO programme_users (programme_id,user_id,start_date) VALUES ($1,$2,$3) RETURNING id', [p_id,user_id,start_date], (error,results) => {
		if(error) {
			throw error
		}
		response.status(201).send({ message: `User ${user_id} added to programme ${p_id} with entry ID: ${results.rows[0].id}\n` });
	})
}

const updateProgrammeUserEndDate = (request,response) => {
	const id = +(request.params.id)
	const {end_date} = request.body
	pool.query('UPDATE programme_users SET end_date = $1 WHERE user_id = $2',[end_date,id],(error,results) => {
		if(error)
		{
			throw error
		}
		response.status(200).send({ message: `Record modified with user id ${id}` });
	})
}

module.exports = {
	getProgramme,
	createProgramme,
	createRegulation,
	getRegulation,
	createProgrammeVersion,
	getProgrammeVersion,
	createProgrammeUser,
	getProgrammeUserById,
	updateProgrammeUserEndDate
}

