/*
 * File Name: index.js
 * Purpose: Entry point for programme module. Connects url with functions.
 * Dependency: queries.js
 * API:
 * /programme/get --> 16/02/22
 * /regulation/get --> 16/02/22
 * /programme/version/get --> 23/02/22
 * /programme/user/get/:id --> 23/02/22
 * /programme/create --> 16/02/22
 * /regulation/create --> 16/02/22
 * /programme/version/create --> 16/02/22
 * /programme/user/insert --> 23/02/22
 * /programme/user/update/endDate/:id --> 23/02/22
 * Author: Riom Sen
 * Creation Date: 18 January, 2022
 * Modification Date: 23 February 2022
 * How To Test: Yet to finalise. As of now, run directly and check database.
 * todo: Implement the other apis of module. Finalize test.
 */

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({extended: true,})
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API. Welcome to the program module by Riom Sen.' })
})

app.get('/programme/get', db.getProgramme)
app.get('/regulation/get',db.getRegulation)
app.get('/programme/version/get',db.getProgrammeVersion)
app.get('/programme/user/get/:id',db.getProgrammeUserById)
app.post('/programme/create',db.createProgramme)
app.post('/regulation/create',db.createRegulation)
app.post('/programme/version/create',db.createProgrammeVersion)
app.post('/programme/user/insert',db.createProgrammeUser)
app.put('/programme/user/update/endDate/:id',db.updateProgrammeUserEndDate)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})


