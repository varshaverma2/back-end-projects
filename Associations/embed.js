var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/demo",{ useNewUrlParser: true });

var postSchema=new mongoose.Schema({
 title:String,
 content:String
});
var Post=mongoose.model("Post",postSchema);
var userSchema=new mongoose.Schema({
   email:String,
   name:String,
   posts:[postSchema]
});
var User=mongoose.model("User",userSchema);
var newUser=new User({
   email:"hi@gmail.com",
   name:"varsha"
});
newUser.posts.push({title:"hello",
    content:"hihhihhi"
});
newUser.save(function(err,user){
   if(err){console.log(err);}
   else {console.log(user);}
    
});