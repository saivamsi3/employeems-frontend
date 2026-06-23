import React from 'react'
import { userAuth } from '../../context/authContext.jsx'

const NavBar = () => {
    const {user , logout} = userAuth()
  return (
 <div className='flex items-center text-white justify-between h-12 bg-teal-600 px-5'>
    <p>WellCome {user.name}</p>
    <button className='px-4 py-1 bg-teal-700 hover:bg-red-600 rounded-4xl' onClick={logout}>LogOut</button>


 </div>
  )
}

export default NavBar