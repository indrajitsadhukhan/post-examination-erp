/**
 * 1. Filename: /home/aditi/final-project/microservices/document/util/db/helper.js
 * 2. Purpose: helper functions for db interactions
 * 3. Dependency: db connection through "sequelize"
 * 4. API: None
 * 5. Author: Aditi Nath
 * 6. Creation date: 11-02-2022
 * 7. Modification date: 16-02-2022
 * 8. How to test: Test using Jest, "npm run test" can verify whether the test are succesful
 * 9. TO DO: i) functions for obtaining processed data for respective users
 *           ii) accomodate different documents. 
 */
const sequelize = require('../../db-config');

async function getAvailableDocumentTypes()
{
    const query = "SELECT type FROM document_types";
    const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT});
    return result;
}

async function getUrlForDocument(userId, documentTemplateId, documentName)
{   
    return `localhost:3000/${documentTypeTemplateId}`;
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
        const query = "INSERT INTO document_types(type) VALUES (?)";
        const result = await sequelize.query(query, { replacements: [typeName], type: sequelize.QueryTypes.INSERT});
        return result;
    }
    return true;
}

async function getCoursesForSemester(semesterId)
{
    const query = "SELECT id AS semester_courses_id , grade_id "
        + "FROM semester_courses "
        + "WHERE semester_id = ?";

    const result = await sequelize.query(query, { replacements: [semesterId], type: sequelize.QueryTypes.SELECT});
    return result;
}

async function getExamsForSemesterCourse(courseId)
{
    const query = "SELECT id , weightage, full_marks "
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

 module.exports = {
    getCoursesForSemester,
    getExamsForSemesterCourse,
    getMarksForExamForUser,
    getGradingScheme,
    getAvailableDocumentTypes,
    getTemplateForDocument,
    getUrlForDocument,
    createNewDocumentType,
 };
