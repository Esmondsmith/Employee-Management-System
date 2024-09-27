import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const AddCategory = () => {

    const [category, setCategory] = useState();

    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        axios.post('http://localhost:3000/auth/add_category', {category})
        .then(result => {
            //console.log(result.data)
            if(result.data.Status){
                navigate('/dasboard/category') //navigate back Category component
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }

  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
        <div className='P-5 rounded w-25 border category-wrapper'>
            
            <h3 className='mb-5'>Add To Category</h3>
            <form onSubmit={handleSubmit}>
                <div className='mb-2 P-4'>
                    <label htmlFor="category"><strong>Category:</strong></label>
                    <input type="text" name="category" value={category} placeholder="Enter Category" className='form-control rounded-0'
                    onChange={(e)=>setCategory(e.target.value)} required/>
                </div>
                <div className='mb-3'>
                    <button className='btn btn-success w-100 rounded-0'>Add</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddCategory


