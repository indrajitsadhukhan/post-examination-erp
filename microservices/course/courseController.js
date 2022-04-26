/*
1. File Name: courseController.js
2. Purpose: All functions related to course module
3. Dependency: 
4. APi, if any: 
/course/createcourse
/course/createinstance
/course/link_semester
/course/entrymarks
/exam/createexam
/exam/uploadmarks

5. Author: Indrajit Sadhukhan
6. Creation Date: 16.02.2022
7. Modification Date: 25.03.2022
8. How to test:
9. TODO: uploadmarks
*/
require('dotenv').config();

const Pool = require('pg').Pool
const fs = require('fs')
const csv = require('fast-csv')
const format = require('pg-format')
const express = require('express')
const app = express()
const bodyparser = require('body-parser')

app.use(express.static("./public"))
 
// body-parser middleware use
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
}))

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
})

// 1. POST /course/createcourse

const createCourse = (request, response) => {
    const { code , name } = request.body
    console.log(request.body)
    if(code==null || name==null)
    {
      response.status(403).send({error:'Parameters not correct',data:{}})
      return
    }
  
    pool.query('insert into course (code,name) values ($1,$2)',[code,name], (error, results) => {
      if (error) {
        console.log(error.detail)
        response.status(403).send({error:error.detail,data:{}})
        return
      } 
      response.status(201).send({status:201,message:'Course Created',data:{}})
    })

  }



// 2. POST /course/createinstance

  const createInstance = (request, response) => {
    const { course_id,details } = request.body
    console.log(request.body)
    if(course_id==null || details==null)
    {
      response.status(403).send({error:'Parameters not correct',data:{}})
      return
    }
  
    pool.query('insert into course_versions (course_id,details) values ($1,$2)',[course_id,details], (error, results) => {
      if (error) {
        console.log(error.detail)
        response.status(403).send({error:error.detail,data:{}})

        return
      }
      response.status(201).send({status:201,message:'Course Instance Created',data:{}}) 
       })
  }

// 3. POST /course/link_semester
const linkSemester = (request, response) => {
  const { course_version_id,course_regulations_id, semester_id, grade_id } = request.body
  console.log(request.body)
  if(course_version_id==null || course_regulations_id==null || semester_id==null || grade_id==null)
  {
    response.status(403).send({error:'Parameters not correct',data:{}})
    return
  }

  pool.query('insert into semester_courses (course_version_id,course_regulations_id, semester_id, grade_id) values ($1,$2,$3,$4)',[course_version_id,course_regulations_id, semester_id, grade_id], (error, results) => {
    if (error) {
      console.log(error.detail)
      response.status(403).send({error:error.detail,data:{}})

      return
    }
    response.status(201).send({status:201,message:'Course linked with semester',data:{}})
  })

}

// 4. POST /exam/entrymarks
const entryMarks = (request, response) => {

  const { exam_id,user_id,obtained_marks } = request.body
  console.log(request.body)
  if(exam_id==null || user_id==null || obtained_marks==null)
  {
    response.status(403).send({error:'Parameters not correct',data:{}})
    return
  }

  pool.query('insert into marks ( exam_id,user_id,obtained_marks) values ($1,$2,$3)',[ exam_id,user_id,obtained_marks], (error, results) => {
    if (error) {
      console.log(error.detail)
      response.status(403).send({error:error.detail,data:{}})
      return
    }
    response.status(201).send({status:201,message:'Marks entered successfully.',data:{}})
  })
}


// POST /exam/createexam
const createExam = (request, response) => {

  const { semester_courses_id,name,full_marks } = request.body
  console.log(request.body)
  if(semester_courses_id==null || name==null || full_marks==null)
  {
    response.status(403).send({error:'Parameters not correct',data:{}})
    return
  }

  pool.query('insert into exam (semester_courses_id,name,full_marks) values ($1,$2,$3)',[semester_courses_id,name,full_marks], (error, results) => {
    if (error) {
      console.log(error.detail)
      response.status(403).send({error:error.detail,data:{}})

      return
    }
    response.status(201).send({status:201,message:'Exam created successfully.',data:{}})

  })
}

//Upload csv file to server
function uploadfile(file)
{
  var filename = file.name
    file.mv('./uploads/'+filename,function(err)
    {
      if(err)
      {
        return 0;
      }
      else
      {
        return 1;
      }
    })
}

//CSV records entered in marks table
function csvUpdate(file)
{
  var filename = file.name
  let stream = fs.createReadStream(__dirname + '/uploads/' + filename);
  let csvData = [];
  let csvStream = csv
      .parse()
      .on("data", function (data) {
        csvData.push(data);
      })
      .on("end",function(){
        csvData.shift();
        console.log(csvData)
        let q = format('INSERT INTO marks (exam_id,user_id,obtained_marks) VALUES %L', csvData);
        // console.log(q)
        pool.query(q,(error, results) => {
          if(error)
          console.log(error.detail)
        });
      })
      stream.pipe(csvStream);
}

//POST /exam/uploadmarks
const uploadmarks= (request, response) => {
  if(request.files)
  {
   var promise = new Promise((resolve,reject)=>
   {
   let res= uploadfile(request.files.file)
    if(res==0)
    {
      response.send(err);
      reject("Failed to upload")
    }
    else
    {
    response.send("File uploaded");
    resolve("File uploaded")
    }
   })
   .then((data)=>
   {
    csvUpdate(request.files.file)
   })
   .catch((e)=> 
   {
     console.log(e);
    });
   }
}

module.exports = {
    createCourse,
    createInstance,
    linkSemester,
    entryMarks,
    createExam,
    uploadmarks
  }
