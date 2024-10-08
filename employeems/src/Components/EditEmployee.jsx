import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom' 

const EditEmployee = () => {

    //First, we grab the id from our URL
    //useParams check which id was passed in the URL.
    const {id} = useParams();

    //Bringing these fields because we want to maintain the old data before editing values.
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        salary: "",
        address: "",
        category_id: "",
        image: "" //Add this only if edit form include image upload.
    });

    //We have this here in order to retain all categories from the DB as required in the select-dropdown.
    const [category, setCategory] = useState([])
    useEffect( ()=>{
        //To use/retain the details of the select dropdown
        axios.get('http://localhost:3000/auth/category')
        .then(result => {
        if(result.data.Status){
            setCategory(result.data.Result)
        } else {
            alert(result.data.Error)
        }
        }).catch( err => console.log(err))

        //This is to fetch/retain the old data of the employee before edit.
        axios.get('http://localhost:3000/auth/employee/'+id) //We create an API for this route
        .then( result => {
            setEmployee({
                ...employee,
                name: result.data.Result[0].name,
                email: result.data.Result[0].email,
                salary: result.data.Result[0].salary,
                address: result.data.Result[0].address,
                category_id: result.data.Result[0].category_id, //This will leave a default value in the select dropdown 
                image: result.data.Result[0].image,
            })
        }).catch( err => console.log(err))
    }, [])

    //To use navigation
    const navigate = useNavigate();

    //To handle submission of eddited employee details with image upload.
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(); // Create a FormData object
            formData.append("name", employee.name);
            formData.append("email", employee.email);
            formData.append("salary", employee.salary);
            formData.append("address", employee.address);
            formData.append("category_id", employee.category_id);
            formData.append("image", employee.image); 
        axios.put(`http://localhost:3000/auth/edit_employee/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data", // Ensure proper encoding
            }
        }) .then(result => {
            if (result.data.Status) {
                navigate('/dasboard/employee');
            } else {
                alert(result.data.Error);
            }
        }).catch(err => console.log(err));
    };

//EDITING WITHOUT INCLUDING IMAGE/FILE FIELD TO EDIT FORM.
    //To handle submission of the edit form.
    //const handleSubmit = (e) => {
    //     e.preventDefault();
    //     axios.put('http://localhost:3000/auth/edit_employee/'+id, employee)
    //     .then(result => {
    //         if(result.data.Status){
    //             navigate('/dasboard/employee') //navigate back employee list page
    //         } else {
    //             alert(result.data.Error)
    //         }
    //     }).catch(err => console.log(err))
    // }


  return (
     <div className='d-flex justify-content-center align-items-center m-4'>
        {/* <Link to="/dasboard/employee" className='btn btn-success'>Back to list</Link> */}
    <div className='P-5 rounded w-50 border employee-wrapper'>
        <h3 className='text-center'>Edit this employee details</h3>
        <form className='row g-1' onSubmit={handleSubmit}>
            <div className='col-12 mb-2'>
                <label htmlFor="inputName" className='form-label'> <strong> Name </strong> </label>
                <input type="text" name="employee-name" id="inputName" placeholder="Enter Name" className='form-control rounded-0' value={employee.name}
                onChange={ (e)=> setEmployee({...employee, name: e.target.value}) }/>
            </div>
            <div className='col-12 mb-2'>
                <label htmlFor="inputEmail4" className='form-label'><strong>  Email </strong>  </label>
                <input type="email" name="employee-email" id="inputEmail4" value={employee.email} placeholder="Enter Email" className='form-control rounded-0' onChange={ (e)=> setEmployee({...employee, email: e.target.value}) }/>
            </div>
            <div className='col-12 mb-2'>
                <label htmlFor="inputSalary" className='form-label'> <strong> Salary </strong> </label>
                <input type="text" name="employee-salary" value={employee.salary} id="inputSalary" placeholder="Enter Salary" className='form-control rounded-0' onChange={ (e)=> setEmployee({...employee, salary: e.target.value}) }/>
            </div>
            <div className='col-12 mb-2'>
                <label htmlFor="inputAddress" className='form-label'> <strong> Address </strong> </label>
                <input type="text" name="employee-address" id="inputAddress" value={employee.address} placeholder="E.g., 123 main str." className='form-control rounded-0' onChange={ (e)=> setEmployee({...employee, address: e.target.value}) }/>
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
                <button className='btn btn-success w-100 rounded-0'>Upadate Employee</button>
            </div>
        </form>
    </div>
    </div>
  )
}

export default EditEmployee
