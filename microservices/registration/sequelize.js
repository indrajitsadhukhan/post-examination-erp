const { Sequelize } = require("sequelize");

const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;

const sequelize = new Sequelize(`${DB_URL}/${DB_NAME}`); // Connect to postgres

module.exports = sequelize;
