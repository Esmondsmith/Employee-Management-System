import express from "express";
import con from "../utils/db.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"  //Used here to compare the hashed password from frontend with the one from DB. 


const router = express.Router();

router.post("/employeelogin", (req, res) => {
    const sql = "SELECT * FROM employee WHERE email = ?"
    con.query(sql, [req.body.email], (err, result) => {
        if (err) { return res.json({ loginStatus: false, Error: "Query Error" })}
        if(result.length > 0){
            bcrypt.compare(req.body.password, result[0].password, (err, response) => { //compare the password from the frontend and the result from the DB
                if (err) { return res.json({ loginStatus: false, Error: "Wrong Password" })}
                if(response){
                    const email = result[0].email;
                    const token = jwt.sign({role: "admin", email: email}, "jwt_secret_key", {expiresIn: "1d"});
                    res.cookie('token', token)
                    return res.json({loginStatus: true, id: result[0].id}); //We return the id to be able to receive all employee details via id when we log in
                }
            })      
        } else {
            return res.json({loginStatus: false, Error: "Wrong Email or Password"});
        }
    })
});


//API to fetch employee details via id, and display on employee profile.
router.get('/details/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee WHERE id = ?"
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Error detected"})
        return res.json(result)
    })
});


//API to fetch employee task via id, and display on employee profile in EmployeeDetails componet.
//Used in EmployeeDetails Component
router.get('/employee_task/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM task WHERE employee_id = ?"
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Error detected"})
        return res.json(result)
    })
});

//To get number of all the task of a single employee.
router.get('/single_employee_all_task/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT COUNT(*) AS singleEmployeeTotalTask FROM task WHERE employee_id = ?';
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    });
});

//To get number of an employee pending task notification on his/her dashboard.
router.get('/single_employee_pending_task_count/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT COUNT(*) AS singleEmployeePendingTask FROM task WHERE employee_id = ? AND status = "pending" ';
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    });
});

//Used in EmployeeTask Component
//To get all task details of a single employee from task table.
router.get('/single_employee_task_details/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM task WHERE employee_id = ?';
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    });
});

//To update the status on task table when an employee completes a task.
router.put('/task_status/:id', (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE task SET status = 'completed' WHERE id = ? "
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Error "})
        return res.json(result)
    })
})

//This is to clear all cookie upon loggin out. It takes the name of the cookie.
router.get('/logout', (req, res) => {
    res.clearCookie('token') 
    return res.json({Status: true})

})







export {router as EmployeeRouter};
//Import this file in the index.js file.