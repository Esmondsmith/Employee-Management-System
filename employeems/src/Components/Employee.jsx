import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'



const Employee = () => {

  const [employee, setEmployee] = useState([])
  //To display all employee details on this page.
  useEffect( () => {
    axios.get('http://localhost:3000/auth/employee') 
    .then(result => {
      if(result.data.Status){
        setEmployee(result.data.Result)
      } else {
        alert(result.data.Error)
      }
    }).catch( err => console.log(err))
  }, [])//After this, we will move to AdminRoute to fetch all Employees.


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


  //To handle delete of an employee
  const handleDelete = (id) =>{
    axios.delete('http://localhost:3000/auth/delete_employee/'+id)
    .then(result => {
      if(result.data.Status){
        window.location.reload(); //This will reload our page after deleting a record.
      } else {
        alert(result.data.Error)
      };
    })
  }

  return (
    <div className=' px-5 mt-3'>
        <div className='d-flex justify-content-center'>
            <h3>Employee List</h3>
        </div>
        <Link to="/dasboard/add_employee" className='btn btn-success'>Add Employee</Link>
        
        <div className='mt-4'>
          <table className='table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Salary</th>
                <th>Profession</th>
                <th className='text-center'>Photos</th>
                <th className=''>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                employee.map(singleEmployee => (
                  <tr>
                    <td>{singleEmployee.name}</td>
                    <td>{singleEmployee.email}</td>
                    <td>{singleEmployee.address}</td>
                    <td>&#8358;{singleEmployee.salary}</td>
                    <td>{getCategoryName(singleEmployee.category_id)}</td> {/* Display category name */}
                    <td> <img src={`http://localhost:3000/images/` + singleEmployee.image} alt="" className='employee-img'/></td>
                    {/* To access our server-side in our frontend, we go to the index.js and use the "public" folder */}
                    <td>
                      <Link to={"/dasboard/add_task/"+singleEmployee.id} className='btn btn-warning'>Task</Link>
                      <Link to={`/dasboard/edit_employee/`+singleEmployee.id} className='btn btn-info m-2'>Edit</Link>
                      <button className='btn btn-danger' onClick={()=>{handleDelete(singleEmployee.id)}}>Delete</button>
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

export default Employee

