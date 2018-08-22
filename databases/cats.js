var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/catapp");
var catSchema=new mongoose.Schema({
   name:String,
   age:Number,
   temprament:String
});
var Cat=mongoose.model("Cat",catSchema);
var jill=new Cat({
    name:"jill",
    age:1,
    temprament:"good"});
    jill.save(function(err,cat){
        if(err){console.log("error");}
        else {console.log("worked");}
    });