

const router_programme = require( './query_programme.js' );
const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", router_programme);

test("getter works", done => {
  request(app)
    .get("/get")
    .expect("Content-Type", "application/json; charset=utf-8")
    .expect(200, done);
});


