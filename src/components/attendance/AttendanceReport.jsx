import React, { useEffect, useState } from "react";
import { userAuth } from "../../context/authContext";
import axios from "axios";
const AttendanceReport = () => {
    const { url } = userAuth();
  const [report, setReport] = useState({});
  const [limit, setLimit] = useState(50);
  const [skip, setSkip] = useState(0);
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchReport = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({ limit, skip });
      if (dateFilter) {
        query.append("date", dateFilter);
      }
      const response = await axios.get(
        `${url}/api/attendance/report?${query.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
  console.log("Response:", response.data) 
      if (response.data.success) {
        let sno = 1;
        if (skip == 0) {
          setReport(response.data.groupData);
        } else {
          setReport((prevData) => ({
            ...prevData,
            ...response.data.groupData,
          }));
        }
      }
      setLoading(false);
    } catch (error) {
       console.log("Error:", error)  // 👈 is it crashing?
    setLoading(false) 
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [ skip ,dateFilter]);

  const handleLoadmore =  ()=>{
    setSkip((prevData)=> prevData + limit);
  }

  return (

  <div className='p-6'>
    <h2 className='text-center text-2xl font-bold mb-6'>Attendance Report</h2>
    <div className='mb-4'>
      <h2 className='text-xl font-semibold mb-1'>Filter By Date</h2>
      <input
        type="date"
        className='border border-gray-300 rounded px-2 py-1 bg-gray-50'
        value={dateFilter}
        onChange={(e) => { setSkip(0); setDateFilter(e.target.value); }}
      />
    </div>

    {loading ? <div>Loading...</div> : Object.entries(report).map(([date, records]) => (
      <div key={date} className='mb-8'>
        <h2 className='text-lg font-semibold mb-2'>{date}</h2>
        <table className='w-full border-collapse'>
          <thead>
            <tr className='text-left text-gray-600'>
              <th className='py-2 px-4 font-semibold'>S No</th>
              <th className='py-2 px-4 font-semibold'>Employee ID</th>
              <th className='py-2 px-4 font-semibold'>Name</th>
              <th className='py-2 px-4 font-semibold'>Department</th>
              <th className='py-2 px-4 font-semibold'>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, i) => (
              <tr key={record.employeeId} className='border-t border-gray-100'>
                <td className='py-2 px-4'>{i + 1}</td>
                <td className='py-2 px-4'>{record.employeeId}</td>
                <td className='py-2 px-4'>{record.employeeName}</td>
                <td className='py-2 px-4'>{record.departmentName}</td>
                <td className='py-2 px-4'>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="px-4 py-1 border m-2 hover:bg-green-200  bg-white-100 text-lg font-semibold rounded-full" onClick={handleLoadmore}>Load More</button>
      </div>
    ))}
  </div>
)}

export default AttendanceReport;
