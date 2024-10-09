import express from "express";
import cors from "cors";
import { AdminRouter } from "./Routes/AdminRoute.js";
import { EmployeeRouter } from "./Routes/EmployeeRoute.js";
import cookieParser from "cookie-parser"

const app = express();
app.use(cors({
    origin: ["http://localhost:5173"], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())
app.use('/auth', AdminRouter) //Add auth to all related route
app.use('/employee', EmployeeRouter) //Add employee to all related route
app.use(express.static('public'))


//Creating a middleware for authentification.
//next helps us get back to our route
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(token){
        jwt.verify(token, "jwt_secret_key", (err, decoded) => {
           //Decoded values are role and email from the login api route 
            if(err){res.json({Status: false, Error: "Wrong token"})}
            req.id = decoded.id;
            req.role = decoded.role;
            next();
        })
    } else {
        return res.json({Status: false, Error: 'Not Verified'})
    }
}
app.get('/verify', verifyUser, (req, res) => {
    return res.json({Status: true, role: req.role, id: req.id})
})


app.listen(3000, () => {
    console.log('server is running on port 3000')
})