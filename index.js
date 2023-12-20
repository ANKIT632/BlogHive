const path = require('path');
const express = require('express');
const moongose = require('mongoose');
const userRoute = require('./routes/user.js');
const blogRoute = require('./routes/blog.js')
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookies } = require('./middleware/authentication.js');
const Blog = require('./models/blog.js');



const app = express(); 
const PORT = 8000;

//connect DB
moongose.connect('mongodb://0.0.0.0:27017/bloghive')
    .then((e) => console.log("conn db"));

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



app.listen(PORT, () => console.log(`server Started at PORT: ${PORT}`));