/**
 * 1. Filename: /home/aditi/final-project/microservices/document/routes/document.js
 * 2. Purpose: to associate routes with their respective modules
 * 3. Dependency: Express module and different routes to modules and their functions
 * 4. API: None
 * 5. Author: Aditi Nath
 * 6. Creation date: 08-02-2022
 * 7. Modification date: 22-02-2022
 * 8. How to test: Visit api routes with browser or Postman 
 * 9. TO DO: i) code handler functions
 *          ii) Add option for adding new document 
 */
var express = require('express');
var router = express.Router();

const {
    indexHandler,
    documentViewHandler,
    documentGenerateHandler,
    getDocumentTypes,
    addDocumentType,
    addDocumentInstance
}
    = require('./handlers');

router.get('/', indexHandler);

router.get('/view/:document', documentViewHandler);
router.get('/manage/generate/:document', documentGenerateHandler);
router.get('/manage/types', getDocumentTypes);
router.post('/manage/types/add', addDocumentType);
router.post('/manage/types/:type', addDocumentInstance);
router.get('/manage/types/:type/:instance', () => {});
router.put('/manage/types/:type/:instance', () => {});
router.get('/manage/types/:type/:instance/list', () => {});
router.post('/manage/types/:type/:instance/generate', () => {});

module.exports = router;