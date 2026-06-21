import React, { useState } from 'react'
import axios from "axios"
import { userAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const { login } = userAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      )

      console.log(response.data)

      if (response.data.success) {

        // ✅ FIX: pass token also to context
        login(response.data.user, response.data.token)

        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard")
        } else {
          navigate("/employee-dashboard")
        }
      }

    } catch (error) {

      if (error.response) {
        setError(error.response.data.error)
      } else {
        setError("Server Error")
      }
    }
  }

  return (
    <div className='flex h-screen flex-col items-center justify-center space-y-6 bg-linear-to-b from-teal-600 from-50% to-gray-100 to-50%'>

      <p className='font-sevillana text-3xl text-white'>
        Employee Management system
      </p>

      <div className='border shadow p-6 w-80 bg-white'>

        <h2 className='text-2xl font-bold mb-4'>Login</h2>

        {error && (
          <p className='text-red-500 mb-4 text-sm'>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className='mb-4'>
            <label className='block text-gray-700'>Email</label>
            <input
              type="email"
              className='w-full px-3 py-2 border'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className='mb-4'>
            <label className='block text-gray-700'>Password</label>
            <input
              type="password"
              className='w-full px-3 py-2 border'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Remember */}
          <div className='mb-4 flex items-center justify-between'>
            <label className='inline-flex items-center'>
              <input type="checkbox" className='form-checkbox' />
              <span className='ml-2 text-gray-700'>Remember me</span>
            </label>

            <a href="#" className='text-teal-600'>
              Forgot Password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            className='w-full bg-teal-600 text-white py-2'
          >
            Login
          </button>

        </form>

      </div>
    </div>
  )
}

export default Login