import axios from 'axios';
import React, { useState , useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Details = () => {
    const {id} = useParams();
    const [leave , setLeave] = useState(null);
     const navigate = useNavigate()

     useEffect(() => {  
    const fetchLeave = async () => {

      try {
        const response = await axios.get(
          `http://localhost:5000/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
    console.log(response.data);
        

        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        console.error(error);

        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } 
    };

    fetchLeave();
  }, [id]);

  const changeStatus = async(id , status)=>{
             try {
        const response = await axios.put(
          `http://localhost:5000/api/leave/${id}`, {status}  ,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        

        if (response.data.success) {
            navigate(`/admin-dashboard/leaves/${id}`);  
        }
      } catch (error) {
        console.error(error);

        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } 
  }

  return (

    <>
    {leave ? (

    <div>
      
<div className="p-8 mt-28">
  <div className="bg-white  rounded-lg shadow-lg p-10 max-w-6xl mx-auto">
    
    <h2 className="text-4xl font-bold text-center mb-10">
      Leave Details
    </h2>

    <div className="flex flex-col md:flex-row items-center gap-12">

      {/* Image */}
      <div className="w-72 h-72">
        <img
          src={`http://localhost:5000/${leave?.employeeId.userId.profileImage || ""}`}
          alt=""
          className="w-full h-full rounded-full object-cover border-4 border-gray-200"
        />
      </div>

      {/* Details */}
      <div className="space-y-5 text-xl items-center ">

        <div className="flex gap-2">
          <span className="font-bold">Name:</span>
          <span>{leave.employeeId.userId.name}</span>
        </div>

        <div className="flex gap-2">
          <span className="font-bold">Employee ID:</span>
          <span>{leave.employeeId.employeeId}</span>
        </div>

        <div className="flex gap-2">
          <span className="font-bold">Leave Type:</span>
          <span>
            {leave.leaveType}
          </span>
        </div>

        <div className="flex gap-2">
          <span className="font-bold">Reason:</span>
          <span>{leave.reason}</span>
        </div>

        <div className="flex gap-2">
          <span className="font-bold">Department:</span>
          <span>{leave.employeeId.department.dep_name}</span>
        </div>

        <div className="flex gap-2">
          <span className="font-bold">Start Date:</span>
          <span>{new Date (leave.startDate).toLocaleDateString()}</span>
        </div>

         <div className="flex gap-2">
          <span className="font-bold">end Date:</span>
          <span>{new Date (leave.endDate).toLocaleDateString()}</span>
        </div>

         <div className="flex gap-2">
          <span className="font-bold">
              {leave.status?.toLowerCase() === "pending" ? "action" : "Status :"}            
            </span>
          {leave.status?.toLowerCase() === "pending" ? (
            <div className='flex space-x-2'>
                <button className='px-2 py-0.5 bg-teal-300 hover:bg-teal-600' onClick={()=> changeStatus(leave._id , "Approved")}>Approve</button>
                <button className='px-2 py-0.5 bg-red-300 hover:bg-red-600' onClick={()=> changeStatus(leave._id , "Rejected")}>Reject</button>

            </div>
          ) : <span className='font-medium'>{leave.status}</span>
        }

          
        </div>

      </div>

    </div>
  </div>
</div>
</div>
) : <div>Loading..</div>}</>
  )
}

export default Details;
