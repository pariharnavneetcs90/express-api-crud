// this is done for making conncetion with database
// a= sql,b=mysqlConnection,c=connection
const a = require('mysql2');

var b = a.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'employeedb'
})

b.connect((err)=>{
    if(err){
        console.log('error in db connection'+JSON.stringify(err,undefined,2));
    }
    else{
        console.log('DB connection successfully')
    }
})
module.exports=b