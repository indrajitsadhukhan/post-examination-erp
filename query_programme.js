/*
 * File Name: query_programme.js
 * Purpose: Contains those apis that exclusively deals with table programme.
 * Dependency: pg-Pool, express
 * API:
 * /get
 * /create
 * Author: Riom Sen
 * Creation Date:     18 January, 2022
 * Modification Date: 25 March,   2022
 * How To Test: Yet to finalise. As of now, run directly and check database.
 * todo: Implement the other apis of module. Finalize test.
 * Functions:
 * 	getProgramme 			 --> 16/02/22 | 25/03/22
 *	createProgramme 		 --> 16/02/22 | 25/03/22
 */


const Pool = require('pg').Pool;
const credential = require('./credentials.json'); 
const pool = new Pool(credential);

const express = require('express')
const router = express.Router()


const getProgramme  = (request,response) => {
	pool.query('SELECT * FROM programme', (error,results) => {
		if (error) {
			response.status(500).send({ error });
        }
        response.status(200).send({ data : results.rows });

	});
}


const createProgramme = (request,response) => {
	const { name, code } = request.body;

	pool.query('INSERT INTO programme (name,code) VALUES ($1,$2) RETURNING id', [ name, code ] , (error, results) => {
		if (error) {
			response.status(500).send({ error });
		}
		response.status(201).send({ message : `Programme added with ID: ${results.rows[0].id}` });
	});
}

router.get('/get',getProgramme);
router.post('/create', createProgramme);

module.exports = router;
