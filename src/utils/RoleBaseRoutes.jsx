import React from 'react'
import { userAuth } from '../context/authContext'
import {Navigate} from "react-router-dom"

function RoleBaseRoutes({children , roles}) {
 const {user , loading} = userAuth()
if(loading){
   return  <div>Loading...</div>
}
  if (!user) {
        return <Navigate to="/login" />
    }


 if(!roles.includes(user.role)){
     return  <Navigate to={user.role === "admin" ? "/admin-dashboard" : "/employee-dashboard"}/>
 }
     return user ? children: <Navigate to ="/login"/> 
 
}

export default RoleBaseRoutes
