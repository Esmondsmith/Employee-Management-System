import mysql from 'mysql'

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employeems"
})

con.connect((err) => {
    if(err){
        console.log('Error! Cannot connect')
    } else {
        console.log('connected succefully')
    }
})

export default con;