// we will use supertest to test HTTP requests/responses
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

