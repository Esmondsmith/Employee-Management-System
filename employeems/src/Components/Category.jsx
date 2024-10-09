import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Trash2 } from 'lucide-react'


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


  //To handle delete of an category
  const handleDelete = (id) =>{
    axios.delete('http://localhost:3000/auth/delete_category/'+id)
    .then(result => {
      if(result.data.Status){
        window.location.reload(); //This will reload our page after deleting a record.
      } else {
        alert(result.data.Error)
      }
    })
  }

  return (
    <div className=' px-5 mt-3'>
        <div className='d-flex justify-content-center'>
            <h3>Category List</h3>
        </div>
        <Link to="/dasboard/add_category" className='btn btn-success'>Add Category</Link>

        <div className='mt-4'>
          <table className='table table-bordered'>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Delete A Category</th>
              </tr>
            </thead>
            <tbody>
              {
                category.map((singleCategory, index) => (
                  <tr>
                    <td>
                       {index + 1}
                    </td>
                    <td>{singleCategory.name}</td>
                    <td>
                      <button className='btn btn-danger' title='delete' onClick={()=>{handleDelete(singleCategory.id)}}><Trash2 /></button>
                      
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

export default Category