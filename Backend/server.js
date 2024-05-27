const express = require('express');
const cors = require('cors');
const mysql_con = require('./DbConnection')
const app = express();
const logInother = require('./Aditional_Function/logInother');
const register_course = require('./Aditional_Function/register_course');
const Registered_in_course = require('./Aditional_Function/Registered_in_course');
const enroll_courses = require('./Aditional_Function/enroll_courses');
const attendance = require('./Aditional_Function/attendance');
const student_data = require('./Aditional_Function/student_data');
const register_student = require('./Aditional_Function/register_student');
const grades = require('./Aditional_Function/grades');
const fee = require('./Aditional_Function/fee');
const scholarship = require('./Aditional_Function/scholarship');


app.use(cors())
app.use(express.json());


app.post('/studentdata', student_data);
app.post('/department', (req, res) => {
    let sql = "SELECT * from Departments";
    mysql_con.query(sql, (err, result) => {
        if (err) console.log(err);
        else {
            console.log(result);
            res.json(result);
        }
    })
})
app.post('/register_student', register_student)
app.post('/login', logInother)
app.post('/student/register_course', register_course);
app.post('/student/registered_in_course', Registered_in_course)
app.post('/student/enroll_course', enroll_courses)
app.post('/student/attendance', attendance);
app.post('/student/grades', grades )
app.post('/student/fee',fee)
app.post('/student/scholarship', scholarship)

app.listen(5000, () => console.log("Running on Server"))