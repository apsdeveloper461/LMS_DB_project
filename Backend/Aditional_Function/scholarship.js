const mysql_con=require('../DbConnection');

const scholarship=(req, res) => {
    try {
        const { student_id } = req.body;
        const Query = `SELECT * FROM Scholarships WHERE last_date>= NOW()`;
        mysql_con.query(Query, (error, result) => {
            if (error) {
                console.error('Error executing MySQL query :', error);
                return res.status(500).json({ message: 'Error retrieving Scholarship data' });
            }
            console.log(result);
            res.json(result);
        });
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports=scholarship;