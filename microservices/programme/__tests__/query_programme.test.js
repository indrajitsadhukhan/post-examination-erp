

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


