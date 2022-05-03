/*
 * File Name: server.js
 * Purpose: Entry point for programme module.
 * Dependency: 
 *  File:
 *   index.js 
 *  Module:
 * API:
 * Author: Riom Sen
 * Creation Date: 30 March, 2022
 * Modification Date: 30 March, 2022
 * How To Test: As of now, run directly and check database. Shall use jest soon.
 * todo: Finalize test.
 */

const app = require("./index");
app.listen(9000, () => console.log("server starting on port 9000!"));
