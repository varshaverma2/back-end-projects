var express=require("express");
var app=express();
app.get("/",function(req,res){
    res.send("Hi there,welcome to my assignment");
});
app.get("/speak/:animal",function(req,res){
    var animal=req.params.animal;
    if(animal=="pig")
    res.send("The pig says 'oink'");
     else if(animal=="cow")
    res.send("The cow says 'moo'");
    else if(animal=="dog")
    res.send("The dog says 'Woof Woof!'");
});
app.get("/repeat/:word/:no",function(req,res){
    var no=Number(req.params.no);
    var words=req.params.word;
    var result="";
    for (var i=0;i<no;i++)
    {result=result+words+" ";}
    res.send(result);
});
app.get("*",function(req,res){
    res.send("Sorry,page not found...what are you doing with your life?");
});
app.listen(process.env.PORT,process.env.IP);