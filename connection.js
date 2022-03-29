/*
 * File Name: connection.js
 * Purpose: Connects the application to the database
 * Dependency:
 *  File:
 *   credentials.json 
 *  Module:
 *   pg-Pool
 * API: N/A
 * Author: Riom Sen
 * Creation Date:     29 March, 2022
 * Modification Date: 30 March, 2022
 * How To Test: It requires no testing, code review shall be enough.
 * todo: Instead of pool.query, acquire a proper client.
 * Functions:
 */

require('dotenv').config();
const {Pool, Client} = require('pg');
const pool = new Pool();

const client = new Client()
client.connect()

module.exports = {pool,client};
