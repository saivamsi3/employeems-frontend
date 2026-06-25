import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper.jsx";
import axios from "axios";
import { userAuth } from "../../context/authContext.jsx";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const {url} = userAuth();

  const onDepartmentDelete = (id) => {
    const updated = departments.filter((dep) => dep._id !== id);

    setDepartments(updated);
    setFilteredDepartments(updated);
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);

      try {
        const response = await axios.get(
          `${url}/api/department`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        if (response.data.success) {
          let sno = 1;

          const formatted = response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
          }));

          setDepartments(formatted);
          setFilteredDepartments(formatted);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const value = e.target.value.toLowerCase();

    const filtered = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(value),
    );

    setFilteredDepartments(filtered);
  };

  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold">Manage Departments</h3>
      </div>

      <div className="flex justify-between mb-6">
        <input
          onChange={filterDepartments}
          placeholder="Search Department"
          className="border px-4 py-2 rounded"
        />

        <Link
          to="/admin-dashboard/add-department"
          className="bg-teal-600 text-white px-4 py-2 rounded"
        >
          Add New Department
        </Link>
      </div>

      <DataTable
        columns={[
          ...columns,
          {
            name: "Action",
            cell: (row) => (
              <DepartmentButtons
                Id={row._id}
                onDepartmentDelete={onDepartmentDelete}
              />
            ),
          },
        ]}
        data={filteredDepartments}
        pagination
        noDataComponent={
          <div className="p-4 text-gray-500">No departments found</div>
        }
      />
    </div>
  );
};

export default DepartmentList;
