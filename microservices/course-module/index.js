/*
1. File Name: index.js
2. Purpose: Routes and connection
3. Dependency: 
4. APi, if any: 
5. Author: Indrajit Sadhukhan
6. Creation Date: 16.02.2022
7. Modification Date: 28.02.2022
8. How to test:
9. TODO:  
*/

const express = require('express')
const bodyParser = require('body-parser')
const course_controller = require('./courseController')
const app = express()
const port = 3000
const upload = require('express-fileupload')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(upload())

app.post('/course/createcourse', course_controller.createCourse)
app.post('/course/createinstance',course_controller.createInstance)
app.post('/course/linksemester',course_controller.linkSemester)
app.post('/course/entrymarks',course_controller.entryMarks)
app.post('/course/createexam',course_controller.createExam)
app.post('/course/uploadmarks',course_controller.uploadmarks)

app.get('/course/uploadmarks',(req,res)=>{
  res.sendFile(__dirname + '/index.html')
})

// Now set the app to listen on the port you set.

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})