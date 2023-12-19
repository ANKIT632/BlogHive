const {Schema,model} = require("mongoose");

const blogSchema=new Schema({
    title:{
        type:String,
        require:true,
    },
    body:{
        type:String,
        require:true,
    },
    coverImageURL:{
        type:String,
        require:true,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'user'  // model name ref
    },

},{timestamps:true});

const Blog=model('blog',blogSchema);

module.exports=Blog;