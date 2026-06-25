import React from "react";
export const columns = [
  
   {
      name: "s.no",
    selector: (row) => row.sno,
    width: "70px",
    center: "true",

   },

  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "150px",
    center: "true",
  },
   {
    name: "Emp ID",
    selector: (row) => row.employeeId,
    width: "150px",
    center: "true",
  },

  {
    name: "Department",
    selector: (row) => row.department,
    width: "190px",
    center: "true",
  },

  {
    name: "Action",
    selector: (row) => row.action,
    center: "true",
  },
];
const AttendanceHelper = ({status}) => {
  return (
    <div>
      {status == null ? (
        <div className="flex space-x-8">
          <button className="px-4 py-2 bg-green-500 text-white">Present</button>

          <button className="px-4 py-2 bg-red-500 text-white">Absent</button>

          <button className="px-4 py-2 bg-gray-500 text-white">Sick</button>

          <button className="px-4 py-2 bg-yellow-500 text-white">Leave</button>
        </div>
      ) : (
        <p className="bg-gray-100 w-20 text-center py-2 rounded">{status}</p>
      )}
    </div>
  );
};

export default AttendanceHelper;
