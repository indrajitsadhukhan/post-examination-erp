/**
 * 1. Filename: /home/aditi/final-project/microservices/document/routes/index/index.js
 * 2. Purpose: Main entry point through browser, helps check end to end connectin
 * 3. Dependency: None
 * 4. API: "doc/"
 * 5. Author: Aditi Nath
 * 6. Creation date: 05-02-2022
 * 7. Modification date: 16-02-2022
 * 8. How to test:  
 * 9. TO DO:  
 */
const indexHandler = (req,res,next) => {
    res.send('api version 0.1');
};

module.exports = indexHandler;