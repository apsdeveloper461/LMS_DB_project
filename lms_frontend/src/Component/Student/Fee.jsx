import React, { useEffect, useState } from 'react'
import Navbar from '../Slider/Navbar'
import Slider from '../Slider/Slider'
import parsedToStudentSlider from './menu'
import Cookies from 'js-cookie'
import axios from 'axios'

function Fee() {
    const [FeeData,setFeeData]=useState(null);
    useEffect(()=>{
        const studentInfo={
            'student_id':Cookies.get('student_id')
         }
        axios.post('http://localhost:5000/student/fee',studentInfo)
        .then(res=>{
         console.log(res.data);
         setFeeData(res.data);
         })
        .catch(err=>{
          console.log(err);
        })
    
    },[])
  return (
    <>
    <Navbar logo="Student Panel"/>
    <Slider parsedData={parsedToStudentSlider}/>
    <div className="content-container">
    <h1>Invoice Fee</h1>
         
<div class="table-container">
    <table>
        <thead>
            <tr>
                <th><h3>Fee Challan No.</h3></th>
                <th><h3>Smester No.</h3></th>
                <th><h3>Fee Amount</h3></th>
                <th><h3>  Due_Date</h3></th>
                <th><h3> Status</h3></th>
            </tr>
        </thead>
        <tbody>
        {FeeData && FeeData.length > 0 ? (FeeData.map(item => (
            <tr id={item.payment_id}>
                <td>{item.payment_id}</td>
                <td>{item.semester}</td>
                <td>{item.amount}</td>
                <td>{item.due_date}</td>
               <td> {!item.status?(
                    <div className='status_class_fee' style={{border:'2px solid red',color:'red'}}>Unpaid</div>
                ):(
                    <div className='status_class_fee' style={{border:'2px solid green',color:'green'}}>paid</div>
                )}
                </td>
            </tr>
           ))
          ):
          (
            
             <tr ><td colSpan={4} >No result found</td></tr> 
          )}
        </tbody>
    </table>
</div>
</div>
    </>
  )
}

export default Fee