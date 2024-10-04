import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';

const Task = () => {
  const [task, setTask] = useState([]);
  const [employee, setEmployee] = useState([]);

  // Fetch tasks
  useEffect(() => {
    axios.get('http://localhost:3000/auth/task')
      .then(result => {
        if (result.data.Status) {
          setTask(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      }).catch(err => console.log(err));
  }, []);


  // Fetch employees
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
  // Helper function to get employee name based on employee_id
  const getEmployeeName = (employeeId) => {
    const employ = employee.find(emp => emp.id === employeeId);
    return employ ? employ.name : 'Unknown Employee';
  };


  // Handle delete task
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/auth/delete_task/${id}`)
      .then(result => {
        if (result.data.Status) {
          window.location.reload(); // Reload the page after deleting a record
        } else {
          alert(result.data.Error);
        }
      });
  };

  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>Employee Task List</h3>
      </div>

      <div className='mt-4'>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Task Assigned</th>
              <th>Employee assigned the Task</th>
              <th>Date Assigned</th>
              <th>Delete A Task</th>
            </tr>
          </thead>
          <tbody>
            {task.map(singleTask => (
              <tr key={singleTask.id}>
                <td>{singleTask.description}</td>
                <td>{getEmployeeName(singleTask.employee_id)}</td> {/* Display the employee name */}
                <td>{singleTask.date}</td>
                <td>
                  <button className='btn btn-danger' title='delete' onClick={() => handleDelete(singleTask.id)}>
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Task;


