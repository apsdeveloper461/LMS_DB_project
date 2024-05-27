const mysql_con=require('../DbConnection');

const grades=(req, res) => {
    try {
        const { student_id } = req.body;
        const Query = `SELECT C.course_id,C.course_name,C.course_credit,G.grade FROM grades G,Courses C WHERE G.course_id=C.course_id and G.student_id=${student_id}`;
        mysql_con.query(Query, (error, result) => {
            if (error) {
                console.error('Error executing MySQL query :', error);
                return res.status(500).json({ message: 'Error retrieving Grades data' });
            }
            console.log(result);
            res.json(result);
        });
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports=grades;