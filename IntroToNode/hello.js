var express=require('express'); 
var app=express();
app.get("/",function(req,res){
    res.send("Hi Jatin");
});


app.listen(process.env.PORT,process.env.IP);
