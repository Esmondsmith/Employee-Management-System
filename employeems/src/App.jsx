import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route, } from 'react-router-dom'
import Login from './Components/Login'
import Dasboard from './Components/Dasboard'
import Home from './Components/Home'
import Employee from './Components/Employee'
import Profile from './Components/Profile'
import Category from './Components/Category'
import AddCategory from './Components/AddCategory'
import AddEmployee from './Components/AddEmployee'
import EditEmployee from './Components/EditEmployee'

import EmployeeDetails from './Components/EmployeeDetails'
import Start from './Components/Start'
import EmployeeLogin from './Components/EmployeeLogin'
import AddTask from './Components/AddTask'
import Task from './Components/Task'
import EmployeeTask from './Components/EmployeeTask'
import EmployeePassChange from './Components/EmployeePassChange'
import PrivateRoute from './Components/PrivateRoute'



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Start />}></Route>
        <Route path='/adminlogin' element={<Login />}></Route>
        <Route path='/employeelogin' element={<EmployeeLogin />}></Route> 
        <Route path='/employee_details/:id' element={<EmployeeDetails />}></Route>
        <Route path='/employee_task/:id' element={<EmployeeTask />} />
        <Route path='/employee_pass_change/:id' element={<EmployeePassChange />} />
        <Route path='/dasboard' element={
          <PrivateRoute>
            <Dasboard />
          </PrivateRoute>
        }>      
            <Route path='' element={<Home />}></Route>
            <Route path='/dasboard/employee' element={<Employee />}></Route>
            <Route path='/dasboard/category' element={<Category />}></Route>
            <Route path='/dasboard/profile' element={<Profile />}></Route>
            <Route path='/dasboard/add_category' element={<AddCategory />}></Route> 
            <Route path='/dasboard/add_employee' element={<AddEmployee />}></Route>
            <Route path='/dasboard/edit_employee/:id' element={<EditEmployee />}></Route>
            <Route path='/dasboard/add_task/:id' element={<AddTask />}></Route>
            <Route path='/dasboard/task' element={<Task />}></Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App




