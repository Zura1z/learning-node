const express = require('express');
const Joi = require('joi');

const app = express();

app.use(express.json())
var genres = [
    {   id:1,name:'Action' },
    {   id:2,name:'Comedy'},
    {   id:3,name:'Drama'},
];

app.get('/',(req,res)=>{
    res.send('Hello World');    
})
app.get('/api/genres',(req,res)=>{
    res.send(genres);    
})
app.get('/api/genres/:id',(req,res)=>{
    Genres = genres.find(c => c.id === parseInt(req.params.id)) ;
    if(!Genres) return res.status(404).send("The genres with given id was not found");
    res.send(Genres);
})
app.post('/api/genres/',(req,res)=>{
    const { error } = validateGenres(req.body);
    if(error){
        // 400 => bad request
        return res.status(400).send(result.error.details[0].message);
        return;
    }

    const Genres ={
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(Genres);
    res.send(Genres); 
})

app.put('/api/genres/:id',(req,res)=>{
    Genres = genres.find(c => c.id === parseInt(req.params.id)) ;
    if(!Genres) return res.status(404).send("The genres with given id was not found");
    

    const { error } = validateGenres(req.body);
    if(error){
        // 400 => bad request
        console.log("Error here")
        res.status(400).send(result.error.details[0].message);
        return;
    }

    Genres.name = req.body.name;
    res.send(Genres);
    
})
app.delete('/api/genres/:id',(req,res)=>{
    Genres = genres.find(c => c.id === parseInt(req.params.id)) ;
    if(!Genres) {
        return res.status(404).send("The genres with given id was not found");
    }
    const index = genres.indexOf(Genres);
    genres.splice(index,1);
    res.send(Genres);
})
function validateGenres(Genres){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return result =  schema.validate(Genres);
}








// port
const port = process.env.PORT || 3000;
app.listen(3000,()=>console.log(`Listening on post ${port}`))