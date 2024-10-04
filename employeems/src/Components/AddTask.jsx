
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddTask = () => {
  const [task, setTask] = useState({
    description: "",
    employee_id: ""
  });


  const navigate = useNavigate();

//To retrieve the id from the URL and display on top of the ADD FORM form.
  // We use useParams to retrieve employee ID from URL
  const { id } = useParams();
  //Then we Fetch the specific employee's name
  const [employeeName, setEmployeeName] = useState("");
    useEffect(() => {
      if (id) {
        axios.get(`http://localhost:3000/auth/employee/${id}`)
          .then(result => {
            if (result.data.Status && result.data.Result.length > 0) {
              setEmployeeName(result.data.Result[0].name);
              //To automatically pick the employee in the select drpdwn when the task button is clicked.
              setTask(prevTask => ({ ...prevTask, employee_id: id }));
            } else {
              alert(result.data.Error || "Employee not found");
            }
          })
          .catch(err => console.log(err));
      }
    }, [id]);


// Fetch employees to display in dropdown
  const [employee, setEmployee] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/auth/employee')
      .then(result => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      }).catch(err => console.log(err));
  }, []);


//Handle deleting of a specific task.
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/auth/add_task', task)
      .then(result => {
        if (result.data.Status) {
          navigate('/dasboard/task'); // Navigate back to task component
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
};

  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
      <div className='P-5 rounded w-50 border category-wrapper'>
        <h3 className='mb-5'>Assign Task to {employeeName} </h3>
        <form onSubmit={handleSubmit}>
          <div className='mb-2 P-4'>
            <label htmlFor="task" className='my-2'><strong>Task</strong></label>
            <textarea
              type="text"
              name="task"
              value={task.description}
              placeholder="Write your task here."
              className='form-control rounded-0'
              onChange={(e) => setTask({...task, description: e.target.value})}
              required
            ></textarea>
          </div>

          <div className='mb-2'>
            <label htmlFor="employee" className='my-2'><strong>Assign to Employee</strong></label>
            <select
              className="form-control  rounded-0"
              required
              value={task.employee_id}
              onChange={(e) => setTask({...task, employee_id: e.target.value})} 
            >
              <option value="" disabled>Select Employee</option>
              {employee.map(emp => (
                <option value={emp.id}>{emp.name}</option>
              ))}
            </select>
          </div>
          <div className='mb-3'>
            <button className='btn btn-success w-100 rounded-0'>Assign Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;

