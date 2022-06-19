const express = require('express');
const Joi = require('joi');

const app = express();

app.use(express.json())
var genres = [
    {   id:1,name:'genres1' },
    {   id:2,name:'genres2'},
    {   id:3,name:'genres3'},
];

app.get('/',(req,res)=>{
    res.send('Hello World');    
})
app.get('/api/genres',(req,res)=>{
    res.send(genres);    
})
app.get('/api/genres/:id',(req,res)=>{
    genres = genres.find(c => c.id === parseInt(req.params.id)) ;
    if(!genres) return res.status(404).send("The genres with given id was not found");
    res.send(genres);
})
app.post('/api/genres/',(req,res)=>{
    const { error } = validategenres(req.body);
    if(error){
        // 400 => bad request
        return res.status(400).send(result.error.details[0].message);
        return;
    }

    const genres ={
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genres);
    res.send(genres); 
})

app.put('/api/genres/:id',(req,res)=>{
    genres = genres.find(c => c.id === parseInt(req.params.id)) ;
    if(!genres) return res.status(404).send("The genres with given id was not found");
    else console.log("No error");
    

    const { error } = validategenres(req.body);
    if(error){
        // 400 => bad request
        console.log("Error here")
        res.status(400).send(result.error.details[0].message);
        return;
    }

    genres.name = req.body.name;
    res.send(genres);
    
})
app.delete('/api/genres/:id',(req,res)=>{
    genres = genres.find(c => c.id === parseInt(req.params.id)) ;
    if(!genres) {
        return res.status(404).send("The genres with given id was not found");
    }
    const index = genres.indexOf(genres);
    genres.splice(index,1);
    res.send(genres);
})
function validategenres(genres){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return result =  schema.validate(genres );
 
}








// port
const port = process.env.PORT || 3000;
app.listen(3000,()=>console.log(`Listening on post ${port}`))