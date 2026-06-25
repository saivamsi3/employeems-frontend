import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { userAuth } from "../../context/authContext.jsx";

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });
  const navigate = useNavigate();
  const {url} = userAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${url}/api/department/add`,
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error);
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center pt-10">
      <div className="w-[420px] bg-white rounded-md shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Add New Department
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="dep_name"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Department Name
            </label>

            <input
              type="text"
              id="dep_name"
              name="dep_name"
              onChange={handleChange}
              placeholder="Department Name"
              className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              onChange={handleChange}
              rows="5"
              placeholder="Description"
              className="w-full p-4 border border-gray-300 rounded-md resize-none outline-none focus:ring-2 focus:ring-teal-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xl py-3 rounded-md transition"
          >
            Add Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
