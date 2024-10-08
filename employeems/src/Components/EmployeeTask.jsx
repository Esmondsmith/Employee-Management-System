import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import "bootstrap-icons/font/bootstrap-icons.css"

const EmployeeTask = () => {

  //State to save employee details.
  const [employee, setEmployee] = useState([]);

  //For employee task state.
  const [employeeTask, setEmployeeTask] = useState([]);

  const navigate = useNavigate();

  //First, we grab the ID from the URL.
  const {id} = useParams(); 

  //Next, we fetch the employee's records base on this ID.
  useEffect( () => {
    axios.get('http://localhost:3000/employee/details/'+id)
    .then(result => {
      setEmployee(result.data[0])
    }).catch(err => console.log(err))
  }, [])

 // Fetch tasks
 useEffect(() => {
    axios.get('http://localhost:3000/employee/single_employee_task_details/'+id)
      .then(result => {
        if (result.data.Status) {
            setEmployeeTask(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      }).catch(err => console.log(err));
  }, [])
  
  useEffect(() => {
    oneEmployeeTaskCount();
    employeeAllTask();
  },[]);
  //To get employee total tasks.
  const [employeeTotalTask, setEmployeeTotalTask] = useState(0);
  const employeeAllTask = () => { //We then call this method inside useEffect.
    axios.get('http://localhost:3000/employee/single_employee_all_task/'+id) //We go to backend to create this API.
    .then(result => {
      if(result.data.Status){
        setEmployeeTotalTask(result.data.Result[0].singleEmployeeTotalTask)
      } 
    })
  }
  // //To get number of pending task in employee profile.
  const [singleEmployeePendingTask, setSingleEmployeePendingTask] = useState(0);
  const oneEmployeeTaskCount = () => { //We then call this method inside useEffect.
    axios.get('http://localhost:3000/employee/single_employee_pending_task_count/'+id) //We go to backend to create this API.
    .then(result => {
      if(result.data.Status){
        setSingleEmployeePendingTask(result.data.Result[0].singleEmployeePendingTask)
      } 
    })
  }
  

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
        {/* side bar start */}
        <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-color position-fixed' style={{height: "100vh"}}>
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
                  <Link to={"/employee_details/"+id}
                  className='nav-link text-white px-0 align-middle'
                  >
                    <i className='fs-4 bi-person ms-2'></i>
                    <span className='ms-2 d-none d-sm-inline'>Back To Profile</span>
                  </Link>
                </li>
                <li className='w-100' title={`You have ${singleEmployeePendingTask} task left to complete.`}>
                  <Link to=""
                  className='nav-link text-white px-0 align-middle position-relative'
                  >
                    <i className='fs-4  bi-bell-fill ms-2'></i>
                    <span className="notice">{singleEmployeePendingTask}</span>
                    <span className='ms-2 d-none d-sm-inline'>Notifications</span>
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
                  <Link to={`/employee_task/${id}`}
                  className='nav-link text-white px-0 align-middle'
                  >
                    <i className=" fs-4 bi bi-list-task ms-2"></i>
                    <span className='ms-2 d-none d-sm-inline'>Task Activities</span>
                  </Link>
                </li>
                <li className='w-100 mt-4'>
                      <button className="btn btn-danger" onClick={handleLogout}> <i className=' bi-power '></i> Logout</button>
                </li>
            </ul>
          </div>
        </div>
        {/* Side bar ends here */}
        <div className='col m-0 p-0'>
          <div className='p-2 d-flex justify-content-center shadow bg-color'>
            <h4 className='text-white'>
              Employee Management System 
            </h4>
          </div>
          <div className="row d-flex justify-content-center ">
            <div className="col-md-8 mb-5 employee_profile_body">
                <div className="card shadow-sm mt-4 ">
                    <div className="card-header text-center bg-color text-white border-none">
                        <h3>Employee Task Activities</h3>
                    </div>
                    <div className=''>
                        <h3 className='text-center mt-3'>Task Status</h3>
                        <table className='table table-bordered my-4'>
                            <thead>
                                <tr>
                                <th className='align-top'>Total Recent Task Assigned</th>
                                <th className='align-top'>Completed</th>
                                <th className='align-top'>Pending </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{employeeTotalTask}</td>
                                    <td>{employeeTotalTask - singleEmployeePendingTask}</td>
                                    <td>{singleEmployeePendingTask}</td> 
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
            
                    <br /><br /><br />

                    <div className=''>
                        <h3 className='text-center'>Task Details</h3>
                        <table className='table table-bordered my-4'>
                            <thead>
                                <tr>
                                <th className='align-top'>Task Description</th>
                                <th className='align-top'>Date Assigned</th>
                                <th className='align-top'>Task Status </th>
                                </tr>
                            </thead>
                            <tbody>
                            {employeeTask.map(singleTask => (
                            <tr key={singleTask.id}>
                                <td>{singleTask.status === 'completed' ? (<><del>{singleTask.description}</del></>) : singleTask.description}</td>
                                <td>{singleTask.date}</td>
                                <td>{singleTask.status === 'completed' ?  ( <> <p className="completed_green">Completed</p> </>) : ('Pending')}
                                </td>
                            </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeTask;
 