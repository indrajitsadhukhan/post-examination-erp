/*
 * File Name: query_programme_regulations.js
 * Purpose: Contains those apis that exclusively deals with table programme_regulations.
 * Dependency: pg-Pool, express
 * API:
 * /get    --> 24/03/22 | 24/03/22
 * /create --> 24/03/22 | 24/03/22
 * Author: Riom Sen
 * Creation Date: 24 March 2022
 * Modification Date: 24 March 2022
 * How To Test: Yet to finalise. As of now, run directly and check database.
 * todo: Implement the other apis of module. Finalize test.
 * Functions:
 *  getRegulation       --> 16/02/22 | 24/03/22
 *  createRegulation    --> 16/02/22 | 24/03/22
 */

const Pool = require('pg').Pool;
const credential = require('./credentials.json');
const pool = new Pool(credential);

const express = require('express')
const router = express.Router()

const getRegulation  = ( request , response ) => {
    pool.query('SELECT * FROM programme_regulations', ( error , results ) => {
        if (error) {
            response.status(500).send({ error });
        }
        response.status(200).send( { data : results.rows } );
    });
}

const createRegulation = ( request , response ) => {
    const { name, data } = request.body;

    pool.query('INSERT INTO programme_regulations (name,data) VALUES ($1,$2) RETURNING id', [ name , data ], ( error , results ) => {
        if( error ) {
            response.status( 500 ).send( { error } );
        }
        response.status( 201 ).send( { message:`Regulation added with ID: ${ results.rows[0].id }` } );
    });
}

router.get('/get',getRegulation);
router.post('/create', createRegulation);

module.exports = router;
