const path = require('path');
require('dotenv').config();
const express = require('express');
const moongose = require('mongoose');
const userRoute = require('./routes/user.js');
const blogRoute = require('./routes/blog.js')
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookies } = require('./middleware/authentication.js');
const Blog = require('./models/blog.js');



const app = express(); 
const PORT=process.env.PORT;

//connect DB
moongose.connect(process.env.MONGO_URL)
    .then((e) => console.log("conn db"))
    .catch((err)=>{ console.log("db not connect")});

//config.
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middelware
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookies("token"));
app.use(express.static(path.resolve('./public')))

//route
app.get('/', async (req, res) => {
    const allBlogs = await Blog.find({});
  
    res.render("home", {
        user: req.user,
        blogs: allBlogs,
    });

});

app.use('/user', userRoute);
app.use('/blog', blogRoute);


//server
app.listen(PORT, () => console.log(`server Started at PORT: ${PORT}`));






