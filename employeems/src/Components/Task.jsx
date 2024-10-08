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
              <th className='align-top'>Task Assigned</th>
              <th className='align-top'>Employee assigned the Task</th>
              <th className='align-top'>Date Assigned</th>
              <th className='align-top'>Task Status </th>
              <th className='align-top'>Delete A Task</th>
            </tr>
          </thead>
          <tbody>
            {task.map(singleTask => (
              <tr key={singleTask.id}>
                <td>{singleTask.description}</td>
                <td>{getEmployeeName(singleTask.employee_id)}</td> {/* Display the employee name */}
                <td>{singleTask.date}</td>
                <td>{singleTask.status === 'completed' ?  ( <> <p className="completed_green">Completed</p> </>) : ('Pending')}</td>
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



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Trash2 } from 'lucide-react';

// const Task = () => {
//   const [task, setTask] = useState([]);
//   const [employee, setEmployee] = useState([]);
//   const [selectedTasks, setSelectedTasks] = useState([]); // State to track selected tasks
//   const [selectAll, setSelectAll] = useState(false); // State for "Select All" checkbox

//   // Fetch tasks
//   useEffect(() => {
//     axios.get('http://localhost:3000/auth/task')
//       .then(result => {
//         if (result.data.Status) {
//           setTask(result.data.Result);
//         } else {
//           alert(result.data.Error);
//         }
//       }).catch(err => console.log(err));
//   }, []);

//   // Fetch employees
//   useEffect(() => {
//     axios.get('http://localhost:3000/auth/employee')
//       .then(result => {
//         if (result.data.Status) {
//           setEmployee(result.data.Result);
//         } else {
//           alert(result.data.Error);
//         }
//       }).catch(err => console.log(err));
//   }, []);

//   // Helper function to get employee name based on employee_id
//   const getEmployeeName = (employeeId) => {
//     const employ = employee.find(emp => emp.id === employeeId);
//     return employ ? employ.name : 'Unknown Employee';
//   };

//   // Handle individual task selection
//   const handleTaskSelection = (id) => {
//     setSelectedTasks(prevSelected =>
//       prevSelected.includes(id) ? prevSelected.filter(taskId => taskId !== id) : [...prevSelected, id]
//     );
//   };

//   // Handle "Select All" functionality
//   const handleSelectAll = () => {
//     if (!selectAll) {
//       setSelectedTasks(task.map(singleTask => singleTask.id));
//     } else {
//       setSelectedTasks([]);
//     }
//     setSelectAll(!selectAll);
//   };

//   // Handle delete task
//   const handleDelete = (id) => {
//     axios.delete(`http://localhost:3000/auth/delete_task/${id}`)
//       .then(result => {
//         if (result.data.Status) {
//           setTask(prevTasks => prevTasks.filter(singleTask => singleTask.id !== id));
//         } else {
//           alert(result.data.Error);
//         }
//       });
//   };

//   // Handle bulk delete of selected tasks
//   const handleDeleteSelected = () => {
//     axios.post('http://localhost:3000/auth/delete_tasks', { ids: selectedTasks })
//       .then(result => {
//         if (result.data.Status) {
//           setTask(prevTasks => prevTasks.filter(singleTask => !selectedTasks.includes(singleTask.id)));
//           setSelectedTasks([]);
//           setSelectAll(false);
//         } else {
//           alert(result.data.Error);
//         }
//       }).catch(err => console.log(err));
//   };

//   return (
//     <div className='px-5 mt-3'>
//       <div className='d-flex justify-content-center'>
//         <h3>Employee Task List</h3>
//       </div>

//       <div className='mt-4'>
//         {selectedTasks.length > 0 && (
//           <button className='btn btn-danger mt-3' onClick={handleDeleteSelected}>
//             Delete Selected
//           </button>
//         )}
//         <table className='table table-bordered'>
//           <thead>
//             <tr>
//               <th  className='align-top'>Task Assigned</th>
//               <th className='align-top'>Employee assigned the Task</th>
//               <th className='align-top'>Date Assigned</th>
//               <th className='align-top'>Delete A Task</th>
//               <th> Task Status </th>
//               <th>
//                 <input
//                   type="checkbox"
//                   checked={selectAll}
//                   onChange={handleSelectAll}
//                 /> Select All
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {task.map(singleTask => (
//               <tr key={singleTask.id}>
//                 <td>{singleTask.description}</td>
//                 <td>{getEmployeeName(singleTask.employee_id)}</td>
//                 <td>{singleTask.date}</td>
//                 <td className='text-muted'> pending </td>

//                 <td>
//                   <button className='btn btn-danger' title='delete' onClick={() => handleDelete(singleTask.id)}>
//                     <Trash2 />
//                   </button>
//                 </td>
//                 <td>
//                   <input
//                     type="checkbox"
//                     checked={selectedTasks.includes(singleTask.id)}
//                     onChange={() => handleTaskSelection(singleTask.id)}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Task;
