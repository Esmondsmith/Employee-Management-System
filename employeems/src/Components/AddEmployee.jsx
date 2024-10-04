import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const AddEmployee = () => {

    //Creating an object to capture employee form values
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        password: "",
        salary: "",
        address: "",
        category_id: "",
        image: ""
    });

    //Because we need the category here to populate the employee category select dropdown on the form.
    const [category, setCategory] = useState([])
        useEffect( ()=>{
        axios.get('http://localhost:3000/auth/category')
        .then(result => {
            if(result.data.Status){
            setCategory(result.data.Result)
            } else {
            alert(result.data.Error)
            }
    }).catch( err => console.log(err))
    }, [])

    //To use navigation
    const navigate = useNavigate();


    //To post/send the form data and file/image to the DB.
    const handleSubmit = (e) => {
        e.preventDefault();
        //When passing data from frontend, we use FormData()
        const formData = new FormData();
            formData.append('name', employee.name)
            formData.append('email', employee.email)
            formData.append('password', employee.password)
            formData.append('salary', employee.salary)
            formData.append('address', employee.address)
            formData.append('image', employee.image)
            formData.append('category_id', employee.category_id)

        axios.post('http://localhost:3000/auth/add_employee', formData) //Where formData is our object created.
        .then(result => {
            if(result.data.Status){
                navigate('/dasboard/employee') //navigate back employee list page after adding an emloyee
            } else {
                alert(result.data.Error)
                console.log(result.data.Error.message)
            }
        })
        .catch(err => console.log(err))
    }


  return (
    <div className='d-flex justify-content-center align-items-center m-4'>
        {/* <Link to="/dasboard/employee" className='btn btn-success'>Back to list</Link> */}
    <div className='P-5 rounded w-50 border employee-wrapper'>
        <h3 className='text-center'>Add Employee To List</h3>
        <form className='row g-1' onSubmit={handleSubmit}>
            <div className='col-12 mb-2'>
                <label htmlFor="inputName" className='form-label'> <strong> Name </strong> </label>
                <input type="text" required name="employee-name" id="inputName" placeholder="Enter Name" className='form-control rounded-0' 
                onChange={ (e)=> setEmployee({...employee, name: e.target.value}) }/>
            </div>
            <div className='col-12 mb-2'>
                <label htmlFor="inputEmail4" className='form-label'><strong>  Email </strong>  </label>
                <input type="email" required name="employee-email" id="inputEmail4" placeholder="Enter Email" className='form-control rounded-0' onChange={ (e)=> setEmployee({...employee, email: e.target.value}) }/>
            </div>
            <div className='col-12 mb-2'>
                <label htmlFor="inputPassword4" className='form-label'> <strong> Password </strong>  </label>
                <input type="password" required name="employee-password" id="inputPassword4" placeholder="Enter Password" className='form-control rounded-0' onChange={ (e)=> setEmployee({...employee, password: e.target.value}) }/>
            </div>
            <div className='col-12 mb-2'>
                <label htmlFor="inputSalary" className='form-label'> <strong> Salary </strong> </label>
                <input type="text" required name="employee-salary" id="inputSalary" placeholder="Enter Salary" className='form-control rounded-0' onChange={ (e)=> setEmployee({...employee, salary: e.target.value}) }/>
            </div>
            <div className='col-12 mb-2'>
                <label htmlFor="inputAddress" className='form-label'> <strong> Address </strong> </label>
                <input type="text" required name="employee-address" id="inputAddress" placeholder="E.g., 123 main str." className='form-control rounded-0' onChange={ (e)=> setEmployee({...employee, address: e.target.value}) }/>
            </div>
            <div className='col-12 mb-2'>
                <label htmlFor="inputEmployeeCategory" className='form-label'> <strong> Employee Category </strong> </label> 
                <select name="employeeCategory" id="inputEmployeeCategory" className='form-control rounded-0 form-select' onChange={ (e)=> setEmployee({...employee, category_id: e.target.value}) }>
                    {category.map( (eachCategory) => {
                       return <option value={eachCategory.id}>{eachCategory.name}</option>
                    })} 
                </select>
            </div>
            <div className='col-12 mb-2'>
                <label htmlFor="inputGroupFile01" className='form-label'> <strong> Choose Image </strong> </label>
                <input type="file" required id="inputGroupFile01" name="image" className='form-control rounded-0' onChange={ (e)=> setEmployee({...employee, image: e.target.files[0]}) }/>
            </div>
            <div className='col-12'>
                <button className='btn btn-success w-100 rounded-0'>Add Employee</button>
            </div>
        </form>
    </div>
    </div>
  )
}

export default AddEmployee