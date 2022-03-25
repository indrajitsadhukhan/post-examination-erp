/**
 * 1. Filename: /home/aditi/final-project/microservices/document/util/db/handlers.js
 * 2. Purpose: handler functions for view, generate, template routes
 * 3. Dependency: helper, ejs module
 * 4. API: None
 * 5. Author: Aditi Nath
 * 6. Creation date: 22-02-2022
 * 7. Modification date: 22-03-2022
 * 8. How to test: Test using Jest, "npm run test" can verify whether the test are succesful
 * 9. TO DO: i) complete functions for generation and template handlers
 */
const ejs = require('ejs');
const sequelize = require('../db-config');

const { getAvailableDocumentTypes, getUrlForDocument } = require('../util/db/helper');

const indexHandler = (req,res,next) => {
    res.send('api version 0.1');
};

const validateDocumentType = async (t) => {
    const allTypes = await getAvailableDocumentTypes();
    return allTypes.map(( { type } ) => (type)).includes(t);
}

const documentViewHandler = async (req, res) => {
    const { document } = req.params;
    const { userId } = req.body;

    /* Check for validity of type */
    if (!await validateDocumentType(document)) {
        res.status(422).send({ error: "Invalid document type" });
        return;
    }

    /* Fetch the document and send it to user */
    const url = await getUrlForDocument(userId, document);
    if (url.length !== 0) {
        res.status(200).send({ message: "Success", data: { url } });
    } else {
        res.status(404).send({ error: "No document generated for user" });
    }
};

const documentGenerateHandler = async (req, res) => {
    const { document } = req.params;

    let html = await ejs.renderFile(__dirname + '/../example/templates/marksheet.ejs',
        {
            roll: 510518003,
            columns: ['Subject Code', 'Subject Name', 'Marks', 'Letter Grade'],
            rows: [['CS801', 'Artificial Intelligence', 98, 'O'],
            ['CS802', 'Big data', 89, 'A']],
            cgpa: 10
        }
    );
    //res.setHeader("Content-Type", "text/html")
    //res.send(html);
    res.status(200).send({ message: "Document generation successful", data : { html}});
};

const getDocumentTypes = async (req, res) => {
    const query = `SELECT type, instance from document_types d1
    LEFT JOIN document_templates d2
    ON d1.id = d2.type_id
    `;

    try {
        const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        res.status(200).send({ message: 'Success', data: result });
    } catch(e) {
        console.log(e);
        res.status(500).send({ error: 'Could not retrieve document types.' });
    }
};

const addDocumentType = async (req, res) => {
    const { type } = req.body;
    if (!type.length) {
        res.status(422).send({ error: 'Type must be a non null string' });
        return;
    }

    const query = `INSERT INTO document_types (type) VALUES (?)`;

    try {
        const result = await sequelize.query(query, { replacements: [type], type: sequelize.QueryTypes.INSERT });
        res.status(200).send({ message: 'Successfully added document type' });
    } catch (e) {
        console.log(e);
        res.status(500).send({ error: 'Error adding document type' });
    }
};

const addDocumentInstance = async (req, res) => {
    const { instance, template } = req.body;
    const { type } = req.params;
    if (!type.length) {
        res.status(422).send({ error: 'Type must be a non null string' });
        return;
    }
    const query1 = `SELECT id from document_types where type = ?`;
    let id;
    try {
        const result = await sequelize.query(query1, {replacements : [type], type: sequelize.QueryTypes.SELECT});
        id = result[0].id;
        if(!id)
        {
            res.status(422).send({ message: 'Invalid document type!'});
            return;
        }
    }catch (e) {
        console.log(e);
        res.status(500).send({ error: 'Error validating document type' });
        return;
    }

    const query = `INSERT INTO document_templates (type_id, instance, template) VALUES (?, ?, ?)`;

    try {
        await sequelize.query(query, { replacements: [id, instance, template], type: sequelize.QueryTypes.INSERT });
        res.status(200).send({ message: 'Successfully added document type' });
    } catch (e) {
        console.log(e);
        res.status(500).send({ error: 'Error adding document template' });
    }
};

module.exports = {
    indexHandler,
    documentViewHandler,
    documentGenerateHandler,
    getDocumentTypes,
    addDocumentType,
    addDocumentInstance,
};