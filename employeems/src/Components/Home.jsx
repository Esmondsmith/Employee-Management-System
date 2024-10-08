import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Home = () => {

  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [categoryTotal, setCategoryTotal] = useState(0);
  const [taskTotal, setTaskTotal] = useState(0);
  const [completedTaskTotal, setCompletedTaskTotal] = useState(0);

  const [admins, setAdmins] = useState([])

  //To fetch the data in order to display the total number of employee, we will use useEffect.
  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    adminRecords();
    categoryCount();
    taskCount();
    completedTask()
  },[])

  //Function for to get number of admin
  const adminCount = () => { //We then call this method inside useEffect.
    axios.get('http://localhost:3000/auth/admin_count') //We go to backend to create this API.
    .then(result => {
      if(result.data.Status){
        setAdminTotal(result.data.Result[0].admin)
      } else {

      }
    })
  }
  //Function for to get number of employees
  const employeeCount = () => { //We then call this method inside useEffect.
    axios.get('http://localhost:3000/auth/employee_count') //We go to backend to create this API.
    .then(result => {
      if(result.data.Status){
        setEmployeeTotal(result.data.Result[0].employee)
      } else {

      }
    })
  }
  //Function for to get number of salary
  const salaryCount = () => { //We then call this method inside useEffect.
    axios.get('http://localhost:3000/auth/salary_count') //We go to backend to create this API.
    .then(result => {
      if(result.data.Status){
        setSalaryTotal(result.data.Result[0].salary)
      } else {

      }
    })
  }
  //Function for to get number of categories
  const categoryCount = () => { //We then call this method inside useEffect.
    axios.get('http://localhost:3000/auth/category_count') //We go to backend to create this API.
    .then(result => {
      if(result.data.Status){
        setCategoryTotal(result.data.Result[0].category)
      }
    })
  }
  const taskCount = () => { //We then call this method inside useEffect.
    axios.get('http://localhost:3000/auth/task_count') //We go to backend to create this API.
    .then(result => {
      if(result.data.Status){
        setTaskTotal(result.data.Result[0].task)
      } 
    })
  }
  const completedTask = () => { //We then call this method inside useEffect.
    axios.get('http://localhost:3000/auth/completed_task_count') //We go to backend to create this API.
    .then(result => {
      if(result.data.Status){
        setCompletedTaskTotal(result.data.Result[0].completedTask)
      }
    })
  }

  const adminRecords = () => {
    axios.get('http://localhost:3000/auth/admin_records') // API created from backend.
    .then(result => {
      if(result.data.Status){
        setAdmins(result.data.Result)
      } else {
        alert(result.data.Error)
      }
    })
  }


  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
      <div className="row g-3 container-fluid">
        {/* Card starts from here */}
        <div className="col-md-4">
          <div className='px-3 pt-2 pb-4 border shadow-sm h-100'>
            <div className='text-center pb-1'>
                <h4>Admin</h4>
            </div>
            <hr />
            <div className='d-flex justify-content-between'>
              <h5 className='fw-bolder'>Total:</h5>
              <h5 className='text-primary fw-bolder'> {adminTotal} </h5>
            </div>
            <div className='mt-4'>
                <Link to={'/dasboard'} className="btn btn-primary">View List</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className='px-3 pt-2 pb-4 border shadow-sm h-100'>
            <div className='text-center pb-1'>
                <h4>Employees</h4>
            </div>
            <hr />
            <div className='d-flex justify-content-between'>
              <h5 className='fw-bolder'>Total:</h5>
              <h5 className='text-primary fw-bolder'> {employeeTotal} </h5>
            </div>
            <div className='mt-4'>
                <Link to={'/dasboard/employee'} className="btn btn-primary">View List</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className='px-3 pt-2 pb-4 border shadow-sm h-100'>
            <div className='text-center pb-1'>
                <h4>Categories</h4>
            </div>
            <hr />
            <div className='d-flex justify-content-between'>
              <h5 className='fw-bolder'>Total:</h5>
              <h5 className='text-primary fw-bolder'> {categoryTotal} </h5>
            </div>
            <div className='mt-4'>
                <Link to={'/dasboard/category'} className="btn btn-primary">View List</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className='px-3 pt-2 pb-4 border shadow-sm h-100'>
            <div className='text-center pb-1'>
                <h4>Salary</h4>
            </div>
            <hr />
            <div className='d-flex justify-content-between'>
              <h5 className='fw-bolder'>Total:</h5>
              <h5 className='text-primary fw-bolder'> &#8358; {salaryTotal} </h5>
            </div>
            <div className='mt-4'>
                <Link to={'/dasboard/employee'} className="btn btn-primary">View List</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className='px-3 pt-2 pb-4 border shadow-sm h-100'>
            <div className='text-center pb-1'>
                <h4>Tasks</h4>
            </div>
            <hr />
            <div className='d-flex justify-content-between'>
              <h5 className='fw-bolder'>Total:</h5>
              <h5 className='text-primary fw-bolder'> {taskTotal} </h5>
            </div>
            <div className='d-flex justify-content-between my-2'>
              <h5 className='fs-6'>COMPLETED TASK:</h5>
              <h5 className='text-primary fs-6'> {completedTaskTotal} </h5>
            </div>
            <div className='d-flex justify-content-between'>
              <h5 className='fs-6'>PENDING TASK:</h5>
              <h5 className='text-primary fs-6'> {taskTotal - completedTaskTotal} </h5>
            </div>
            <div className='mt-4'>
                <Link to={'/dasboard/task'} className="btn btn-primary">View List</Link>
            </div>
          </div>
        </div>
      </div>
    {/* End of card */}
      </div>
        <div className='mt-4 px-5 pt-3'>
          <h3>
            Admin Details
          </h3>
          <table className='table'>
            <thead>
              <tr>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {
                  admins.map( admin => (
                    <tr>
                      <td>{admin.email}</td>
                      <td>
                        <button className='btn btn-info me-2'>Edit</button>
                        <button className='btn btn-danger' >Delete</button>
                      </td>
                    </tr>
                  ))
                }
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default Home