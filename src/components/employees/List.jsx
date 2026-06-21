import React from 'react'
import { useState , useEffect } from 'react';
import { Link } from 'react-router-dom'
import { EmployeeButtons } from '../../utils/EmployeeHelper.jsx';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { columns } from '../../utils/EmployeeHelper.jsx';
const List = () => {
  const [employees , setEmployees] = useState([])
//  const [departments, setDepartments] = useState([]);
  const [filteredEmployee, setFilteredEmployee] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);

 useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);

      try {
        const response = await axios.get(
          "http://localhost:5000/api/employee",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

          if (response.data.success) {
            let sno = 1;

            const formatted = response.data.employees.map((emp) => ({
              _id: emp._id,
              sno: sno++,
              dep_name: emp.department?.dep_name || "No Department",
              name: emp.userId?.name || "No Name",
              dob: emp.dob ? new Date(emp.dob).toLocaleDateString() : "No DOB",
              profileImage: emp.userId?.profileImage ? (
                <img
                  width={60}
                  className="rounded-full"
                  src={`http://localhost:5000/${emp.userId.profileImage}`}
                  alt={emp.userId?.name || "Employee"}
                />
              ) : (
                "No Image"
              ),
              action: <EmployeeButtons Id={emp.userId?._id} />,
            }));

            setEmployees(formatted);
            setFilteredEmployee(formatted);
          }
        } catch (error) {
          if(error.response && !error.response.data.success){
                  alert(error.response.data.error)
          }
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployees();
  }, []);

 const handleFilter = (e) => {
  const searchText = e.target.value.toLowerCase();

  const records = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchText)
  );

  setFilteredEmployee(records);
};
  return (
    <div className='p-6'>
         <div className="text-center mb-8">
        <h3 className="text-3xl font-bold">Manage Employee</h3>
      </div>

      <div className="flex justify-between mb-6">
        <input
          placeholder="Search Employee"
          className="border px-4 py-2 rounded"
          onChange={handleFilter}
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="bg-teal-600 text-white px-4 py-2 rounded"
        >
          Add New Employee
        </Link>
      </div>
      <div>
        {empLoading ? (
          <div className="text-center py-6">Loading...</div>
        ) : (
          <DataTable columns={columns} data={filteredEmployee} pagination/>
        )}
      </div>
    </div>
  )
}

export default List
