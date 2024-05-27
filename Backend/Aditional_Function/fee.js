const mysql_con=require('../DbConnection');

const fee=(req, res) => {
    try {
        const { student_id } = req.body;
        const Query = `SELECT * FROM Fees_payment FP INNER JOIN Fees F ON FP.fee_id=F.fee_id and FP.student_id=${student_id}`;
        mysql_con.query(Query,[student_id], (error, result) => {
            if (error) {
                console.error('Error executing MySQL query :', error);
                return res.status(500).json({ message: 'Error retrieving fee DATA data' });
            }
            console.log(result);
            res.json(result);
        });
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



module.exports=fee;