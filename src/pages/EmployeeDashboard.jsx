import React from 'react'
import { userAuth } from '../context/authContext'
import Sidebar from '../components/EmployeeDashboard/Sidebar'
import {Outlet} from 'react-router-dom'
import Navbar from '../components/dashboard/Navbar'

function EmployeeDashboard() {
    const {user} = userAuth()
  return (

   <div className='flex'>
      <Sidebar />
   <div className='flex-1 ml-64 min-h-screen'>
        <Navbar/>
        <Outlet />
      </div>
    </div>    
  
  )
}

export default EmployeeDashboard