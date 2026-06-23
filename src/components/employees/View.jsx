  import axios from 'axios';
  import React, { useState , useEffect } from 'react'
import toast from 'react-hot-toast';
  import { useParams } from 'react-router-dom'
  import { userAuth } from "../../context/authContext.jsx";

  const View = () => {
      const {id} = useParams();
      const [employee , setEmployee] = useState(null);
      const {url} = userAuth();

      useEffect(() => {
      const fetchEmployee = async () => {

        try {
          const response = await axios.get(
            `${url}/api/employee/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
      toast.success(response.data.success);
          
          //console.log("API Response:", response.data);

          if (response.data.success) {
            setEmployee(response.data.employee);
          }
        } catch (error) {
          toast.error(error.response.data.error);

          if (error.response && !error.response.data.success) {
            toast.error(error.response.data.error);
          }
        } 
      };

      fetchEmployee();
    }, [id]);

    return (

      <>{employee ? (

      <div>
        
  <div className="p-8 mt-28">
    <div className="bg-white  rounded-lg shadow-lg p-10 max-w-6xl mx-auto">
      
      <h2 className="text-4xl font-bold text-center mb-10">
        Employee Details
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-12">

        {/* Image */}
        <div className="w-72 h-72">
          <img
            src={`${url}/${employee.userId.profileImage}`}
            alt=""
            className="w-full h-full rounded-full object-cover border-4 border-gray-200"
          />
        </div>

        {/* Details */}
        <div className="space-y-6 text-xl">

          <div className="flex gap-4">
            <span className="font-bold">Name:</span>
            <span>{employee.userId.name}</span>
          </div>

          <div className="flex gap-4">
            <span className="font-bold">Employee ID:</span>
            <span>{employee.employeeId}</span>
          </div>

          <div className="flex gap-4">
            <span className="font-bold">Date of Birth:</span>
            <span>
              {new Date(employee.dob).toLocaleDateString()}
            </span>
          </div>

          <div className="flex gap-4">
            <span className="font-bold">Gender:</span>
            <span>{employee.gender}</span>
          </div>

          <div className="flex gap-4">
            <span className="font-bold">Department:</span>
            <span>{employee.department.dep_name}</span>
          </div>

          <div className="flex gap-4">
            <span className="font-bold">Marital Status:</span>
            <span>{employee.maritalStatus}</span>
          </div>

        </div>

      </div>
    </div>
  </div>
  </div>
  ) : <div>Loading..</div>}</>
    )
  }

  export default View
