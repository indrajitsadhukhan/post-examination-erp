const app = require('../app');
const request = require('supertest');

describe("End to end tests", () => {
    it("/", () => {
        return request(app)
            .get("/")
            .set("Accept", "text/html")
            .expect(200, /api version/);
    });
    it("/manage/types", () => {
        return request(app)
            .get("/manage/types")
            .set("Accept", "application/json")
            .expect(200);
    });
});