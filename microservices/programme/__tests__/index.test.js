/*
 * File Name: index.test.js
 * Purpose: Tests the main api that is the engine
 * Dependency: 
 *  File:
 *   ../index.js
 *  Module:
 *   supertest
 *   jest
 * API: N/A
 * Author: Riom Sen
 * Creation Date: 30 March, 2022
 * Modification Date: 1 April, 2022
 * How To Test: This is a test file
 * todo: Implement the other tests of module.
 */
const request = require("supertest");
// we also need our app for the correct routes!
const app = require("../index");

describe("GET ROOT", () => {
	test("We should get the initial message", async() => {
		const response = await request(app).get("/");
		expect(response.body).toEqual({message: 'Program module'});
		expect(response.statusCode).toBe(200);
	});
});

