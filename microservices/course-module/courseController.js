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
7. Modification Date: 28.02.2022
8. How to test:
9. TODO: uploadmarks
*/

const Pool = require('pg').Pool
const upload = require('express-fileupload')
const fs = require('fs')
const csv = require('fast-csv')
require('dotenv').config();

// const pool = new Pool({
//   user: process.env.USER,
//   host: process.env.HOST,
//   database: process.env.DATABASE,
//   password: process.env.PASSWORD,
//   port: process.env.PORT,
// })

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'college',
  password: 'indrajit@2000',
  port: 5432,
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
      response.status(201).send({status:201,message:'Course Instance Created',data:{}})    })

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

//POST /exam/uploadmarks
const uploadmarks= (request, response) => {
  if(request.files)
  {
    var file = request.files.file
    var filename = file.name
  
      file.mv('./uploads/'+filename,function(err){
        if(err)
        {
          response.send(err)
        }
        else{
          response.send("File Uploaded")
        }
      })

      const stream = fs.createReadStream('./uploads/'+filename);

    var parser=  csv.parseStream(stream,{headers:true})
          .on('error', error => console.error(error))
          .on('data', row => {
            // parser.pause()
        const { exam_id,user_id,obtained_marks }=row
        
        pool.query('insert into marks ( exam_id,user_id,obtained_marks) values ($1,$2,$3)',[ exam_id,user_id,obtained_marks], (error, results) => {
         if (error) {
           console.log(error.detail)
           response.status(403).send({error:error.detail,data:{}})

           return
         }
         response.status(201).send({status:201,message:'Marks entered successfully.',data:{}})

         
       })
      //  parser.resume()
          })
          .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));
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
