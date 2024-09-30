import React from 'react'
import './style.css'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'


    
const EmployeeLogin = () => {

    const [showPassword, setShowPassword] = useState(false) //For password visibility.
        const passwordVisibility = (inputField) => {
            if (inputField === 'password') {
            setShowPassword(!showPassword)
            }
        }

    const [values, setValues] = useState({
        email: '',
        password: '',
    })
    

    const navigate = useNavigate();

    //To add cookies to browser
    axios.defaults.withCredentials = true;

    //saving the error inside a variable first
    const [error, setError] = useState(null);
 
    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:3000/employee/employeelogin', values) //axios.post to post our data. It take the URI of the server/port we are using from our server side, and the initial state of our variable.
        .then(result => {
             if(result.data.loginStatus){
                navigate('/employee_details/'+result.data.id);    
             } else {
                setError(result.data.Error);
             }
        })
        .catch(err => console.log(err))
    }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='P-3 rounded w-25 border loginForm'>
            <div className='text-danger'>
                {error && error}
            </div>
            <h2 className=''>Login, Employee.</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-2'>
                    <label htmlFor="email"><strong>Email:</strong></label>
                    <input type="email" name="email" value={values.email} placeholder="Enter Email" autoComplete='off' className='form-control rounded-0'
                    onChange={(e)=>setValues({...values, email: e.target.value})}/>
                </div>
                <div className='mb-3 adjust-eye-div'>
                    <label htmlFor="password"><strong>Password:</strong></label>
                    <input type={showPassword ? "text" : "password"} name="password" value={values.password} placeholder="Enter Password" className='form-control rounded-0'onChange={(e)=>setValues({...values, password: e.target.value})}/>
                    <button
                        type="button"
                        onClick={() => passwordVisibility('password')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt- adjust-eye"
                    >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                </div>
                <div className='mb-3'>
                    <button className='btn btn-success w-100 rounded-0'>Log in</button>
                </div>
                <div>
                    <input type="checkbox" name="tick" id='tick' className='me-2'/>
                    <label htmlFor="tick">Agree to tearms and condition</label>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EmployeeLogin