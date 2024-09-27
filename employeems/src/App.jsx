import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Components/Login'
import Dasboard from './Components/Dasboard'
import Home from './Components/Home'
import Employee from './Components/Employee'
import Profile from './Components/Profile'
import Category from './Components/Category'
import AddCategory from './Components/AddCategory'
import AddEmployee from './Components/AddEmployee'
import EditEmployee from './Components/EditEmployee'



function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/adminlogin' element={<Login />}></Route>
        <Route path='/dasboard' element={<Dasboard />}>
            <Route path='' element={<Home />}></Route>
            <Route path='/dasboard/employee' element={<Employee />}></Route>
            <Route path='/dasboard/category' element={<Category />}></Route>
            <Route path='/dasboard/profile' element={<Profile />}></Route>
            <Route path='/dasboard/add_category' element={<AddCategory />}></Route>
            <Route path='/dasboard/add_employee' element={<AddEmployee />}></Route>
            <Route path='/dasboard/edit_employee/:id' element={<EditEmployee />}></Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
