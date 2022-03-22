/**
 * 1. Filename: /home/aditi/final-project/microservices/document/routes/marksheet/marksheet.js
 * 2. Purpose: Handling functions associated to marksheet
 * 3. Dependency: None
 * 4. API: "doc/marksheet"
 *          "doc/marksheet/manage"
 *          "doc/marksheet/manage/generate"
 *          "doc/marksheet/manage/template"
 * 5. Author: Aditi Nath
 * 6. Creation date: 05-02-2022
 * 7. Modification date: 16-02-2022
 * 8. How to test: Visit api routes with browser or Postman 
 * 9. TO DO: i) accomodate different documents.
 */

const { getCoursesForSemester } = require('../../util/db/helper');

const marksheetHandler = async(req,res,next) => {
    console.log(await getCoursesForSemester(1));

    res.send('Marksheet download!');
};

const viewMarksheetHandler = (req,res,next) => {
    res.send('Admin view marksheet');
}

const generateMarksheetHandler = (req,res,next) => {
    res.send('Admin generate marksheet');
}

const marksheetTemplateHandler = (req,res,next) => {
    res.send('Admin change marksheet template');
}

module.exports = {
    marksheetHandler,
    viewMarksheetHandler,
    generateMarksheetHandler,
    marksheetTemplateHandler,
};