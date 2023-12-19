const { Router } = require('express');
const path = require('path');
const multer = require('multer');
const Blog = require('../models/blog');

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads/`)); // Set the directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}_${file.originalname}`;
        cb(null, fileName) // Set the file name to the original name of the uploaded file
    }
});

const upload = multer({ storage: storage });

const router = Router();

router.get('/add-new', (req, res) => {
    return res.render('addBlog', {
        user: req.user,
    })
})

router.post('/', upload.single('coverImage'), (req, res) => {
  
    
    res.redirect('/');
})


module.exports = router;