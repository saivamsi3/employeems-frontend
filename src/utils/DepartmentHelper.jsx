import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { userAuth } from "../context/authContext.jsx";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "480px",
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true,
    

  },

];

export const DepartmentButtons = ({Id , onDepartmentDelete}) => {
    const navigate = useNavigate()
    const {url} = userAuth();
    
    const handleDelete = async (Id)=>{
      const confirm = window.confirm("Do You Want To Delete")
        if (confirm){
       try {
        const response = await axios.delete(
          `${url}/api/department/${Id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
             onDepartmentDelete(Id)
        }
      } catch (error) {
        console.error(error);

        if (error.response && !error.response.data.success) {
          toast.error(error.response.data.error);
        }
      }

    }
  };
  return (
    <div className="flex gap-2">
      <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-green-600" onClick={()=>navigate(`/admin-dashboard/department/${Id}`)}>
        Edit
      </button>

      <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      onClick={()=>handleDelete(Id)}
      >
        Delete
      </button>
    </div>
  );
};