const express=require('express');
const mysql=require('mysql12');
var inquirer=require('inquirer');
const PORT=process.env.PORT || 3000;
const app= express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

const db=mysql.createConnection({
    host:'localsost',
    user:'root',
    database:'company_db',
    password:'Sudheer@123'

},
console.log(`connected to database`)
);

