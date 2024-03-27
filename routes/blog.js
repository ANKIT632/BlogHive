const { Router } = require('express');
const path = require('path');
const multer = require('multer');
const Blog = require('../models/blog');
const Comment = require('../models/comment');

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
        user: req.user,  // req.user set in authentication.js in middlewareFolder.
    })
})

router.get('/:id',async(req,res)=>{

    const blog=await Blog.findById(req.params.id).populate("createdBy");
    const comments=await Comment.find({blogId:req.params.id}).populate("createdBy");
   console.log(blog);
    console.log(comments);
    return res.render("blog",{
        user:req.user,   // req.user set in authentication.js in middlewareFolder.
        blog,
        comments,
    })
})

router.post('/', upload.single('coverImage'), async(req, res) => {
  const {title,body}=req.body;
  
  const blog=await Blog.create({
    body,
    title,
    createdBy:req.user._id,
    coverImageURL:`/uploads/${req.file.filename}`,
  })
    
    res.redirect(`/blog/${blog._id}`);
})


router.post("/comment/:blogId", async (req,res)=>{
    
   await Comment.create({
    content:req.body.content,
    blogId:req.params.blogId,
    createdBy:req.user._id,
   });
   return res.redirect(`/blog/${req.params.blogId}`);
})
module.exports = router;