import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Category = () => {

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
  }, []) //After this, we will move to AdminRoute to fetch all Category

  return (
    <div className=' px-5 mt-3'>
        <div className='d-flex justify-content-center'>
            <h3>Category List</h3>
        </div>
        <Link to="/dasboard/add_category" className='btn btn-success'>Add Category</Link>

        <div className='mt-4'>
          <table className='table'>
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {
                category.map(singleCategory => (
                  <tr>
                    <td>{singleCategory.name}</td>
                  </tr> 
                ))
              }
             
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default Category