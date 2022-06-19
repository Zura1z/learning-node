const express = require('express');
const Joi = require('joi');

const app = express();

app.use(express.json())
var courses = [
    {   id:1,name:'Course1' },
    {   id:2,name:'Course2'},
    {   id:3,name:'Course3'},
];

app.get('/',(req,res)=>{
    res.send('Hello World');    
})
app.get('/api/courses',(req,res)=>{
    res.send(courses);    
})
app.get('/api/courses/:id',(req,res)=>{
    course = courses.find(c => c.id === parseInt(req.params.id)) ;
    if(!course) return res.status(404).send("The courses with given id was not found");
    res.send(course);
})
app.post('/api/courses/',(req,res)=>{
    const { error } = validateCourse(req.body);
    if(error){
        // 400 => bad request
        return res.status(400).send(result.error.details[0].message);
        return;
    }

    const course ={
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course); 
})

app.put('/api/courses/:id',(req,res)=>{
    course = courses.find(c => c.id === parseInt(req.params.id)) ;
    if(!course) return res.status(404).send("The courses with given id was not found");
    else console.log("No error");
    

    const { error } = validateCourse(req.body);
    if(error){
        // 400 => bad request
        console.log("Error here")
        res.status(400).send(result.error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);
    
})
app.delete('/api/courses/:id',(req,res)=>{
    course = courses.find(c => c.id === parseInt(req.params.id)) ;
    if(!course) {
        return res.status(404).send("The courses with given id was not found");
    }
    const index = courses.indexOf(course);
    courses.splice(index,1);
    res.send(course);
})
function validateCourse(course){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return result =  schema.validate(course );
 
}








// port
const port = process.env.PORT || 3000;
app.listen(3000,()=>console.log(`Listening on post ${port}`))