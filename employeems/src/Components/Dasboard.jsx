import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import "bootstrap-icons/font/bootstrap-icons.css"
import axios from 'axios'

const Dasboard = () => {

  const navigate = useNavigate();

  axios.defaults.withCredentials = true; //This help clear all cookies from the browser on logout. 

  const handleLogout = () => {
    // Display confirmation alert
    const userConfirmed = window.confirm("Are you sure you want to log out?");
    // If the user clicked "OK," proceed with logout
    if (userConfirmed) {
        axios.get('http://localhost:3000/auth/logout')
        .then(result => {
            if(result.data.Status){
                navigate('/home');
            }
        })
        .catch(error => console.error("Logout error:", error));
    }
  }



  return (
    <div className='container-fluid'>
      <div className='row flex-nowrap'>
        <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark'>
          <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
            <Link 
            to="/dasboard"
            className='d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none'
            >
              <span className='fs-5 fw-bolder d-none d-sm-inline'>
                Admin Dashboard
              </span>
            </Link>
            <ul className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start' id='menu'>
                <li className='w-100'>
                  <Link to="/dasboard"
                  className='nav-link text-white px-0 align-middle'
                  >
                    <i className='fs-4 bi-speedometer2 ms-2'></i>
                    <span className='ms-2 d-none d-sm-inline'>Dashboard</span>
                  </Link>
                </li>
                <li className='w-100'>
                  <Link to="/dasboard/employee"
                  className='nav-link text-white px-0 align-middle'
                  >
                    <i className='fs-4 bi-people ms-2'></i>
                    <span className='ms-2 d-none d-sm-inline'>Manage Employees</span>
                  </Link>
                </li>
                <li className='w-100'>
                  <Link to="/dasboard/category"
                  className='nav-link text-white px-0 align-middle'
                  >
                    <i className='fs-4 bi-columns ms-2'></i>
                    <span className='ms-2 d-none d-sm-inline'>Category</span>
                  </Link>
                </li>
                <li className='w-100'>
                  <Link to="/dasboard/profile"
                  className='nav-link text-white px-0 align-middle'
                  >
                    <i className='fs-4 bi-person ms-2'></i>
                    <span className='ms-2 d-none d-sm-inline'>Profile</span>
                  </Link>
                </li>
                <li className='w-100'>
                  <Link to="/dasboard"
                  className='nav-link text-white px-0 align-middle'
                  onClick={handleLogout}
                  >
                    <i className='fs-4 bi-power ms-2'></i>
                    <span className='ms-2 d-none d-sm-inline'>Logout</span>
                  </Link>
                </li>
            </ul>
          </div>
        </div>
        <div className='col m-0 p-0 '>
          <div className='p-2 d-flex justify-content-center shadow'>
            <h4>
              Employee Management System
            </h4>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dasboard