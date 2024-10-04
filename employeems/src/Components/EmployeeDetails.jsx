import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import "bootstrap-icons/font/bootstrap-icons.css"

const EmployeeDetails = () => {

  const [employee, setEmployee] = useState([]);

  const navigate = useNavigate();

  const {id} = useParams(); //First, we grab the ID from the URL.

  //Next, we fetch the records base on this ID.
  useEffect( () => {
    axios.get('http://localhost:3000/employee/details/'+id)
    .then(result => {
      setEmployee(result.data[0])
    }).catch(err => console.log(err))
  }, [])


  const [categories, setCategories] = useState([]); // State to store categories
  useEffect(() => {
    axios.get('http://localhost:3000/auth/category')
      .then(result => {
        if (result.data.Status) {
          setCategories(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      }).catch(err => console.log(err));
  }, []);
  // Function to get category name by category_id
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown Profession';
  };

  // const [task, setTask] = useState([]); // State to store task
  // useEffect(() => {
  //   axios.get('http://localhost:3000/auth/task')
  //     .then(result => {
  //       if (result.data.Status) {
  //         setTask(result.data.Result);
  //       } else {
  //         alert(result.data.Error);
  //       }
  //     }).catch(err => console.log(err));
  // }, []);
  // // Function to get category name by category_id
  // const getTaskDesc = (taskId) => {
  //   const taskss = task.find(tsk => tsk.id === taskId);
  //   return taskss ? taskss.description : 'No Task';
  // };


  const handleLogout = () => {
    const userConfirmed = window.confirm("Are you sure you want to log out?");
    //Here, we call our API and then return our result.
    if(userConfirmed){
        axios.get('http://localhost:3000/employee/logout')
        .then(result => {
        if(result.data.Status){
          navigate('/home')
        }
      })
    }
    
  }

  return (
    <div className='container-fluid'>
      <div className='row flex-nowrap'>
        <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-color'>
          <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
            <Link 
            to="#"
            className='d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none'
            >
              <span className='fs-5 fw-bolder d-none d-sm-inline'>
              <img src={`http://localhost:3000/images/`+employee.image} alt="" className="employee_image_dashboard" />
              {employee.name}
              </span>
            </Link>
            <ul className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start' id='menu'>
                <li className='w-100'>
                  <Link to="#"
                  className='nav-link text-white px-0 align-middle'
                  >
                    <i className='fs-4 bi-person ms-2'></i>
                    <span className='ms-2 d-none d-sm-inline'>Profile</span>
                  </Link>
                </li>
                <li className='w-100'>
                  <Link to=""
                  className='nav-link text-white px-0 align-middle'
                  >
                    <i className='fs-4 bi-people ms-2'></i>
                    <span className='ms-2 d-none d-sm-inline'>Change Password</span>
                  </Link>
                </li>
                <li className='w-100'>
                  <Link to=""
                  className='nav-link text-white px-0 align-middle'
                  >
                    <i className="fs-4 bi bi-pencil-square ms-2"></i>
                    <span className='ms-2 d-none d-sm-inline'>Edit Details</span>
                  </Link>
                </li>
                <li className='w-100'>
                  <Link to={`/home`}
                  className='nav-link text-white px-0 align-middle'
                  >
                    <i className='fs-4 bi-power ms-2'></i>
                    <span className='ms-2 d-none d-sm-inline'>Logout</span>
                  </Link>
                </li>
            </ul>
          </div>
        </div>
        <div className='col m-0 p-0 '>
          <div className='p-2 d-flex justify-content-center shadow bg-color'>
            <h4 className='text-white'>
              Employee Management System
            </h4>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8 mb-5">
                <div className="card shadow-sm mt-4">
                    <div className="card-header text-center bg-color text-white border-none">
                        <h3>Employee Profile</h3>
                    </div>
                    <div className="card-body text-center">
                    <img src={`http://localhost:3000/images/`+employee.image} alt="" className="employee_image rounded-2" />
                    <h4 className="card-title">{employee.name}</h4>
                        <p className="card-text text-muted fs-5">{getCategoryName(employee.category_id)}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><strong>Name:</strong> {employee.name} </li>
                        <li className="list-group-item"><strong>Email:</strong> {employee.email} </li>
                        <li className="list-group-item"><strong>Salary:</strong> &#8358;{employee.salary} </li>
                        {/* <li className="list-group-item"><strong>Task:</strong>  </li> */}
                    </ul>
                    <div className="card-footer text-center">
                      <button className="btn btn-primary me-2">Edit</button>
                      <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                    </div>
                    {/* <label htmlFor="" className='ms-3'><strong>Task:</strong></label> */}
                    {/* <textarea disabled name="" id="" className='form-group'> {getTaskDesc(employee.task_id)} </textarea> */}
                </div>
            </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDetails