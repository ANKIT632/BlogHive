const path = require('path');
const express = require('express');
const moongose=require('mongoose');
const UserRoute=require('./routes/user.js')


const app = express();
const PORT = 8000;

//connect DB
moongose.connect('mongodb://0.0.0.0:27017/bloghive')
 .then((e)=>console.log("conn db"));

//config.
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended:false}));

//route
app.get('/', (req, res) => res.render("home"));

app.use('/user',UserRoute);



app.listen(PORT, () => console.log(`server Started at PORT: ${PORT}`));