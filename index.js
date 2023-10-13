const d =require('./connection');
// require means import
const express = require('express');
const bodyParser= require('body-parser');
var app =express();

app.use(bodyParser.json())//this means what result we get in browser should be in json format

//------------GET

app.get('/employees',(req,res)=>{
    d.query('SELECT * FROM employee',(err,rows)=>{
        if(err){
            console.log(err)
        }
        else{
            //console.log(rows)
            res.send(rows)
        }
    })
})

// only show id which is inserted http://localhost:3060/employees/2 this is done in postman also

app.get('/employees/:id',(req,res)=>{
    d.query('SELECT * FROM employee WHERE id=?',[req.params.id],(err,rows)=>{
        if(err){
            console.log(err)
        }
        else{
            //console.log(rows)
            res.send(rows)
        }
    })
})

//----------DELETE eg- http://localhost:3060/employees/3 means 3rd value will be removed
app.delete('/employees/:id',(req,res)=>{
    d.query('DELETE FROM employee WHERE id=?',[req.params.id],(err,rows)=>{
        if(err){
            console.log(err)
        }
        else{
            //console.log(rows)
            res.send(rows)
        }
    })
})

//------------INSERT 

// for inser in postman write this in body go to raw and type should be json (38:35) look it up
// {
//     "name":"navneet parihar"
//     "salary":5030
// }

app.post('/employees',(req,res)=>{
    var emp = req.body
    var empData = [emp.name,emp.salary]
    d.query('INSERT INTO  employee(name,salary) values(?)',[empData],(err,rows)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(rows)
        }
    })
})

//-----------UPDATE (can be done by 2 ways) 1)patch(for less fileld like 1 to 5 fildes) ,

//2)PUT if we want to do large felid changes

// {
//     "id":4,
//     "name": "prajjwal singh",
//     "salary": 10000000
// }
app.patch('/employees',(req,res)=>{
    var emp = req.body
    d.query('UPDATE employee SET? WHERE id='+emp.id,[emp],(err,rows)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(rows)
        }
    })
})

app.listen(3060,()=>console.log('express server is running on port 3060'))