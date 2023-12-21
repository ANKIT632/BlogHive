
const { Router } = require('express');
const User = require('../models/user')
const router = Router();
 

router.get("/signin", (req, res) => {

    return res.render('signin');
})

router.get("/signup", (req, res) => {
    return res.render('signup');

})

router.get('/logout',(req,res)=>{
    return res.clearCookie('token').redirect('/');
})

router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;
    var isUserAlreadyExist="";
   try{
    await User.create({ 
        fullName,
        email,
        password,
    });
    }
    catch(error){
        isUserAlreadyExist="User is Already exist";
    }

    return res.render('signin',{isUserAlreadyExist});
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body; 

    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);

        return res.cookie('token', token).redirect("/");
    }
    catch(error) {
        return res.render("signin", { 
            error: "Incorrect Email or Password",
        });
    }


});




module.exports = router;