import React from 'react'
import { useState , useEffect } from 'react';
import { Link } from 'react-router-dom'
import { columns  } from '../../utils/AttendanceHelper.jsx';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import toast from 'react-hot-toast';
import { userAuth } from "../../context/authContext.jsx";
import AttendanceHelper from '../../utils/AttendanceHelper.jsx';

const Attendance = () => {
  const [attendance , setAttendance] = useState([])
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const {url} = userAuth();

  const statusChange = ()=>{
     fetchAttendance();
  }

    const fetchAttendance = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `${url}/api/attendance`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
         console.log("Attendance API Response:", response.data);  

          if (response.data.success) {
           toast.success("Attendance fetched successfully");
            let sno = 1;

            const data = response.data.attendance.map((att) => ({
              employeeId: att.employeeId.employeeId,
              sno: sno++,
              department: att.employeeId.department?.dep_name || "No Department",
              name: att.employeeId.userId?.name || "No Name",
              action: <AttendanceHelper status = {att.status} employeeId={att.employeeId.employeeId} statusChange={statusChange} />,
            }));

            setAttendance(data);
            setFilteredAttendance(data);
          }
        } catch (error) {
          if(error.response && !error.response.data.success){
                  toast.error(error.response.data.error)
          }
      } finally {
        setLoading(false);
      }
    };
  useEffect(()=>{
    fetchAttendance();
  }, []);

 const handleFilter = (e) => {
  const searchText = e.target.value.toLowerCase();

  const records = attendance.filter((emp) =>
    emp.employeeId.toLowerCase().includes(searchText)
  );

  setFilteredAttendance(records);
};
  return (
    <div className='p-6'>
         <div className="text-center  ">
        <h3 className="text-3xl font-bold">Manage Attendance</h3>
      </div>

      <div className="flex justify-between mb-6 items-center mt-4">
        <input
          placeholder="Search By Emp ID"
          className="border px-4 py-2 rounded"
          onChange={handleFilter}
        />
        <p className='text-2xl mr-23'>
          Mark Employees For : <span className='font-bold underline ml-4 '>{new Date().toISOString().split("T")[0]}{" "}</span>
        </p>
        <Link
          to="/admin-dashboard/attendance-report"
          className="bg-teal-600 text-white px-4 py-2 rounded"
        >
          Attendance Report
        </Link>
      </div>
      <div>
        {loading ? (
          <div className="text-center py-6">Loading...</div>
        ) : (
          <DataTable columns={columns} data={filteredAttendance} pagination/>
        )}
      </div>
    </div>
  )
}

export default Attendance;
