import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import "bootstrap-icons/font/bootstrap-icons.css"



const EmployeePassChange = () => {

    //To navigate
    const navigate = useNavigate();
    //Used to retrieve the ID from the URL.
    const {id} = useParams(); 
  
    
  //State to save employee details.
  const [employee, setEmployee] = useState([]);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [messageColor, setMessageColor] = useState('')

  

  const handleChangePasswordSubmission = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setResponseMessage("New password and confirmation do not match.");
      setMessageColor("error")
      return;
    }
    axios.put('http://localhost:3000/employee/change_password', {
      id: id,
      currentPassword,
      newPassword
    })
    .then(res => {
      setResponseMessage(res.data.Message || res.data.Error);
      if(res.data.Status){
        //navigate('/employee_details/'+id)
        setResponseMessage("Password Changed Successfully!");
        setMessageColor("success")
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
    }
        setTimeout( ()=> {
            setResponseMessage("");
            setMessageColor("")
            //navigate('/employee_details/'+id)
        }, 2000)
    })
    .catch(err => {
        //console.error(err)
      setResponseMessage("An error occurred. Please try again.");
      setMessageColor("error")
    });
  };


  //Next, we fetch the employee's records base on this ID.
  useEffect( () => {
    axios.get('http://localhost:3000/employee/details/'+id)
    .then(result => {
      setEmployee(result.data[0])
    }).catch(err => console.log(err))
  }, [])
  

  useEffect(() => {
    oneEmployeeTaskCount();
  },[]);
 //To get number of pending task in employee profile.
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
            to={"/employee_details/"+id}
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
            <h3 className='text-white'>
              Employee Management System 
            </h3>
          </div>
          <div className="row d-flex justify-content-center ">
            <div className="col-md-8 mb-5 employee_profile_body">
                <div className="card shadow-sm mt-4 ">
                    <div className="card-header text-center bg-color text-white border-none">
                        <h4>Change Your Password</h4>
                    </div>

                    <div className='d-flex justify-content-center align-items-center h-75 my-4'>
                    <div className='P-5 rounded w-50 border wrapper-padding'>
                        <h5 className='mb-5'>Change Your Password, {employee.name}. </h5>
                        <p className={messageColor === 'success' ? 'success-message' : 'error-message'}>
                            {responseMessage}
                        </p>
                        <form onSubmit={handleChangePasswordSubmission}>
                            <div className='col-12 mb-2'>
                                <label htmlFor="currentPass" className='form-label'> <strong>Current Password </strong>  </label>
                                <input type="password" required name="employee-password" id="currentPass" placeholder="Enter Current Password" className='form-control rounded-0' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}/>
                            </div>
                            <div className='col-12 mb-2'>
                                <label htmlFor="newPass" className='form-label'> <strong>New Password </strong>  </label>
                                <input type="password" required name="employee-password" id="newPass" placeholder="Enter New Password" className='form-control rounded-0' value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                            </div>
                            <div className='col-12 mb-2'>
                                <label htmlFor="confirmNewPass" className='form-label'> <strong>Confirm New Password </strong>  </label>
                                <input type="password" required name="employee-password" id="confirmNewPass" placeholder="Confirm New Password" className='form-control rounded-0' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                            </div>
                            {/* Button */}
                            <div className='mb-3'>
                                <button className='btn btn-success w-100 rounded-0'>Change password</button>
                            </div>
                        </form>
                    </div>
                    </div>
                    
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default EmployeePassChange