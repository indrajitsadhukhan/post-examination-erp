/*
 * File Name: query_programme.test.js
 * Purpose: Tests the apis related to the table programme
 * Dependency: 
 *  File:
 *   ../query_programme.js
 *  Module:
 *   supertest
 *   express
 *   jest
 * API: N/A
 * Author: Riom Sen
 * Creation Date: 30 March, 2022
 * Modification Date: 1 April, 2022
 * How To Test: This is a test file
 * todo: Implement the other tests of module.
 */

const router_programme = require( '../query_programme.js' );
const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", router_programme);

test("getter works", async() => {
   const response = await request(app).get("/get");
   expect(response.type).toBe( "application/json");
   //expect(response.text).toHaveProperty("data");
   console.log(response);
	expect(response.statusCode).toBe(200);
});


