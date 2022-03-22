/**
 * 1. Filename: /home/aditi/final-project/microservices/document/db-config.js
 * 2. Purpose: db connection through "sequelize"
 * 3. Dependency: "sequelize" module, .env for connecting to db
 * 4. API: None
 * 5. Author: Aditi Nath
 * 6. Creation date: 11-02-2022
 * 7. Modification date: 16-02-2022
 * 8. How to test: Test db connection via queries
 * 9. TO DO: 
 */
const Sequelize = require('sequelize');

const dbUrl = process.env.DB_URL;
const dbName = process.env.DB_NAME;
var sequelize = new Sequelize(dbUrl + '/' + dbName);

module.exports = sequelize;