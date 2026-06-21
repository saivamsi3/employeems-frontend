import React from 'react'
import { userAuth } from '../context/authContext'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminSidebar from '../components/dashboard/AdminSidebar'
import Navbar from '../components/dashboard/Navbar'
import AdminSummary from '../components/dashboard/AdminSummary'

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