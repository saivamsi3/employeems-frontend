import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { userAuth } from "../../context/authContext.jsx";
import toast from "react-hot-toast";

const EditDepartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [department, setDepartment] = useState([]);

  const [depLoading, setDepLoading] = useState(false);

  const {url} = userAuth();

  useEffect(() => {
    const fetchDepartment = async () => {
      setDepLoading(true);

      try {
        const response = await axios.get(
          `${url}/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("API Response:", response.data);

        if (response.data.success) {
          setDepartment(response.data.department);
        }
      } catch (error) {
        console.error(error);

        if (error.response && !error.response.data.success) {
          toast.error(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDepartment({
      ...department,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${url}/api/department/${id}`,
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      console.error(error);

      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <>
      {depLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-xl font-semibold text-gray-600">
            Loading...
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-100 flex items-start justify-center pt-10">
          <div className="w-[420px] bg-white rounded-md shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Edit Department
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
                  value={department.dep_name}
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
                  value={department.description}
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
                Edit Department
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditDepartment;