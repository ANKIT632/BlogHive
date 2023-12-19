const path = require('path');
const express = require('express');
const moongose=require('mongoose');
const userRoute=require('./routes/user.js');
const blogRoute=require('./routes/blog.js')
const cookieParser = require('cookie-parser');
const {checkForAuthenticationCookies} =require('./middleware/authentication.js')


const app = express();
const PORT = 8000;

//connect DB
moongose.connect('mongodb://0.0.0.0:27017/bloghive')
 .then((e)=>console.log("conn db"));

//config.
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


//middelware
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookies("token"));

//route
app.get('/', (req, res) => res.render("home",{user:req.user}));

app.use('/user',userRoute);
app.use('/blog',blogRoute);



app.listen(PORT, () => console.log(`server Started at PORT: ${PORT}`));