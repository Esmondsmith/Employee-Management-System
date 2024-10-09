import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
  return localStorage.getItem("valid") ? children : <Navigate to="/" />
}

export default PrivateRoute

//This was used to protect route so that after loging out, you can cannot use to browser back button to return back to the same page