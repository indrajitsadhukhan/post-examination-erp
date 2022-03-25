const app = require('../app');
const request = require('supertest');

describe("End to end tests", () => {
    it("/", (done) => {
        request(app)
            .get("/")
            .set("Accept", "text/html")
            .expect(200, /api version/, done);
    });
    it("/manage/types", (done) => {
        request(app)
            .get("/manage/types")
            .set("Accept", "application/json")
            .expect(200, done);
    });
    it("manage/types/add", (done) => {
        request(app)
            .post("/manage/types/add")
            .set("Accept", "application/json")
            .send({type: "marksheet"})
            .expect(422, { error: 'Type is already present' }, done);
    });
});