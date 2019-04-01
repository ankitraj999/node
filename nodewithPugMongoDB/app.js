const express=require('express');
const path=require('path')
const mongoose=require('mongoose')
let Employee=require('./modal/employee')
let bodyParser=require('body-parser')

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/mypugDB')
let db=mongoose.connection
db.once('open',function(){
    console.log('connection open')
});
//other way
// mongoose.connection.once('open',function(){
//     console.log('connection open')
// });
const app=express();
//load view engine
app.set('views',path.join(__dirname,'views'))
app.set('view engine','pug');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// var newitem=new Employee({
//     empid:4,
//     empname:'ali',
//     empdept:'It',
//     empsalary:900
// });

// newitem.save((err,item)=>{
//     if(err)
//     {
//         console.log(err)
//     }
//     else{
//        console.log('inserted');
//     }
// })

//posting the data
app.post('/emp/adddata',function(req,res){
    let emp=new Employee();
emp.empid=req.body.eid;
emp.empname=req.body.ename;
emp.empdept=req.body.edep;
emp.empsalary=req.body.esal;
emp.save(function(err){
if(err){
    console.log(err);
    return;
}else{
     res.redirect('/');
}
});

});


app.get('/',function(req,res){
    Employee.find({},function(err,employeeData){
       res.render('index',{
           title:'This is capgemini R&D',
           empData:employeeData,
           emg:'L&D Department'
       })
    })    
})
//route addemployee
app.get('/add',function(req,res){
    res.render('addEmployee',{
        data:'this is from home'
    });
});


//rout home
app.get('/home',function(req,res){
    res.render('home',{
        mydata:'this is from home'
    });
});

//making the port
app.listen(1000,function(){
    console.log('server is running on 1000')
})