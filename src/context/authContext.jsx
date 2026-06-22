import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast'

const UserContext = createContext();

function AuthContext({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_API_URL;

  //  VERIFY USER ON PAGE LOAD
  useEffect(() => {

    const verifyUser = async () => {
      try {

        const token = localStorage.getItem("token");

        if (!token) {
          setUser(null);
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${url}/api/auth/verify`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (response.data.success) {
          setUser(response.data.user);
        } else {
          setUser(null);
          localStorage.removeItem("token");
        }

      } catch (error) {
        setUser(null);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    verifyUser();

  }, []);

  //  LOGIN 
  const login = (user, token) => {
    setUser(user);
    localStorage.setItem("token", token);
  };

  //  LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading, url }}>
      <Toaster>
        {children}
      </Toaster>
      
    </UserContext.Provider>
  );
}

export const userAuth = () => useContext(UserContext);

export default AuthContext;