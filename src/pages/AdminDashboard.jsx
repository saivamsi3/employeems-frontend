import React from 'react'
import { userAuth } from '../context/authContext.jsx'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminSidebar from '../components/dashboard/AdminSidebar.jsx'
import Navbar from '../components/dashboard/Navbar.jsx'
import AdminSummary from '../components/dashboard/AdminSummary.jsx'

function AdminDashboard() {
  const { user, loading } = userAuth()
  const navigate = useNavigate()

  

  return (
    <div className='flex'>
      <AdminSidebar />
   <div className='flex-1 ml-64 min-h-screen'>
        <Navbar/>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminDashboard