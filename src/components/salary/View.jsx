//   import React, { useEffect, useState } from "react";
//   import { useParams } from "react-router-dom";
//   import axios from "axios";
// import { userAuth } from "../../context/authContext.jsx";
// import toast from "react-hot-toast";

//   const View = () => {
//     const [salaries, setSalaries] = useState(null);
//     const [filteredSalaries, setFilteredSalaries] = useState(null);
//     const { id } = useParams();
//     const {user, url} = userAuth()

//     const fetchSalaries = async () => {
//       console.log("fetchSalaries called");

//       try {
//         const response = await axios.get(
//           `${url}/api/salary/${id}/${user.role}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
//                 console.log("Salary Response:", response.data);
//         if (response.data.success) {
//           setSalaries(response.data.salary);
//           setFilteredSalaries(response.data.salary);
//         }
//       } catch (error) {
//         console.log(error);
//         if (error.response && !error.response.data.success) {
//           toast.error(error.response.data.error);
//         }
//       }
//     };

//     // useEffect(() => {
      
//     //   fetchSalaries();
      
//     // }, [user?.role, id, url]);
//     useEffect(() => {
//   console.log("user:", user);
//   console.log("id:", id);
//   console.log("url:", url);

//   fetchSalaries();
// }, [user?.role, id, url]);

//     const filterSalaries = (q) => {
//       const filteredRecords = salaries.filter((salary) =>
//         salary.employeeId.employeeId
//           .toLowerCase()
//           .includes(q.toLowerCase())
//       );
//             console.log("Salary Response:", response.data);


//     };

//     let sno = 1;

//     return (
//       <>
//         {filteredSalaries === null ? (
//           <div>Loading ....</div>
//         ) : (
//           <div className="overflow-x-auto p-5">
//             <div className="text-center">
//               <h2 className="text-2xl font-bold">Salary History</h2>
//             </div>

//             <div className="flex justify-end my-3">
//               <input
//                 type="text"
//                 placeholder="Search By Emp ID"
//                 className="border px-2 rounded-md py-0.5 border-gray-300"
//                 onChange={(e) => filterSalaries(e.target.value)}
//               />
//             </div>

//             {filteredSalaries.length > 0 ? (
//               <table className="w-full text-sm text-left text-gray-500">
//                 <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
//                   <tr>
//                     <th className="px-6 py-3">SNO</th>
//                     <th className="px-6 py-3">EMP ID</th>
//                     <th className="px-6 py-3">BASIC SALARY</th>
//                     <th className="px-6 py-3">ALLOWANCES</th>
//                     <th className="px-6 py-3">DEDUCTIONS</th>
//                     <th className="px-6 py-3">NET SALARY</th>
//                     <th className="px-6 py-3">PAY DATE</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {filteredSalaries.map((salary) => (
//                     <tr
//                       key={salary._id}
//                       className="bg-white border-b"
//                     >
//                       <td className="px-6 py-3">{sno++}</td>
//                       <td className="px-6 py-3">
//                         {salary.employeeId.employeeId}
//                       </td>
//                       <td className="px-6 py-3">
//                         {salary.basicSalary}
//                       </td>
//                       <td className="px-6 py-3">
//                         {salary.allowances}
//                       </td>
//                       <td className="px-6 py-3">
//                         {salary.deductions}
//                       </td>
//                       <td className="px-6 py-3">
//                         {salary.netSalary}
//                       </td>
//                       <td className="px-6 py-3">
//                         {new Date(
//                           salary.payDate
//                         ).toLocaleDateString()}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <div className="text-center text-red-500">
//                 No Records Found
//               </div>
//             )}
//           </div>
//         )}
//       </>
//     );
//   };

//   export default View;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { userAuth } from "../../context/authContext.jsx";
import toast from "react-hot-toast";

const View = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState(null);

  const { id } = useParams();
  const { user, url } = userAuth();

  const fetchSalaries = async () => {
    console.log("========== FETCH SALARIES ==========");
    console.log("User:", user);
    console.log("Role:", user?.role);
    console.log("ID:", id);
    console.log("URL:", url);

    try {
      const response = await axios.get(
        `${url}/api/salary/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Salary Response:", response.data);

      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      } else {
        console.log("API returned success:false");
      }
    } catch (error) {
      console.log("========== ERROR ==========");

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Error Data:", error.response.data);
      } else {
        console.log(error);
      }

      toast.error(
        error.response?.data?.error || "Failed to fetch salary data"
      );
    }
  };

  useEffect(() => {
    console.log("========== USE EFFECT ==========");
    console.log("User:", user);
    console.log("Role:", user?.role);
    console.log("ID:", id);
    console.log("URL:", url);

    if (!user?.role || !id || !url) {
      console.log("Waiting for user role, id, or url...");
      return;
    }

    fetchSalaries();
  }, [user?.role, id, url]);

  const filterSalaries = (q) => {
    if (!salaries) return;

    const filteredRecords = salaries.filter((salary) =>
      salary.employeeId.employeeId
        .toLowerCase()
        .includes(q.toLowerCase())
    );

    setFilteredSalaries(filteredRecords);
  };

  let sno = 1;

  return (
    <>
      {filteredSalaries === null ? (
        <div>Loading ....</div>
      ) : (
        <div className="overflow-x-auto p-5">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Salary History</h2>
          </div>

          <div className="flex justify-end my-3">
            <input
              type="text"
              placeholder="Search By Emp ID"
              className="border px-2 rounded-md py-0.5 border-gray-300"
              onChange={(e) => filterSalaries(e.target.value)}
            />
          </div>

          {filteredSalaries.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                <tr>
                  <th className="px-6 py-3">SNO</th>
                  <th className="px-6 py-3">EMP ID</th>
                  <th className="px-6 py-3">BASIC SALARY</th>
                  <th className="px-6 py-3">ALLOWANCES</th>
                  <th className="px-6 py-3">DEDUCTIONS</th>
                  <th className="px-6 py-3">NET SALARY</th>
                  <th className="px-6 py-3">PAY DATE</th>
                </tr>
              </thead>

              <tbody>
                {filteredSalaries.map((salary) => (
                  <tr key={salary._id} className="bg-white border-b">
                    <td className="px-6 py-3">{sno++}</td>
                    <td className="px-6 py-3">
                      {salary.employeeId.employeeId}
                    </td>
                    <td className="px-6 py-3">
                      {salary.basicSalary}
                    </td>
                    <td className="px-6 py-3">
                      {salary.allowances}
                    </td>
                    <td className="px-6 py-3">
                      {salary.deductions}
                    </td>
                    <td className="px-6 py-3">
                      {salary.netSalary}
                    </td>
                    <td className="px-6 py-3">
                      {new Date(salary.payDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center text-red-500">
              No Records Found
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default View;