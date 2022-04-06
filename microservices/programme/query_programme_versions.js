/*
 * File Name: query_programme_versions.js
 * Purpose: Contains those apis that exclusively deals with table programme_versions.
 * Dependency:
 *  File:
 *   connection.js
 *  Module: 
 *   express
 * API:
 * /get    --> 24/03/22 | 24/03/22
 * /create --> 24/03/22 | 24/03/22
 * Author: Riom Sen
 * Creation Date: 24 March, 2022
 * Modification Date: 29 March, 2022
 * How To Test: As of now, run directly and check database. Shall use jest framework shortly.
 * todo: Implement the other apis of module. Finalize test.
 * Functions:
 *  getProgrammeVersion          --> 23/02/22 | 24/03/22
 *  createProgrammeVersion       --> 16/02/22 | 24/03/22
 */

const {pool,client} = require('./connection.js');

const express = require('express')
const router = express.Router()

const getProgrammeVersion = (request,response) => {
    client.query('SELECT * FROM programme_versions',(error,results) => {
        if(error)
        {
            response.status(500).send({ error });
        }
        response.status(200).send({ data : results.rows });
    });
}

const createProgrammeVersion = (request,response) => {
    const {prog_id,reg_id,start_date} = request.body;

    client.query('INSERT INTO programme_versions (programme_id,programme_regulations_id,start_date) VALUES ($1,$2,$3) RETURNING id', [ prog_id, reg_id, start_date ], ( error, results ) => {
        if(error) {
            throw error;
        }
        response.status(201).send({ message:`Programme Version added with ID: ${ results.rows[0].id }` });
    });
}

router.get('/get',getProgrammeVersion);
router.post('/create', createProgrammeVersion);

module.exports = router;

