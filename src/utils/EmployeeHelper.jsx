import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "100px",
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
    name: "image",
    selector: (row) => row.profileImage,
    width: "120px",
    center: "true",
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "150px",
    center: "true",
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "200px",
    center: "true",
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: "true",
  },
];

export const fetchDepartments = async () => {
  let departments;
  const {url} = userAuth();
  try {
    const response = await axios.get(`${url}/api/department`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      toast.error(error.response.data.error);
    }
  }
  return departments;
};

// employees for salary from
export const getEmployees = async (id) => {
  const {url} = userAuth();
  let employees;
  try {
    const response = await axios.get(`${url}/api/employee/department/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      toast.error(error.response.data.error);
    }
  }
  return employees;
};

export const EmployeeButtons = ({ Id }) => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-2">
      <button
        className="px-3 py-1 bg-teal-600 text-white rounded"
        onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
      >
        View
      </button>

      <button
        className="px-3 py-1 bg-green-500 text-white rounded"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
      >
        Edit
      </button>

      <button
        className="px-3 py-1 bg-yellow-500 text-white rounded"
        onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}
       >
        Salary
      </button>

      <button
        className="px-3 py-1 bg-red-500 text-white rounded"
        onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}
      >
        Leave
      </button>
    </div>
  );
};
