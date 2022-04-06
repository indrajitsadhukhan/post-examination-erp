/**
 * 1. Filename: /home/aditi/final-project/microservices/document/util/db/helper.js
 * 2. Purpose: helper functions for db interactions
 * 3. Dependency: db connection through "sequelize"
 * 4. API: None
 * 5. Author: Aditi Nath
 * 6. Creation date: 11-02-2022
 * 7. Modification date: 25-03-2022
 * 8. How to test: Test using Jest, "npm run test" can verify whether the test are succesful
 * 9. TO DO: i) functions for obtaining processed data for respective users
 *           ii) accomodate different documents. 
 */
const { QueryTypes } = require('sequelize');
const sequelize = require('../db-config');

const validateType = async (res,type) => {
    const query1 = `SELECT id from document_types where type = ?`;
    
    let result;
    try {
        result = await sequelize.query(query1, {replacements : [type], type: sequelize.QueryTypes.SELECT});
        
        if(!result.length)
        {
            res.status(422).send({ message: 'Invalid document type!'});
            return false;
        }
    }catch (e) {
        console.log(e);
        res.status(500).send({ error: 'Error validating document type' });
        return false;
    }
    console.log('Valid document type!')
    return result[0].id;
}

const validateInstance = async (res,type_id,instance) => {
    const query2 = `SELECT id from document_templates WHERE type_id = ? AND instance = ?`;
    let result;
    try {
         result = await sequelize.query(query2, {replacements : [type_id, instance], type: sequelize.QueryTypes.SELECT});
         if(!result.length)
         {
             res.status(422).send({ message: 'Invalid document template!'});
             return false;
         }
     }catch (e) {
         console.log(e);
         res.status(500).send({ error: 'Error validating document template' });
         return false;
     }
     return result[0].id;
}
async function getAvailableDocumentTypes()
{
    const query = "SELECT type FROM document_types";
    const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT});
    return result;
}

async function getUrlForDocument(userId, documentTemplateId, documentName)
{   
    return `localhost:3000/${documentTemplateId}`;
    const query = "SELECT url FROM documents WHERE user_id = ? and document_template_id = ? and name = ?";
    const result = await sequelize.query(query, { replacements: [userId, documentTemplateId, documentName], type: sequelize.QueryTypes.SELECT});
    return result;
}

async function getTemplateForDocument(type, instance)
{
    const query = "SELECT template FROM document_templates WHERE instance=?"
        + " AND type_id=(SELECT id from document_types WHERE type=?)";
    const result = await sequelize.query(query, { replacements: [instance, type], type: sequelize.QueryTypes.SELECT});
    return result;
}

async function createNewDocumentType(typeName)
{
    const existingTypes = await getAvailableDocumentTypes();
    if(!existingTypes.find(typeName))
    {
        try{
        const query = "INSERT INTO document_types(type) VALUES (?)";
        const result = await sequelize.query(query, { replacements: [typeName], type: sequelize.QueryTypes.INSERT});
        return result;
        } catch(e) {
            return false;
        }
    }
    return true;
}

async function getCoursesForSemester(semesterId)
{
    const query = "SELECT id AS semester_courses_id , grade_id, code, name "
        + "FROM semester_courses "
        + "INNER JOIN course "
        + "ON course.id = semester_courses.course_id"
        + "WHERE semester_id = ?";

    const result = await sequelize.query(query, { replacements: [semesterId], type: sequelize.QueryTypes.SELECT});
    return result;
}

async function getExamsForSemesterCourse(courseId)
{
    const query = "SELECT id, name, weightage, full_marks "
        + "FROM exams " 
        + "WHERE semester_course_id = ?";
    
    const result = await sequelize.query(query, { replacements: [courseId], type: sequelize.QueryTypes.SELECT});
    return result;
}

async function getMarksForExamForUser(examId, userId)
{
    const query = "SELECT obtained_marks " 
        + "FROM marks " 
        + "WHERE exam_id = ? and user_id = ?";
        
    const result = await sequelize.query(query, { replacements: [examId, userId], type: sequelize.QueryTypes.SELECT});
    return result;
    
} 
 async function getGradingScheme(semCourseId)
 {
     const query = "SELECT * FROM grade_data "
        + "INNER JOIN grades "
        + "ON grade_data_id = gid "
        + "INNER JOIN semester_courses "
        + "ON grade_id = grades.id "
        + "AND semester_courses.id = ?";

    const result = await sequelize.query(query, { replacements: [semCourseId], type: sequelize.QueryTypes.SELECT});
    return result;
 }

 async function getUserDataForProgrammeAndSemester(programme_version_id, semester_num, user_id)
 {
    let query = "SELECT id FROM semester WHERE programme_version_id = ? AND num = ?";
    let result = await sequelize.query(query, { 
        replacements: [programme_version_id, semester_num],
        type: QueryTypes.SELECT,
    });

    const semesterId = result[0].id;
    const current_courses = getCoursesForSemester(semesterId);

    for (let i = 0; i < current_courses.length; i++) {
        current_courses[i].exams = getExamsForSemesterCourse(current_courses[i].id);

        for (let j = 0; j < current_courses[i].exams.length; j++) {
            current_courses[i].exams[j].obtained_marks = getMarksForExamForUser(
                current_courses[i].exams[j].id,
                user_id,
            )[0].obtained_marks;
        }
    }
 }

 module.exports = {
    getCoursesForSemester,
    getExamsForSemesterCourse,
    getMarksForExamForUser,
    getGradingScheme,
    getAvailableDocumentTypes,
    getTemplateForDocument,
    getUrlForDocument,
    createNewDocumentType,
    getUserDataForProgrammeAndSemester,
    validateType,
    validateInstance,
 };
