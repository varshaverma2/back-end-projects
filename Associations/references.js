var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/demonew",{ useNewUrlParser: true });

var postSchema=new mongoose.Schema({
 title:String,
 content:String
});
var Post=mongoose.model("Post",postSchema);
var userSchema=new mongoose.Schema({
   email:String,
   name:String,
   posts:[{
       type:mongoose.Schema.Types.ObjectId,
       ref:"POST"
   }]
});
var User=mongoose.model("User",userSchema);
