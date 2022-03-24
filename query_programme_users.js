/*
 * File Name: query_programme_users.js
 * Purpose: Contains those apis which mainly deals with the interaction of a user with a programme
 * Dependency: pg-Pool, express
 * API
 * /get/:id             --> 25/03/22 | 25/03/22
 * /insert              --> 25/03/22 | 25/03/22
 * /update/endDate/:id  --> 25/03/22 | 25/03/22
 * Author: Riom Sen
 * Creation Date: 25 March, 2022
 * Modification Date: 25 March, 2022
 * How To Test: Yet to finalise. As of now, run directly and check database.
 * todo: Implement the other apis of module. Finalize test.
 * Function:
 *  getProgrammeUserById         --> 23/02/22 | 25/03/22
 *  createProgrammeUser          --> 23/02/22 | 25/03/22
 *  updateProgrammeUserEndDate   --> 23/02/22 | 25/03/22
 */

const Pool = require('pg').Pool;
const credential = require('./credentials.json');
const pool = new Pool(credential);

const express = require('express')
const router = express.Router()

const getProgrammeUserById = (request, response) => {
    const id = +(request.params.id);
    pool.query('SELECT first_name, programme.name , programme.id FROM programme_users,users,programme_versions,programme WHERE users.id = $1 AND programme_users.user_id = users.id AND programme_users.programme_id=programme_versions.id AND programme_versions.programme_id = programme.id', [id], (error, results) => {
        if(error)
        {
            response.status(500).send({ error });
        }
        response.status(200).send({ data : results.rows });
    })
}

const createProgrammeUser = (request,response) => {
//It makes no sense to give end date now
    const { prog_id, user_id, start_date } = request.body;

    pool.query('INSERT INTO programme_users (programme_id,user_id,start_date) VALUES ($1,$2,$3) RETURNING id', [ prog_id, user_id, start_date ], (error,results) => {
        if(error) {
            response.status(500).send({ error });
        }
        response.status(201).send({ message : `User ${user_id} added to programme ${p_id} with entry ID: ${results.rows[0].id}\n` });
    });
}

const updateProgrammeUserEndDate = (request,response) => {
    const id = +(request.params.id);
    const { end_date } = request.body;
    pool.query('UPDATE programme_users SET end_date = $1 WHERE user_id = $2',[end_date,id],(error,results) => {
        if(error)
        {
            response.status(500).send({ error });
        }
        response.status(200).send({ message: `Record modified with user id ${id}` });
    });
}

router.get('/get/:id',getProgrammeUserById);
router.post('/insert',createProgrammeUser);
router.put('/update/endDate/:id',updateProgrammeUserEndDate);

module.exports = router;
