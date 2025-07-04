import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import "bootstrap-icons/font/bootstrap-icons.css"

const EmployeeDetails = () => {

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

  //We used this API to fetch all tasks for the task list table. However, we also use it to track pending task and then display all pending tasks one after the other on the employee profile page passing the [id] as dependency.
  useEffect(() => {
    axios.get('http://localhost:3000/employee/employee_task/' + id)
      .then(result => {
        // Filter the tasks to only include those with status 'pending'
        const pendingTask = result.data.find(task => task.status === 'pending');
        setEmployeeTask(pendingTask); // Set only the pending task to state
      }).catch(err => console.log(err));
  }, [id]);

  useEffect(() => {
    oneEmployeeTaskCount();
  },[]);
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
  

  // Used to get the logged in employee job category
  const [categories, setCategories] = useState([]); 
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


  const [taskCompleteResponse, setTaskCompleteResponse] = useState("")
  //To handle task completed or pending task_status
  const taskIsCompleted = (id) => {
    axios.put(`http://localhost:3000/employee/task_status/${id}`)
      .then(response => {
        if (response.data.Status) {
          setEmployeeTask(prevTask => ({ ...prevTask, status: 'completed' }));
        }
        window.location.reload();
        setTaskCompleteResponse('Task Completed!')
      })
      .catch(err => console.log(err));
  };


  const handleLogout = () => {
    const userConfirmed = window.confirm("Are you sure you want to log out?");
    //Here, we call our API and then return our result.
    if(userConfirmed){
        axios.get('http://localhost:3000/employee/logout')
        .then(result => {
        if(result.data.Status){
          localStorage.removeItem("valid"); //For protected employee route
          navigate('/');
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
                  <Link to="#"
                  className='nav-link text-white px-0 align-middle'
                  >
                    <i className='fs-4 bi-person ms-2'></i>
                    <span className='ms-2 d-none d-sm-inline'>Profile</span>
                  </Link>
                </li>
                <li className='w-100' title={`You have ${singleEmployeePendingTask} pending task.`}>
                  <Link to=""
                  className='nav-link text-white px-0 align-middle position-relative'
                  >
                    <i className='fs-4  bi-bell-fill ms-2'></i>
                    <span className="notice">{singleEmployeePendingTask}</span>
                    <span className='ms-2 d-none d-sm-inline'>Notifications</span>
                  </Link>
                </li>

                <li className='w-100'>
                  <Link to={`/employee_pass_change/${id}`}
                  className='nav-link text-white px-0 align-middle'
                  >
                    <i className='fs-4 bi bi-shield-lock ms-2'></i>
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
          <div className="row d-flex justify-content-center">
            <div className="col-md-8 mb-5 employee_profile_body">
                <div className="card shadow-sm mt-4 ">
                    <div className="card-header text-center bg-color text-white border-none">
                        <h3>Employee Profile</h3>
                    </div>
                    <div className="card-body text-center">
                      <img src={`http://localhost:3000/images/`+employee.image} alt="" className="employee_image rounded-2" />
                      <h4 className="card-title">{employee.name}</h4>
                      <p className="card-text text-muted fs-5">{getCategoryName(employee.category_id)}</p>
                    </div>
                    <ul className="list-group list-group-flush" id="profileDetails">
                        <li className="list-group-item"><strong>Email:</strong> {employee.email} </li>
                        <li className="list-group-item"><strong>Salary:</strong> &#8358;{employee.salary} </li>
                        <li className="list-group-item"><strong>Address:</strong> {employee.address} </li>
                    </ul>
                    <div className="text-center">
                      <h5>TASK DESCRIPTION</h5>
                    </div>
                    <div className=''>
                      <p className='ms-3' > <strong>Your recent task is: </strong> <br /> 
                        {employeeTask && employeeTask.description ? employeeTask.description : "No task yet..."}
                      </p>
                      <h5 className='completed_green ms-3'>{taskCompleteResponse}</h5>
                      {/* This button appears only if there's a task */}
                        {employeeTask && employeeTask.description && employeeTask.status !== 'completed' && (
                          <button type="button" className="btn btn-color .btn-color:hover ms-3 m-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Click after completion
                          </button>
                        )}
                        
                                              
                        {/* <!-- Modal body--> */}
                        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                          <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                              <div className="modal-header">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                                <h4>Have you completed this task?</h4>
                              </div>
                              <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => taskIsCompleted(employeeTask.id)}>Yes</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* End of task modal */}
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDetails