/*
 * File Name: index.js
 * Purpose: Entry point for programme module. Connects url with functions.
 * Dependency: 
 *  File:
 *   queries_programme.js 
 *   queries_programme_versions.js 
 *   query_programme_regulations.js
 *   query_programme_users.js
 *  Module:
 *   express
 *   body-parser
 *   cookie-parser
 * API:
 *  /programme/get                     --> 16/02/22
 *  /regulation/get                    --> 16/02/22
 *  /programme/version/get             --> 23/02/22
 *  /programme/user/get/:id            --> 23/02/22
 *  /programme/create                  --> 16/02/22
 *  /regulation/create                 --> 16/02/22
 *  /programme/version/create          --> 16/02/22
 *  /programme/user/insert             --> 23/02/22
 *  /programme/user/update/endDate/:id --> 23/02/22
 * Author: Riom Sen
 * Creation Date: 18 January, 2022
 * Modification Date: 29 March 2022
 * How To Test: As of now, run directly and check database. Shall use jest soon.
 * todo: Implement the other apis of module. Finalize test.
 */

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.Port || 3000;

app.use( bodyParser.json() );
app.use( cookieParser() );
app.use( bodyParser.urlencoded({ extended : true, }) );

var intro = (request, response) => {
	response.json({message: 'Program module'});
}
app.get('/', intro);


const router_programme_regulations = require( './query_programme_regulations.js' );
app.use('/regulation', router_programme_regulations );

const router_programme_versions = require( './query_programme_versions.js' );
app.use('/programme/version', router_programme_versions );

const router_programme_users = require( './query_programme_users.js' );
app.use('/programme/user', router_programme_users);

const router_programme = require( './query_programme.js' );
app.use('/programme',router_programme);

//app.get('/programme/get', db.getProgramme);
//app.get('/programme/user/get/:id',db.getProgrammeUserById);
//app.post('/programme/create',db.createProgramme);
//app.post('/programme/user/insert',db.createProgrammeUser);
//app.put('/programme/user/update/endDate/:id',db.updateProgrammeUserEndDate);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});


