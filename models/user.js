const {Schema, model}= require('mongoose');

const userSchema=new Schema({
 firstName:{
    type:String,
    require:true,
 },
 email:{
    type:String,
    require:true,
    unique:true,
 },
 salt:{
    type:String,
    require:true,
 },
 password:{
    type:String,
    require:true,
 },

 profileImageURL:{
    type:String,
    default:'/images/DefaultProfileImg.png',
 },
 role:{
   type:String,
   enum:['USER','ADMIN'],
   default:"USER"
 }

},{timestamps:true});


const User=model('user',userSchema);

model.export=User;

