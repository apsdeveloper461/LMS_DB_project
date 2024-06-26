const mysql_con=require('../DbConnection');

const enroll_courses=(req, res) => {
    try {
        const { student_id,semester,department_id } = req.body; // Access data from request body

        // Validation (optional, consider using a library like Joi)
        if (!student_id) {
            return res.status(400).json({ message: 'Missing required parameters' });
        }

        const query = `SELECT EN.student_id,C.course_id,C.course_name,C.course_credit, CONCAT(F.first_name, ' ', F.last_name) AS faculty_name, EN.enrollment_date,DCA.semester from Enrollments EN INNER JOIN  department_course_allocation as DCA ON DCA.course_id=EN.course_id  inner join Courses C ON DCA.course_id=C.course_id Inner Join faculty_course_allocation FCA ON DCA.course_id=FCA.course_id Inner Join Faculty F ON F.Faculty_id=FCA.faculty_id  WHERE  EN.student_id=? AND DCA.semester=? AND DCA.department_id=?`;

        mysql_con.query(query, [student_id,semester,department_id], (error, result) => {
            if (error) {
                console.error('Error executing MySQL query:', error);
                return res.status(500).json({ message: 'Error retrieving course data' });
            }
            console.log(result);
            res.json(result);
        });
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



module.exports = enroll_courses;