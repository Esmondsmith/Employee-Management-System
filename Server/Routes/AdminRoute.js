import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"  //for handling the password hashing in nodejs
import multer from "multer"  //for handling the image upload in nodejs
import path from "path"   //for handling the image upload in nodejs
import { console } from "inspector";


const router = express.Router();
 
router.post("/adminlogin", (req, res) => {
    const sql = "SELECT * FROM admin WHERE email = ? and password = ?"
    con.query(sql, [req.body.email, req.body.password], (err, result) => {

        if (err) {
            console.error("SQL Query Error: ", err); // Log the actual error
            return res.json({ loginStatus: false, Error: "Query Error: " + err.message });
        }
        // if(err) return res.json({loginStatus: false, Error: "Query Error."});
        if(result.length > 0){
            const email = result[0].email;
            //Generating a token to save cookie in the browser
            const token = jwt.sign({role: "admin", email: email}, "jwt_secret_key", {expiresIn: "1d"})
            res.cookie('token', token)
            return res.json({loginStatus: true});
        } else {
            return res.json({loginStatus: false, Error: "Wrong Email or Password"})
        }
    })
});


//API for fetching all category
router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category"
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Category Query Error"})
        return res.json({Status: true, Result: result})
     })
})
//Creating API for adding category
router.post('/add_category', (req, res) => {
    //console.log(req.body);
     const sql = "INSERT INTO category (`name`) VALUES (?)" 
     con.query(sql, [req.body.category], (err, result) => { 
        if(err) return res.json({Status: false, Error: "Category Query Error"})
            return res.json({Status: true})
     })
})
//API to delete a category
router.delete('/delete_category/:id', (req, res) => {
    const id = req.params.id;
    //First Check if any employees are associated with this category
    const checkEmployees = "SELECT * FROM employee WHERE category_id = ?";
    con.query(checkEmployees, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error: " + err });
        if (result.length > 0) {
            return res.json({ Status: false, Error: "Cannot delete category as there's employees for this category." });
        }
        // Proceed with category deletion
        const deleteCategory = "DELETE FROM category WHERE id = ?";
        con.query(deleteCategory, [id], (err, result) => {
            if (err) return res.json({ Status: false, Error: "Query Error: " + err });
            return res.json({ Status: true, Result: result });
        });
    });
});


//Handling the image upload
const storage = multer.diskStorage({  //multer.diskStorage take 2 parameters. destination & filename
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename:  (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
 const upload = multer({
    storage: storage
 })  //Now, we will add the constant upload to the add_employee route as  upload.single("image"). Where .single means we are just uploading a single file, and ("image") is the name from the HTML input field for file.


//Creating route for adding employee to database
//upload.single('image') is a middleware used to handle single file uploads for the image field.
router.post('/add_employee', upload.single("image"), (req, res) => {
    const sql = `INSERT INTO employee (name, email, password, address, salary, image, category_id) VALUES (?)`;
    //hashing the password first before sending data to DB.
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.address,
            req.body.salary,
            req.file.filename,  //For file upload
            req.body.category_id,
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Status: false, Error: err})
            return res.json({Status: true})
        })   
    }) 
})


//Fetching all Employees to display on the Employee list page.
router.get('/employee', (req, res) => {
    const sql = "SELECT * FROM employee"
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
     })
})


//API for getting/retaining the employee data by id to be edited via params, to enable editing.
router.get('/employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee WHERE id = ?"
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
     })
}) 

//Route/API to update the employee data after getting a singe employee via id. 
router.put('/edit_employee/:id', upload.single('image'), (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE employee SET name = ?, email = ?, salary = ?, address = ?, category_id = ?, image = ? WHERE id = ?"
    const valuesToUpdate = [
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.address,
        req.body.category_id,
        req.file ? req.file.filename : null // Get image filename if uploaded
    ]
    con.query(sql, [...valuesToUpdate, id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
     })
})


router.delete('/delete_employee/:id', (req, res) => {
    const id = req.params.id;  //We first grab the id of the employee we want to delete.
    const sql = "DELETE FROM employee WHERE id = ?"
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
     })
})



//admin_count API
//Using the mysql count to get the total number of record from the admin table
router.get('/admin_count', (req, res) => {
    const sql = "SELECT COUNT(id) AS admin FROM admin"
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
     })
})
//employee_count API
router.get('/employee_count', (req, res) => {
    const sql = "SELECT COUNT(id) AS employee FROM employee"
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
     })
})
//category_count API to get total category and display on the dashboard homepage.
router.get('/category_count', (req, res) => {
    const sql = "SELECT COUNT(name) AS category FROM category"
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
     })
})
//salary_count API using the SUM to sum up to get total employee salary.
router.get('/salary_count', (req, res) => {
    const sql = "SELECT SUM(salary) AS salary FROM employee"
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
     })
})
//task_count API to get total employee task.
router.get('/task_count', (req, res) => {
    const sql = "SELECT COUNT(id) AS task FROM task"
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
     })
})
//API endpoint for fetching total completed task count
router.get('/completed_task_count', (req, res) => {
    const sql = 'SELECT COUNT(*) AS completedTask FROM task WHERE status = "completed"';
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    });
});

router.get('/admin_records', (req, res) => {
    const sql = "SELECT * FROM admin"
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
     })
});


router.get('/logout', (req, res) => {
    res.clearCookie('token') //This is to clear all cookie upon loggin out. It takes the name of the cookie.
    return res.json({Status: true})

})



//Creating API for adding a Task
router.post('/add_task', (req, res) => {
     const sql = `INSERT INTO task (description, employee_id) VALUES (?)`
     const values = [
        req.body.description,
        req.body.employee_id,
    ]
     con.query(sql, [values], (err, result) => { 
        //console.log(result.data)
        if(err) return res.json({Status: false, Error: "Task Error"+err})
            return res.json({Status: true})
     })
});

//API for fetching all task.
router.get('/task', (req, res) => {
    const sql = "SELECT * FROM task"
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Task Query Error"})
        return res.json({Status: true, Result: result})
     })
})

router.delete('/delete_task/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM task WHERE id = ?"
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
     })
})



export {router as AdminRouter}